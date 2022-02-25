
import ItemViewer from './ItemViewer/ItemViewer';
import ItemForm from './ItemForm/ItemForm';
import Header from './Header/Header';

import './App.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import TodoContext from './TodoContext';

function App() {

  const { settings } = useContext(TodoContext);
  const [theme, setTheme] = useState(settings.theme);

  const updateTheme = useCallback(() => {
    setTheme(settings.theme);
  }, [settings, setTheme]);

  useEffect(() => {
    settings.addEventListener('themeChange', updateTheme);
    return (() => {
      settings.removeEventListener('themeChange', updateTheme);
    })
  }, [settings, updateTheme]);

  return (
    <div className={"App theme-" + theme}>
        <Header />
        <ItemViewer />
        <ItemForm />
    </div>
  );
}

export default App;
