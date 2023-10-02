import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const categories = [
  {
    id: 1,
    title: 'Gynecology and Obstetrics',
    subtitle: 'Women\'s Health',
    description: 'The care of women from pregnancy until after delivery and with the diagnosis and treatment of disorders of the female reproductive tract.',
    image: require('../../../assets/images/gynecology.jpeg'), // Replace with your image path
  },
  {
    id: 2,
    title: 'Pediatrics',
    subtitle: 'Children\'s Health',
    description: 'The health and medical care of infants, children, and adolescents from birth up to the age of 18.',
    image: require('../../../assets/images/Pediatrics.jpeg'), // Replace with your image path
  },
  {
    id: 3,
    title: 'Orthopedics',
    subtitle: 'Bone Health',
    description: 'Aim at the treatment of the musculoskeletal system. This includes your bones, joints, ligaments, tendons, and muscles.',
    image: require('../../../assets/images/Orthopedics.jpg'),
  },
  {
    id: 4,
    title: 'Internal Medicine',
    subtitle: 'General Health',
    description: 'A medical specialty for medical doctors focused on the prevention, diagnosis, and treatment of internal diseases',
    image: require('../../../assets/images/Internal.jpeg'), // Replace with your image path
  },
];

const Home = () => {
  const navigation = useNavigation();

  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategoryExpansion = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const isCategoryExpanded = (categoryId) => expandedCategories.includes(categoryId);

  const handleCategoryPress = (category) => {
    const title = category.title;
    navigation.navigate('ContactDurie', { category, title });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleQuestion}>Which category can we be of service today?</Text>
      </View>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.category}
          onPress={() => handleCategoryPress(category)}>
          <Image source={category.image} style={styles.categoryImage} />
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
            {isCategoryExpanded(category.id) && (
              <Text style={styles.categoryDescription}>{category.description}</Text>
            )}
            <TouchableOpacity
              onPress={() => toggleCategoryExpansion(category.id)}
              style={styles.toggleButton}>
              <Text>{isCategoryExpanded(category.id) ? 'Less' : '>>Description<<'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    alignContent: 'center'
  },
  titleQuestion: {
    fontSize: 40,
    fontWeight: '200',
    marginBottom: 6,
  },
  category: {
    width: '49%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: '110%',
    height: 100,
    resizeMode: 'cover',
    marginBottom: 2,
  },
  categoryInfo: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#555',
  },
  categoryDescription: {
    marginTop: 10,
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#dde',
    borderRadius: 5,
  },
});

export default Home;
