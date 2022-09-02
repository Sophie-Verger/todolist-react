import React, { useState, useEffect, useCallback } from "react";
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
         <Button variant="warning mt-2 mb-5 col-12" type="submit">
            Add a new task
         </Button>

      </Form>
   );
}


const TodoList = () => {
   const [name, setName] = useState('');
   const [status, setStatus] = useState('');
   let [todos, setTodos] = useState([]);


   // GET with fetch API
   useEffect(() => {
      const fetchTodos = async () => {    
         const response = await fetch(
            'http://0.0.0.0:3000/tasks/all'
         );
         const data = await response.json();
         setTodos(data);

      };
      fetchTodos();
   }, []);

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
               return todo._id !== id;
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

   // Post with fetchAPI
   const changeTodo = async (todo) => {
      let task = document.getElementById(todo._id);
      console.log(task)
      task.innerHTML = `<input type="text" id="edit_${todo._id}" name="edit_${todo._id}" value=${todo.name}><Button type="submit" onClick=() => {updateTodo('${todo._id}')}>Update<Button>`
   };

   const updateTodo = async (id) => {
      console.log(id)
      let newvalue = document.getElementById("edit_" + id).value()
      console.log(newvalue)
   }


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
      console.log(data)
      setTodos(
         todos.filter((todo) => {
            if (todo._id === data._id) {
               todo.status = data.status
            }
            return todo
         })
      ); 
      //setTodos((todos) => [data, ...todos]);
      setName('');
      setStatus('');
   };

   const filter = async (status) => {    
      const response = await fetch(
         `http://0.0.0.0:3000/tasks/${status}`
      );
      const datas = await response.json();
      setTodos(datas);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      addTodo(name, 'todo');
   };

   return (
      <div className="app">
         <div className="container col-6">
            <h1 className="text-center mb-4">Todo List</h1>
            <FormTodo addTodo={addTodo} />
            <div className="d-flex justify-content-around">
               <Button variant="warning mb-5 col-3" onClick={() => filter('all')}>All</Button>
               <Button variant="warning mb-5 col-3" onClick={() => filter('done')}>Done</Button>
               <Button variant="warning mb-5 col-3" onClick={() => filter('todo')}>Todo</Button>
            </div>

            <div className=" text-center">🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷</div>
            {todos.map((todo) =>
               <div className="mt-4">
                  <Card id={todo._id} key={todo._id}>
                     <Card.Body className="d-flex justify-content-between align-items-center">
                        <div className="">
                           <span style={{ textDecoration: todo.status === "done" ? "line-through" : "" }}>{todo.name}</span>
                        </div>
                        <div className="">
                           <Button variant="outline-success m-1" onClick={() => markTodo(todo._id, todo.status)}>✓</Button>
                           <Button variant="outline-danger m-1" onClick={() => changeTodo(todo)}>✏️</Button>
                           <Button variant="outline-info m-1" onClick={() => deleteTodo(todo._id)}>✕</Button>
                        </div>

                     </Card.Body>
                  </Card>

               </div>
            )}
                  <div className="d-flex justify-content-around">
                     <Button variant="danger mb-5 col-5">Delete done tasks</Button>
                     <Button variant="danger mb-5 col-5">Delete all tasks</Button>
                  </div>
         </div>
      </div>
   );
};

export default TodoList;