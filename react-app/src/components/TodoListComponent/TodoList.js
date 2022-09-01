import React, {useState, useEffect, useCallback} from "react";
import "./TodoList.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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




const TodoList = () => {
   const [name, setName] = useState('');
   const [status, setStatus] = useState('');
   const [todos, setTodos] = useState([]);

   // GET with fetch API
   useEffect(() => {
      const fetchTodos = async () => {
         const response = await fetch(
            'http://0.0.0.0:3000/tasks/all'
         );
         const data = await response.json();
         setTodos(data);
         console.log(todos)
      };
      fetchTodos();
   }, [todos]);

   // Delete with fetchAPI
   const deleteTodo = async (id) => {
    
      let response = await fetch(
         `http://0.0.0.0:3000/tasks/${id}`,
         {
            method: 'DELETE',
         }
      );
      if (response.status === 200) {
         setTodos(
          todos.filter((todo) => {
               return todo.id !== id;
            })
         );
      } else {
         return;
      }
   };

   // Post with fetchAPI
   const addTodo = async (name, status) => {
      let response = await fetch('http://0.0.0.0:3000/tasks/add', {
         method: 'POST',
         body: JSON.stringify({
            name: name,
            status: status,
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      });
      let data = await response.json();
      setTodos((todos) => [data, ...todos]);
      setName('');
      setStatus('');
   };


   // change status
   const markTodo = async (id, status) => {
      let response = await fetch(`http://0.0.0.0:3000/tasks/${id}`, {
         method: 'PUT',
         body: JSON.stringify({
            status: status === 'todo' ? 'done' : 'todo',
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      });
      let data = await response.json();
      setTodos((todos) => [data, ...todos]);
      setName('');
      setStatus('');
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      addTodo(name, 'todo');
   };

   return (
   <div>
      <FormTodo addTodo={addTodo} />
      <div>
         {todos.map((todo) => 
         <Card key={todo._id}>
            <Card.Body >
               <span style={{ textDecoration: todo.status === "done" ? "line-through" : "" }}>{todo.name} {todo._id} {todo.status}</span>
            </Card.Body>
            <Button variant="outline-success" onClick={() => markTodo(todo._id, todo.status)}>✓</Button>
            <Button variant="outline-danger" onClick={() => changeTodo(todo._id, todo.name)}>✏️</Button>
            <Button variant="outline-info" onClick={() => deleteTodo(todo._id)}>✕</Button>
         </Card>
         )}
      </div>
   </div>
   );
};

export default TodoList;