import * as TodoActions from "../ActionTypes/todo";
import { baseUrl } from "../../shared/baseUrl";

export const deleteTodo = (todoId) => dispatch => {
    dispatch(todosLoading(true));

    fetch(`${baseUrl}/delete-todo/${todoId}`, {
        method: 'DELETE'
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        `Error: ${response.status} : ${response.statusText}`
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errorMess = new Error(error.message);
                throw errorMess;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(todosSucceed(response.todos)))
        .catch(error => dispatch(todosFailed(error.message)));
};

export const updateStatus = (todoId, status) => dispatch => {
    dispatch(todosLoading(true));

    fetch(`${baseUrl}/update-status/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ status })
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        `Error: ${response.status} : ${response.statusText}`
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errorMess = new Error(error.message);
                throw errorMess;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(todosSucceed(response.todos)))
        .catch(error => dispatch(todosFailed(error.message)));
};

export const editTodo = (todo, todoId, history) => dispatch => {
    dispatch(todosLoading(true));

    fetch(`${baseUrl}/edit-todo/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(todo)
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        `Error: ${response.status} : ${response.statusText}`
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errorMess = new Error(error.message);
                throw errorMess;
            }
        )
        .then(response => response.json())
        .then(response => {
            dispatch(todosSucceed(response.todos));
            history.push('/home');
        })
        .catch(error => dispatch(todosFailed(error.message)));
};

export const addTodo = (todo, history) => dispatch => {
    dispatch(todosLoading(true));

    fetch(`${baseUrl}/add-todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(todo)
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        `Error: ${response.status} : ${response.statusText}`
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errorMess = new Error(error.message);
                throw errorMess;
            }
        )
        .then(response => response.json())
        .then(response => { 
            dispatch(todosSucceed(response.todos)); 
            history.push('/home'); 
        })
        .catch(error => dispatch(todosFailed(error.message)));
};

export const fetchTodos = () => dispatch => {
    dispatch(todosLoading(true));

    fetch(`${baseUrl}/todos`)
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        `Error: ${response.status} : ${response.statusText}`
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errorMess = new Error(error.message);
                throw errorMess;
            }
        )
        .then(response => response.json())
        .then(todos => dispatch(todosSucceed(todos)))
        .catch(error => dispatch(todosFailed(error.message)));
};

export const todosLoading = (loading) => ({
    type: TodoActions.TODOS_LOADING,
    payload: loading
});

export const todosFailed = errMessage => ({
    type: TodoActions.TODOS_FAILED,
    payload: errMessage
});

export const todosSucceed = todo => ({
    type: TodoActions.TODOS_SUCCESS,
    payload: todo
});