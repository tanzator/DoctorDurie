import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, fetchMessagesWithUserAndCategory, deleteMessage } from '../../actions/HomeActions';
import { auth } from '../../config/firebase';

const ContactDurie = ({ route }) => {
  const dispatch = useDispatch();

  const userID = auth.currentUser.uid;
  const senderID = userID;

  const category = route.params.category;
  const categoryID = JSON.stringify(category.id);

  const [message, setMessage] = useState('');
  const [lastMessageStatus, setLastMessageStatus] = useState(null);
  const flatListRef = useRef();

  const messages = useSelector(state => state.home.messagesWithUserAndCategory);
  const loading = useSelector(state => state.home.loading);
  const error = useSelector(state => state.home.error);

  const [isFetching, setIsFetching] = useState(true);
  const [optionMode, setOptionMode] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      await dispatch(fetchMessagesWithUserAndCategory(userID, categoryID));
      setIsFetching(false);
    };

    fetchMessages();
  }, [dispatch, categoryID, userID]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    const sendMessageStatus = await dispatch(sendMessage(categoryID, userID, senderID, message));

    if (sendMessageStatus === 'success') {
      setMessage('');
      setLastMessageStatus('sent');
      await dispatch(fetchMessagesWithUserAndCategory(userID, categoryID));
    } else {
      setLastMessageStatus('failed');
    }
  };

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd();
    }
  }, [messages]);

  const handleLongPress = () => {
      setOptionMode(!optionMode);
    
  };
 
  const handleDeleteMessage = async ({item}) => {
    const messageID = item.id;
    
      await dispatch(deleteMessage(userID, categoryID, messageID));
      await dispatch(fetchMessagesWithUserAndCategory(userID, categoryID));

  };

  const formatDate = (timestamp) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      {isFetching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      )}

      {!isFetching && (
        <React.Fragment>
          {messages.length === 0 ? (
            <View style={styles.noMessagesContainer}>
              <Text>No messages available</Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onLongPress={() => handleLongPress()}
                >
                  <View
                    style={[
                      styles.messageContainer,
                      item.isSent
                        ? styles.sentMessageContainer
                        : styles.receivedMessageContainer,
                    ]}
                  >
                    <Text style={styles.message}>{item.message}</Text>
                    <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
                    {item.isSent && optionMode && (
                      <TouchableOpacity
                        style={styles.deleteButtonContainer}
                        onPress={() => handleDeleteMessage({item})}
                      >
                        <Text style={styles.deleteButton}>Delete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.messagesContainer}
              onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            />
          )}

          {lastMessageStatus === 'sent' && (
            <View style={styles.lastMessageContainer}>
              <Text style={styles.lastMessageText}>Message sent successfully!</Text>
            </View>
          )}

          {lastMessageStatus === 'failed' && (
            <View style={styles.lastMessageContainer}>
              <Text style={styles.lastMessageText}>Message failed to send.</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleSendMessage}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )}
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    paddingBottom: 16,
  },
  messageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
    marginBottom: 4,
  },
  receivedMessageContainer: {
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  sentMessageContainer: {
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    marginRight: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
  deleteButton: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  lastMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  lastMessageText: {
    color: '#333',
  },
  retryButton: {
    marginLeft: 8,
    paddingVertical: 4,
  },
  retryButtonText: {
    color: '#4CAF50',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    color: '#333',
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  deleteButtonContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteButton: {
    color: 'white',
    fontSize: 12,
  },
});

export default ContactDurie;
