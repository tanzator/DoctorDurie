import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginAnonymouslyAction, loginWithGoogleAction } from '../../actions/AuthActions';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import icons from Expo package

const FirstTime = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleLoginWithGoogle = () => {
    dispatch(loginWithGoogleAction());
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleContinueAsGuest = () => {
    dispatch(loginAnonymouslyAction());
  };

  return (
    <ImageBackground
      source={require('../../../assets/Durie.jpg')} // Replace with your background image
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.preTitle}>DOCTOR</Text>
        <Text style={styles.title}>DURIE</Text>
        <Text style={styles.subtitle}>Get health concerning news and advise</Text>
        <Text style={styles.subtitle}>Get realtime connection to experienced health professionals</Text>
        <Text style={styles.subtitle}>Book a meeting/consultancy</Text>
        <Text style={styles.info}>Sign in or Continue Anonymously</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <FontAwesome name="envelope" size={24} color="#fff" />
            <Text style={styles.buttonText}>Sign in with Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLoginWithGoogle}>
            <FontAwesome name="google" size={24} color="#fff" />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={navigateToRegister}>
            <FontAwesome name="user-plus" size={24} color="#fff" />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.anonymousButton} onPress={handleContinueAsGuest}>
            <FontAwesome name="user-secret" size={24} color="#fff" />
            <Text style={styles.buttonText}>Continue Anonymously</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
  },
  preTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#aaa',
    marginBottom: -20,
    textAlign: 'center',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    width: 'auto',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA6680',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  anonymousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F0F0F',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default FirstTime;
