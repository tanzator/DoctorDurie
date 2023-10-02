import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Implement language selection functionality here
  };

  const languages = [
    'English',
    // 'Spanish',
    'French',
    // 'German',
    'Chinese',
    'Japanese',
    'Korean',
    'Russian',
    // 'Arabic',
    'Other',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Language</Text>
      <View style={styles.languageList}>
        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.languageItem,
              selectedLanguage === language && styles.selectedLanguageItem,
            ]}
            onPress={() => handleLanguageSelect(language)}
          >
            <Text style={styles.languageText}>{language}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 20,
    color: '#6cc',
  },
  languageList: {
    width: '100%',
  },
  languageItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  selectedLanguageItem: {
    backgroundColor: '#6cc',
    borderColor: '#6cc',
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
});

export default LanguageScreen;
