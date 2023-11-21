import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Text, TouchableOpacity, Image} from 'react-native';
import { Avatar, FAB, Button, TextInput} from 'react-native-paper';

// Componente funcional para exibir uma categoria com imagem e texto
const CategoryAvatar = ({ categoryKey, name, photo, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainerAvatar}>
          <Image size={70} source={photo} />
        </View>
        <Text style={styles.categoryText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Componente funcional para exibir uma categoria dentro de um modal
const CategoryModal = ({ categoryKey, name, photo, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Image size={70} source={photo} />
        </View>
        <Text style={styles.categoryText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};


// Lista de categorias pré-definidas
const categorias = [
  { name: 'Todas as categorias', photo: require('../../../Assets/Categories/Hamper.png') },
  { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png') },
  { name: 'Hortifruti', photo: require('../../../Assets/Categories/Fruits.png') },
  { name: 'Armário da cozinha', photo: require('../../../Assets/Categories/Pantry.png') },
  { name: 'Banheiro', photo: require('../../../Assets/Categories/Bathtub.png') },
  { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png')},
  { name: 'Gato', photo: require('../../../Assets/Categories/Cat.png')},
  { name: 'Cachorro', photo: require('../../../Assets/Categories/Corgi.png')},
  { name: 'Garagem', photo: require('../../../Assets/Categories/Garage.png')},
  { name: 'Horta', photo: require('../../../Assets/Categories/GrowingPlant.png')},
  { name: 'Patinha', photo: require('../../../Assets/Categories/Heartwithdogpaw.png')},
  { name: 'Sofá', photo: require('../../../Assets/Categories/LivingRoom.png')},
  { name: 'Cama', photo: require('../../../Assets/Categories/SleepinginBed.png')}
];

const categories = [
  { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png') },
  { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png') },
  { name: 'Hortifruit', photo: require('../../../Assets/Categories/Fruits.png') },
  { name: 'Armário da sala', photo: require('../../../Assets/Categories/Pantry.png') },
  { name: 'Banheiro', photo: require('../../../Assets/Categories/Bathtub.png') },
  { name: 'Cozinha', photo: require('../../../Assets/Categories/Hamper.png') },
];

// Organiza as categorias em linhas com três elementos cada
const rows = categories.reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key])
  : rows[rows.length-1].push(key)) && rows, []);

// Componente principal que gerencia o estado e a renderização das categorias
const Categorias = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState(false);
  const [modalVisibleRemover, setModalVisibleRemover] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Abre o modal para adicionar uma categoria
  const openModal = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  // Abre o modal ao clicar em uma categoria
  const openModalEditar = (category) => {
    setSelectedCategory(category);
    setModalVisibleEditar(true);
  };

  // Abre o modal ao clicar em uma categoria para remover
    const openModalRemover = (category) => {
      setSelectedCategory(category);
      setModalVisibleRemover(true);
    };
  

  // Fecha o modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Remove a categoria selecionada (ainda precisa ser implementado)
  const removeCategory = () => {
    // Implementar a lógica de remoção da categoria
    console.log('Categoria removida:', selectedCategory);
    closeModal();
    setModalVisibleEditar(false)
    setModalVisibleRemover(false)
  };

  // Abre o modal do FAB
  const openFABModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.gridBox}>
          {rows.map((grupo, index) => (
            <View key={index} style={styles.rowFlex}>
              {grupo ? grupo.map((categoria, index) => (
                <CategoryAvatar
                  key={categoria.name}
                  categoryKey={categoria.name}
                  name={categoria.name}
                  photo={categoria.photo}
                  onPress={() => openModalEditar(categoria)}
                />
              )) : ""}
            </View>
          ))}
        </View>
      </ScrollView>

 
  {/* Botão de Ação Flutuante (FAB) para abrir o modal do FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={openFABModal} // Alterado para chamar a função openFABModal
      />

  {/* Modal para confirmar remoção de categoria */}
      {selectedCategory && (
        <Modal
          visible={modalVisibleRemover}
          transparent={true}
          onRequestClose={() => setModalVisibleRemover(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text variant='titleMedium' style={{ textAlign: 'center', fontSize:20 }}>Você tem certeza que quer excluir essa lista de compras?</Text>
              <Button
                        textColor='#FFFFFF'
                        buttonColor='#ff0000'
                        style={{ marginTop: 10, marginHorizontal: 20, alignSelf:'stretch' }}
                        mode="contained"
                        onPress={() => removeCategory()}
                    >
                        Remover
                    </Button>

                    <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075', alignSelf:'stretch' }}
                        mode="outlined"
                        onPress={() => setModalVisibleRemover(false)}
                    >
                        Cancelar
                    </Button>
            </View>
          </View>
        </Modal>
      )}

       {/* Modal do FAB para adicionar nova categoria */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={{ textAlign: 'center', fontSize:25 }}>Adicionar nova categoria</Text>
              
            <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20, alignSelf:"stretch" }}
              
                    label=" Nome da categoria"
                    mode="outlined"
                    error={false}
                  
                />
            <Text style={{ textAlign: 'left', fontSize:20, marginTop:20}}>Selecione um ícone:</Text>

              <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categorias.map(categoria =>
                            <View key={categoria.name} style={{ display: 'flex', flexDirection: 'row', margin: 5 , alignSelf:'stretch',marginTop:15}}>
                                <CategoryModal categoryKey={categoria.name} photo={categoria.photo} />
                            </View>
                        )}
                    </ScrollView>
                </View>
                 
                 {/* Botões para remover e cancelar */}
                <Button
                        textColor='#FFFFFF'
                        buttonColor='#5DB075'
                        style={{ alignSelf:'stretch'}}
                        mode="contained"
                        onPress={() => removeCategory()}
                    >
                        Salvar
                    </Button>
                
                <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, alignSelf:'stretch' }}
                        mode="outlined"
                        onPress={() => closeModal()}
                    >
                        Cancelar
                    </Button>
            </View>
          </View>
        </Modal>
      {/* Fim do modal do FAB */}
      
       {/* Modal de eDiTaR nova categoria */}
       <Modal
        visible={modalVisibleEditar}
        transparent={true}
        onRequestClose={() => {setModalVisibleEditar(false)}}
      >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Button
                         textColor='#FFFFFF'
                         buttonColor='#ff0000'
                        style={{ alignSelf:'stretch', marginBottom:10}}
                        mode="contained"
                        onPress={() => openModalRemover("teste")}
                    >
                        Remover Categoria
                    </Button>
            <Text style={{ textAlign: 'center', fontSize:25 }}>Editar categoria</Text>
              
            <TextInput
                    style={{ marginTop: 10, marginHorizontal: 20, alignSelf:"stretch" }}
              
                    label=" Nome da categoria"
                    mode="outlined"
                    error={false}
                  
                />
            <Text style={{ textAlign: 'left', fontSize:20, marginTop:20}}>Selecione um ícone:</Text>

              <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categorias.map(categoria =>
                            <View key={categoria.name} style={{ display: 'flex', flexDirection: 'row', margin: 5 , alignSelf:'stretch',marginTop:15}}>
                                <CategoryModal categoryKey={categoria.name} photo={categoria.photo} />
                            </View>
                        )}
                    </ScrollView>
                </View>
                 
                 {/* Botões para remover e cancelar */}
                <Button
                        textColor='#FFFFFF'
                        buttonColor='#5DB075'
                        style={{ alignSelf:'stretch'}}
                        mode="contained"
                        onPress={() => removeCategory()}
                    >
                        Salvar
                    </Button>
                
                <Button
                        textColor='#5DB075'
                        buttonColor='#FFFFFF'
                        style={{ marginTop: 20, alignSelf:'stretch' }}
                        mode="outlined"
                        onPress={() => closeModal()}
                    >
                        Cancelar
                    </Button>
            </View>
          </View>
        </Modal>
      {/* Fim do modal dE eDiTaR */}
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  gridBox: {
    flexDirection: 'column',
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#c0e8f4',
    padding: 10,
    borderRadius: 50,
  },
  imageContainerAvatar: {
    backgroundColor: '#c0e8f4',
    padding: 10,
    borderRadius: 50,
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
    backgroundColor: '#b0ea93',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default Categorias;
