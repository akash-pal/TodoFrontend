import * as BucketActions from "../ActionTypes/bucket";
import { baseUrl } from "../../shared/baseUrl";


export const fetchBucket = () => dispatch => {
    dispatch(bucketLoading(true));

    fetch(`${baseUrl}/buckets`)
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
        .then(bucket => dispatch(bucketSucceed(bucket)))
        .catch(error => dispatch(bucketFailed(error.message)));
};

export const bucketLoading = (loading) => ({
    type: BucketActions.BUCKET_LOADING,
    payload: loading
});

export const bucketFailed = errMessage => ({
    type: BucketActions.BUCKET_FAILED,
    payload: errMessage
});

export const bucketSucceed = todo => ({
    type: BucketActions.BUCKET_SUCCESS,
    payload: todo
});