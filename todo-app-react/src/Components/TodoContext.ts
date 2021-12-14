
import React from 'react';
import TodoStorage from '../Model/Storage';

const TodoContext = React.createContext(new TodoStorage);

export default TodoContext;
