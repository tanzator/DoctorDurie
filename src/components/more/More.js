import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '../../config/firebase';

import { signingOut } from '../../actions/AuthActions';

const More = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;

  const handleLogout = () => {
    dispatch(signingOut());
    // Uncomment the following navigation logic if needed
    // navigation.navigate('LogoutScreen'); // Replace 'LogoutScreen' with the actual logout screen name
  };

  const handleNavigation = (screen) => {
    if (screen === 'Logout') {
      handleLogout();
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6cc" />
        </View>
      ) : (
        <>
          {/* Uncomment and customize this section as needed */}
          <View>
            <Text>{currentUser.uid}</Text>
          </View>
          <View>
            {/* <Text>{currentUser}</Text> */}
          </View>
          <View style={styles.spaceSection}></View>
          <View style={styles.upperSection}>
            {/* Uncomment and customize this section as needed */}
            {/* <Text style={styles.navigateToProfile}>Click image to Update Profile</Text>
            <TouchableOpacity onPress={() => handleNavigation('UserProfile')}>
              <Image source={currentUser.photoURL ? { uri: currentUser.photoURL } : defaultImage} style={styles.profilePic} />
            </TouchableOpacity>
            <Text style={styles.username}>@{currentUser.displayName ? currentUser.displayName : '(no username)'}</Text> */}
          </View>
          <View style={styles.middleSection}>
            {/* Uncomment and customize these sections as needed */}
            {/* <TouchableOpacity
              style={styles.section}
              onPress={() => handleNavigation('Language')}
            >
              <Text style={styles.actionText}>{'🌍'}</Text>
              <Text style={styles.actionLabel}>{'Language'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.section}
              onPress={() => handleNavigation('Donate')}
            >
              <Text style={styles.actionText}>{'💰'}</Text>
              <Text style={styles.actionLabel}>{'Donate'}</Text>
            </TouchableOpacity>

            {/* Uncomment this section if it depends on user profile properties */}
            {/* {currentUser.hasArt && (
              <TouchableOpacity
                style={styles.section}
                onPress={() => handleNavigation('Admirers')}
              >
                <Text style={styles.actionText}>{'💬'}</Text>
                <Text style={styles.actionLabel}>{'Admirers'}</Text>
              </TouchableOpacity>
            )} */}
          </View>
          <View style={styles.spaceSection}></View>
          <View style={styles.lowerSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={() => handleNavigation('Logout')}>
              <Text style={styles.logoutText}>Logout</Text>
              <Text style={styles.logoutIcon}>🚪</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperSection: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleSection: {
    flex: 3,
    width: '100%',
  },
  lowerSection: {
    flex: 1,
    width: '100%',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navigateToProfile: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#222',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: '100%',
  },
  actionText: {
    fontSize: 30,
    color: '#6cc',
  },
  actionLabel: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5F50',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '50%',
    alignSelf: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
  },
  logoutIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default More;
