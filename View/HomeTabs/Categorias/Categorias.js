import React from 'react';
import { View, ScrollView, StyleSheet,Row } from 'react-native';
import { Avatar, Text, FAB } from 'react-native-paper';

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

const categories = [
  { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png') },
  { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png') },
  { name: 'Hortifruit', photo: require('../../../Assets/Categories/Fruits.png') },
  { name: 'Armário da sala', photo: require('../../../Assets/Categories/Pantry.png') },
  { name: 'Banheiro', photo: require('../../../Assets/Categories/Bathtub.png') },
  { name: 'Cozinha', photo: require('../../../Assets/Categories/Hamper.png') },
  
];
// a gente precisa agrupar em grupos de 3 para criar a grid
const rows = categories.reduce((rows, key, index) => (index % 3 == 0 ? rows.push([key])
  : rows[rows.length-1].push(key)) && rows, []);

const Categorias = () => {
  return (
    <View style={styles.container}>
        <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.gridBox}>
          {rows.map((grupo, index) => (
            <View key={index} style={styles.rowFlex}>
              {grupo ? grupo.map((categoria, index) => (
                <CategoryAvatar
                  categoryKey={categoria.name}
                  name={categoria.name}
                  photo={categoria.photo}
                />
              )): ""}
          </View>
        ))}
        </View>
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
    paddingLeft: 30, // Espaçamento à esquerda
    paddingRight: 30, // Espaçamento à direita
    flex: 4,
  },
  categoryContainer: {
    marginRight: 20, // Espaçamento entre categorias
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  gridBox: {
    flex: 3,

  },
  rowFlex: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
  }
});

export default Categorias;
