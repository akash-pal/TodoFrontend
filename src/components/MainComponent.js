import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
import Home from "./HomeComponent";
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
import { connect } from "react-redux";
import * as ActionCreators from "../store/ActionCreators";

const mapStateToProps = state => {
    return {
        todos: state.todo.todos,
        bucket: state.bucket.bucket,
        isLoading: state.todo.isLoading
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTodos: () => dispatch(ActionCreators.TodoActionCreators.fetchTodos()),
    fetchBucket: () => dispatch(ActionCreators.BucketActionCreators.fetchBucket()),
    deleteTodo: (todoId) => dispatch(ActionCreators.TodoActionCreators.deleteTodo(todoId)),
    updateStatus: (todoId, status) => dispatch(ActionCreators.TodoActionCreators.updateStatus(todoId, status)),
    editTodo: (todo, todoId, history) => dispatch(ActionCreators.TodoActionCreators.editTodo(todo, todoId, history)),
    addTodo: (values, history) => dispatch(ActionCreators.TodoActionCreators.addTodo(values, history))
});

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialValues: null,
            todoId: null
        }
    }

    componentDidMount() {
        this.props.fetchTodos();
        this.props.fetchBucket();
    }

    editTodo = (values) => {
        const formValues = {
            name: values?.name,
            bucket: values?.bucket?.name,
            status: values?.status
        }
        this.setState({ initialValues: formValues, todoId: values?._id })
        this.props.history.push("/edit");
    }

    render() {
        return (
            <div>
                {this.props.isLoading && (
                    <div className="overlay">
                        <div className="centered">
                            <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
                        </div>
                    </div>
                )}

                <Switch>
                    <Route exact path="/home" component={() => (
                        <Home
                            todos={this.props.todos}
                            fetchTodos={this.props.fetchTodos}
                            deleteTodo={this.props.deleteTodo}
                            editTodo={this.editTodo}
                            updateStatus={this.props.updateStatus}
                            history={this.props.history}
                        />)
                    }
                    />
                    <Route
                        exact
                        path="/add"
                        component={() => (
                            <AddComponent
                                bucket={this.props.bucket}
                                onSubmit={values => this.props.addTodo(values, this.props.history)} />
                        )}
                    />
                    <Route
                        exact
                        path="/edit"
                        component={() => (
                            <EditComponent
                                buckets={this.props.bucket}
                                editTodo={this.props.editTodo}
                                todoId={this.state.todoId}
                                initialValues={this.state.initialValues}
                                history={this.props.history} />
                        )}
                    />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main)
);
