import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChattedUsers } from '../../actions/authorsActions';
import { auth, db } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';

import defaultImage from '../../../assets/images/user.png';
import { doc, getDoc } from 'firebase/firestore';

const AuthorChats = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = auth.currentUser;
  const authorID = user.uid;

  const chattedUsers = useSelector(state => state.author.chattedUsers);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfos, setUserInfos] = useState({});

  const fetchUserInfo = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      setUserInfos(prevUserInfos => ({
        ...prevUserInfos,
        [uid]: userData,
      }));
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      await dispatch(fetchChattedUsers());
      setIsLoading(false);
    };

    fetchChats();
  }, [dispatch]);

  useEffect(() => {
    for (const uid of chattedUsers) {
      fetchUserInfo(uid);
    }
  }, [chattedUsers]);

  const navigateToAuthorMessage = ({item, fullName, username}) => {
    navigation.navigate('AuthorMessages', { userID: item, fullName, username });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chattedUsers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigateToAuthorMessage({
              item,
              fullName: userInfos[item]?.fullName,
              username: userInfos[item]?.username,
            })}
          >
            <Image
              source={
                userInfos[item]?.photoURL
                  ? { uri: userInfos[item]?.photoURL }
                  : defaultImage
              }
              style={styles.userImage}
            />
            <View style={styles.chatContent}>
              <Text style={styles.username}>
                {item === authorID ? 'Note to Self' : userInfos[item]?.fullName || item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AuthorChats;
