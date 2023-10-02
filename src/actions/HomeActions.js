import { db, storage, auth } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, deleteDoc, getDoc, getDocs, serverTimestamp, collection, query, orderBy, addDoc, onSnapshot, collectionGroup } from 'firebase/firestore';
import {
    DELETE_MESSAGE_FAILURE,
    DELETE_MESSAGE_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_SUCCESS,
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_SUCCESS,
} from './Types';




// Send a message
export const sendMessage = (categoryID, userID, senderID, message) => {
    console.log(categoryID, userID, senderID, message)
    return async (dispatch) => {
        try {
            const chatRef = collection(db, 'chats', userID, categoryID); // Update the collection reference based on your setup

            await addDoc(chatRef, {
                message,
                categoryID,
                userID,
                timestamp: new Date().toISOString(),
                senderID,
            });

            // Dispatch an action indicating success
            dispatch({ type: SEND_MESSAGE_SUCCESS });
            return 'success';
        } catch (error) {
            console.error('Error sending message:', error);

            // Dispatch an action indicating failure
            dispatch({ type: SEND_MESSAGE_FAILURE, payload: error.message });
            return 'failed';
        }
    };
};


// Fetch messages with a specific user
export const fetchMessagesWithUserAndCategory = (userID, categoryID) => {
    return async (dispatch) => {
        try {
            const chatRef = collection(db, 'chats', userID, categoryID); // Update the collection reference based on your setup
            const q = query(
                chatRef,
                orderBy('timestamp')
            );

            const querySnapshot = await getDocs(q);
            const messages = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                messages.push({
                    id: doc.id,
                    message: data.message,
                    timestamp: data.timestamp,
                    isSent: data.senderID === userID,
                });
            });

            dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: messages });
            console.info('Fetched chats successfully in Contact Durie');

        } catch (error) {
            console.error('Error fetching messages in Contact Durie:', error);
            dispatch({ type: FETCH_MESSAGES_FAILURE, payload: error.message });
        }
    };
};

// Delete a message
export const deleteMessage = (userID, categoryID, messageID) => {
    return async (dispatch) => {
        try {
            const chatRef = doc(db, 'chats', userID, categoryID, messageID); // Update the doc reference based on your setup

            await deleteDoc(chatRef);
            dispatch({ type: DELETE_MESSAGE_SUCCESS });

            console.log('Message deleted successfully');


        } catch (error) {
            console.error('Error deleting message:', error);
            dispatch({ type: DELETE_MESSAGE_FAILURE, payload: error.message });

            // Handle the error or dispatch a failure action
        }
    };
};