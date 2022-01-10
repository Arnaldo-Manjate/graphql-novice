const express = require("express")
const cors = require("cors")
const {graphqlHTTP} = require("express-graphql")
const { dao } = require("./db/dao")
const {rootSchema} = require("./schema/schemas")

const port = 4000
const api = express()

dao.ConnectToDB()

api.use(cors())
api.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    graphiql: true
}))

api.listen(port, () => console.log(`novice is litening on port ${port}`))