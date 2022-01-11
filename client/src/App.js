import './App.css';
import AddBook from './components/AddBook/AddBook';
import BookList from './components/BookList/BookList';


function App() {
  return (
    <div className="App">
      <h1>GraphQl Client</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
