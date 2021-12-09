
import ItemViewer from './ItemViewer/ItemViewer';
import ItemForm from './ItemForm/ItemForm';
import Header from './Header/Header';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <ItemViewer />
        <ItemForm />
      </main>
    </div>
  );
}

export default App;
