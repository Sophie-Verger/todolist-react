import React, { useState, useCallback } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';


function Add() {
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")

    const getTasks = useCallback(
        (e) => {
            e.preventDefault()
            const url = ('0.0.0.0:3000/tasks/all')
            fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => { console.log(data) })
                .catch(err => console.log(err))
        },
        [name, status],
    )



}

export default Add