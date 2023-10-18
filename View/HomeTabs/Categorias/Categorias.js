import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, FAB } from 'react-native-paper';

const categories = [
  { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png') },
  { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png') },
  { name: 'Cozinha', photo: require('../../../Assets/Categories/Hamper.png') },
  
];

const CategoryAvatar = ({ categoryKey, name, photo }) => {
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.imageContainer}>
        <Avatar.Image size={90} source={photo} />
      </View>
      <Text style={styles.categoryText}>{name}</Text>
    </View>
  );
};

const Categorias = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {categories.map((categoria, index) => (
          <View key={categoria.name} style={styles.categoryContainer}>
            <CategoryAvatar
              categoryKey={categoria.name}
              name={categoria.name}
              photo={categoria.photo}
            />
          </View>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AdicionarCategoria', 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollContent: {
    paddingLeft: 20, // Espaçamento à esquerda
    paddingRight: 20, // Espaçamento à direita
    flex: 4,
  },
  categoryContainer: {
    marginRight: 10, // Espaçamento entre categorias
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    padding: 10,
    borderRadius: 45,
    marginBottom: 10,
  },
  categoryText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#b0ea93'
},
});

export default Categorias;
