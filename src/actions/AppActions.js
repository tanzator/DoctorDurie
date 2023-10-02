import {
    COUNT_DETAIL_CHANGED
} from "./Types";


export const changeCounts = () => {
    return (dispatch) => {
        dispatch({type: COUNT_DETAIL_CHANGED, payload: 100});
    }
}