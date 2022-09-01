import React, {useState, useEffect, useCallback} from "react";
import "./TodoList.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";



function Todo({ todo, index, markTodo, removeTodo }) {
  console.log(todo)
  return (
    <div
      className="todo"

    >
      <span style={{ textDecoration: todo.status === "done" ? "line-through" : "" }}>{todo.name}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-info" onClick={() => removeTodo(index)}>✕</Button>
        {/* <Button variant="outline-danger" onClick={() => changeTodo(index)}>✏️</Button> */}

      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>New Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="New todo" />
    </Form.Group>
    <Button variant="info m-3 mb-5" type="submit">
      Add new task
    </Button>
  </Form>
  );
}

function TodoList() {
  let [todos, setTodos] = React.useState([]);

  let [name, setName] = useState("");

  let [status, setStatus] = useState("");

  let [id, setId] = useState("");

  let navigate = useNavigate();

  const addTodo = useCallback(
    (name) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, status: 'todo' })
    };
    fetch('http://0.0.0.0:3000/tasks/add', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => todos.push(data.name))
        .then(data => console.log(todos));
       
  });   



  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  useEffect(() => {
    fetch('http://0.0.0.0:3000/tasks/all')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setTodos(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);
 
 
   return (
     <div className="app">
       <div className="container">
         <h1 className="text-center mb-4">Todo List</h1>
         <FormTodo addTodo={addTodo} />
         <div>
           {todos.map((todo, index) => (
             <Card>
               <Card.Body>
                 <Todo
                 key={index}
                 index={index}
                 todo={todo}
                 markTodo={markTodo}
                 removeTodo={removeTodo}
                 />
               </Card.Body>
             </Card>
           ))}
         </div>
       </div>
     </div>
   );


}



export default TodoList;