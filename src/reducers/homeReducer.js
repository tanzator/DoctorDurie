import {
    DELETE_MESSAGE_FAILURE,
    DELETE_MESSAGE_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_SUCCESS,
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_SUCCESS
} from "../actions/Types";

const initialState = {
    loading: false,
    error: null,
    messagesWithUserAndCategory: [],
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_SUCCESS:
            return { ...state, messagesWithUserAndCategory: action.payload, loading: false, error: null };
        case FETCH_MESSAGES_FAILURE:
            return { ...state, messagesWithUserAndCategory: [], loading: false, error: action.payload };
        case SEND_MESSAGE_SUCCESS:
            return { ...state, loading: false, error: null };
        case SEND_MESSAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_MESSAGE_SUCCESS:
            const updatedMessages = state.messagesWithUserAndCategory.filter(
                (message) => message.id !== action.payload
            );
            return { ...state, messagesWithUserAndCategory: updatedMessages, loading: false, error: null };
        case DELETE_MESSAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default homeReducer;
