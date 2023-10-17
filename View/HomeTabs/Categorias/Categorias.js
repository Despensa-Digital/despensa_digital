import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';

const Categorias = () => {
  // Lista de categorias 
  const [categories, setCategories] = useState([]);

  // Simulando o carregamento de categorias do banco (useEffect simulado)
  useEffect(() => {
   
    const categoriesFromDatabase = [
      { id: 1, name: 'Categoria 1', imageUrl: 'url_da_imagem1' },
      { id: 2, name: 'Categoria 2', imageUrl: 'url_da_imagem2' },
      { id: 3, name: 'Categoria 3', imageUrl: 'url_da_imagem3' },

    ];
    setCategories(categoriesFromDatabase);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>Selecione uma Categoria</Title>
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <Card key={category.id} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Image
                  size={64}
                  source={{ uri: category.imageUrl }}
                  style={styles.avatar}
                />
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button>Selecionar</Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    marginVertical: 8,
    width: '30%',
  },
  cardContent: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#add8e6', // Azul claro
  },
  cardActions: {
    justifyContent: 'center',
  },
});

export default Categorias

