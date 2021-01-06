import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";

function EditTodo(props) {
    const { buckets, initialValues, editTodo, todoId, history } = props;
    const [todo, setTodo] = useState(initialValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(todo, todoId, history);
    }

    useEffect(() => {
        setTodo(initialValues);
    }, [initialValues])

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setTodo(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    return (
        <Container className="formContainer">
            <Form onSubmit={handleSubmit}>

                <FormGroup>
                    <Label for="name">Todo Label</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Todo"
                        value={todo?.name}
                        onChange={e => handleChange(e)} />
                </FormGroup>

                <FormGroup check>
                    <Label for="status" check>
                        <Input
                            type="checkbox"
                            name="status"
                            checked={todo?.status}
                            onChange={e => handleChange(e)} />
                    Todo Status
                </Label>

                </FormGroup>
                {/* <div>
                <label htmlFor="bucket">Bucket Label</label>
                <input name="bucket" list="data" type="text" placeholder="Bucket" value={todo.bucket}
                    onChange={e => handleChange(e)} />
                <datalist id="data">
                    {buckets.map((item) =>
                        <option key={item._id} value={item.name} />
                    )}
                </datalist>
            </div> */}
                <Button>Edit Todo</Button>
            </Form>
        </Container>

    )
}

export default EditTodo;
