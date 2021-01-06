import * as TodoActions from "../ActionTypes/todo";

const initialState = {
  todos: [],
  buckets: [],
  isLoading: true,
  errMess: null
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case TodoActions.TODOS_SUCCESS:
    case TodoActions.REMOVE_TODO:
      return {
        ...state,
        todos: action.payload,
        isLoading: false
      };
    case TodoActions.TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload
      };
    case TodoActions.TODOS_LOADING:
      return { ...state, isLoading: action.payload, errMess: null };
    default:
      return state;
  }
}

export default todoReducer;
