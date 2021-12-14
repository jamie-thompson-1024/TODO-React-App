
import ItemViewer from './ItemViewer/ItemViewer';
import ItemForm from './ItemForm/ItemForm';
import Header from './Header/Header';

import './App.css';

function App() {
  return (
    <div className="App theme-light">
        <Header />
        <ItemViewer />
        <ItemForm />
    </div>
  );
}

export default App;
