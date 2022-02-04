const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLNonNull
} = require("graphql");
const Author = require("../models/authors.js");
const Book = require("../models/books.js");
const { books, authors } = require("./mockdata");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectId;

const BookType = new GraphQLObjectType({
	name: "Book",
	description: "Detaild about a book",
	fields: () => ({
		id: { type: GraphQLID, description: "book identifier" },
		name: { type: GraphQLString, description: "name of book" },
		genre: { type: GraphQLString, description: "genre of book" },
		authorId: { type: GraphQLID, description: "Id of the author" },
		author: {
			type: AuthorType,
			description: "author of book",
			resolve: (parent, args) => {
				const { authorId } = parent;
				return Author.findById(authorId);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	description: "Authors of books",
	fields: () => ({
		id: { type: GraphQLID, description: "" },
		name: { type: GraphQLString, description: "" },
		age: { type: GraphQLInt, description: "" },
		books: {
			type: new GraphQLList(BookType),
			description: "",
			resolve: (parent, args) => {
				const { id } = parent;
				return Book.find({ authorId: id });
			}
		}
	})
});

const rootQuery = new GraphQLObjectType({
	name: "RootQuery",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve: (parent, args) => {
				let { id } = args;

				if (mongoose.Types.ObjectId.isValid(id)) {
					return Book.findById(id);
				}
			}
		},

		author: {
			type: AuthorType,
			args: { id: { type: new GraphQLNonNull(GraphQLID), description: "" } },
			resolve: (parent, args) => {
				const { id } = args;
				if (mongoose.Types.ObjectId.isValid(id)) {
					return Author.findById(id);
				}

				return false;
			}
		},

		books: {
			type: new GraphQLList(BookType),
			description: "",
			resolve: (parent, args) => {
				return Book.find({});
			}
		},

		authors: {
			type: new GraphQLList(AuthorType),
			description: "",
			resolve: (parent, args) => {
				return Author.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutaion",
	description: "",
	fields: () => ({
		addBook: {
			type: BookType,
			description: "add book",
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				const book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				console.log("[saving book] :", book);
				return book.save();
			}
		},

		addAuthor: {
			type: AuthorType,
			description: "add an Author",
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				const author = new Author({
					name: args.name,
					age: args.age
				});
				console.log("[saving author] :", author);
				return author.save();
			}
		}
	})
});

//
const rootSchema = new GraphQLSchema({
	query: rootQuery,
	mutation: Mutation
});

module.exports = {
	rootSchema
};
