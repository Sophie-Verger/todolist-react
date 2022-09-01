import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './components/TodoListComponent/TodoList';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <TodoList />
  </BrowserRouter>,
  document.getElementById('root')
);

