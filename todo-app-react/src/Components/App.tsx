
import ItemViewer from './ItemViewer/ItemViewer';
import ItemForm from './ItemForm/ItemForm';
import TodoContext from './TodoContext';
import Header from './Header/Header';
import TodoStorage from '../Model/Storage';

import './App.css';

function App() {
  const todoStore = new TodoStorage();
  return (
    <div className="App theme-light">
      <TodoContext.Provider value={ todoStore }>
        <Header />
        <ItemViewer />
        <ItemForm />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
