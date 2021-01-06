import React from "react";
import { Field, reduxForm, reset } from 'redux-form';
import { Form, FormGroup, Button, Label, Col, Container } from "reactstrap";

const afterSubmit = (result, dispatch) => dispatch(reset('AddTodo'));

function AddTodo(props) {
    const { handleSubmit, bucket } = props;
    return (
        <Container className="formContainer">
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="name" sm={2}>Todo Label</Label>
                    <Col>
                        <Field name="name" component="input" type="text" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="status" sm={2}>Todo Status</Label>
                    <Col sm={10}>
                        <Field name="status" id="status" component="input" type="checkbox" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="bucket" sm={2}>Bucket Label</Label>
                    <Col sm={10}>
                        <Field name="bucket" component="input" list="data" type="text" />
                        <datalist id="data">
                            {bucket.map((item) =>
                                <option key={item._id} value={item.name} />
                            )}
                        </datalist>
                    </Col>
                </FormGroup>

                <Button>Add Todo</Button>
            </Form>
        </Container>
    )
}

export default reduxForm({
    form: 'AddTodo',
    onSubmitSuccess: afterSubmit
})(AddTodo)
