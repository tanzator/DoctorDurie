import { auth, db, storage } from '../config/firebase'
import {
    signInAnonymously,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from 'firebase/auth'; // Update imports

import {
    LOGOUT_USER,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    LOG_IN_ANONYMOUSLY,
    LOG_IN_ANONYMOUSLY_FAILURE,
    LOG_IN_ANONYMOUSLY_SUCCESS,
    LOG_IN_WITH_EMAIL_AND_PASSWORD,
    LOG_IN_WITH_EMAIL_AND_PASSWORD_FAILURE,
    LOG_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS,
    LOG_IN_WITH_GOOGLE,
    LOG_IN_WITH_GOOGLE_FAILURE,
    LOG_IN_WITH_GOOGLE_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    TOGGLE_AUTH_COMPONENT
} from "./Types";


export const toggleAuthComponent = ({ prop, value }) => {
    return {
        type: TOGGLE_AUTH_COMPONENT,
        payload: { prop, value }
    };
};

export const loginAnonymouslyAction = () => {

    return async (dispatch) => {
        dispatch({ type: LOG_IN_ANONYMOUSLY });

        try {
            const anonymousUserCredential = await signInAnonymously(auth);
            const anonymousUser = anonymousUserCredential.user;
            dispatch({ type: LOG_IN_ANONYMOUSLY_SUCCESS, payload: anonymousUser });
        } catch (error) {
            dispatch({ type: LOG_IN_ANONYMOUSLY_FAILURE, payload: error });
            console.error('An error occurred while logging in anonymously:', error);
        }
    };
};

export const creatingUserWithEmailAndPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch({ type: REGISTER_USER });

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const registeredUser = userCredential.user;
            dispatch({ type: REGISTER_USER_SUCCESS, payload: registeredUser });
        } catch (error) {
            dispatch({ type: REGISTER_USER_FAILURE, payload: error });
            console.error('An error occurred while registering:', error);
        }
    };
};

export const signingInWithEmailAndPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch({ type: LOG_IN_WITH_EMAIL_AND_PASSWORD });

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const authenticatedUser = userCredential.user;
            dispatch({ type: LOG_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS, payload: authenticatedUser });
        } catch (error) {
            dispatch({ type: LOG_IN_WITH_EMAIL_AND_PASSWORD_FAILURE, payload: error });
            console.error('An error occurred while logging in:', error);
        }
    };
};

export const loginWithGoogleAction = () => {

    return async (dispatch) => {
        dispatch({ type: LOG_IN_WITH_GOOGLE });

        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);

            const authenticatedUser = userCredential.user;
            dispatch({ type: LOG_IN_WITH_GOOGLE_SUCCESS, payload: authenticatedUser });
        } catch (error) {
            dispatch({ type: LOG_IN_WITH_GOOGLE_FAILURE, payload: error });
            console.error('An error occurred while logging in with Google:', error);
        }
    };
};

export const signingOut = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USER });
        console.log(auth.currentUser)
        signOut(auth)
            .then(() => {
                // message.success(`Signed out successfully!`);
                dispatch({ type: LOGOUT_USER_SUCCESS });
                console.log(auth.currentUser)

            })
            .catch((e) => {
                console.log(e);
                // message.error(e);
                dispatch({ type: LOGOUT_USER_FAILURE });
                console.log(auth.currentUser)

            });
    }
}