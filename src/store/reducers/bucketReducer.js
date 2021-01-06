import * as BucketActions from "../ActionTypes/bucket";

const initialState = {
    bucket: [],
    isLoading: true,
    errMess: null
};

function bucketReducer(state = initialState, action) {
    switch (action.type) {
        case BucketActions.BUCKET_SUCCESS:
            return {
                ...state,
                bucket: action.payload,
                isLoading: false
            };
        case BucketActions.BUCKET_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            };
        case BucketActions.BUCKET_LOADING:
            return { ...state, isLoading: action.payload, errMess: null };
        default:
            return state;
    }
}

export default bucketReducer;
