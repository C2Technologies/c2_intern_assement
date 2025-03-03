import './App.css';
import Footer from './Footer/Footer';
import Navbar from './Header/Navbar';
import ToDoList from './ToDoList/ToDoList';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <ToDoList/>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
