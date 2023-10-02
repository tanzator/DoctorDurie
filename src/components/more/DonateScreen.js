import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const DonateScreen = () => {
  const handleDonate = () => {
    // Implement donate functionality here
  };
  
  const handleDonateAlternative = () => {
    // Implement donate functionality here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate</Text>
      <Text style={styles.subtitle}>Support the movement by donating:</Text>
      <Text style={styles.details}>M-Pesa: +255765009910</Text>
      <Text style={styles.details}>MASTERCARD (NMB): 23710009535</Text>

      <Text style={styles.subtitle}>Enter Promise Amount:</Text>
      <TextInput
        label="Amount"
        placeholder="Enter donation amount"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.subtitle}>Choose Payment Method:</Text>
      {/* You can use radio buttons or other components to choose payment method */}
      
      {/* Button to initiate/save donation/promise */}
      <Button mode="contained" onPress={handleDonate} style={styles.donateButton}>
        Donate
      </Button>
      <Text style={styles.subtitle}>{''}</Text>
      <Text style={styles.subtitle}>Enter other methods that you feel ease to donate with:</Text>
      <TextInput
        label="Donation Means"
        placeholder="Enter an ease alternative for you"
        keyboardType="default"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleDonateAlternative} style={styles.donateButton}>
        SUBMIT
      </Button>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6cc',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  details: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  donateButton: {
    backgroundColor: '#6cc',
    width: '50%',
    marginTop: 20,
  },
});

export default DonateScreen;
