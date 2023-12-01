import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Text, TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator, Avatar, FAB, Button, TextInput } from 'react-native-paper';
import { deleteCategoria, getCategorias, postCategoria, updateCategoria } from '../../../Controller/Categoria/categoriaController';
import { baseDeImagemCategorias } from '../../../Controller/Despensa/baseImageCategoryControl';
import {  useFocusEffect } from '@react-navigation/native';
import _isEqual from 'lodash/isEqual';
import categoria from '../../../Model/Firestore/categoria';
// Componente funcional para exibir uma categoria com imagem e texto
const CategoryAvatar = ({ categoryKey, name, photo,  onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.avatarContainer}>
                <View style={{...styles.imageContainerAvatar }}>
                    <Image size={70} source={photo} />
                </View>
                <Text style={styles.categoryText}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

// Componente funcional para exibir uma categoria dentro de um modal
const CategoryModal = ({ categoryKey, name, photo, checked, onPress, selectedId }) => {
    return (
        // {backgroundColor: categoria.key === selectedId ? '#6e3b6e' : '#C0E8F4'}
        <TouchableOpacity key={categoryKey} onPress={()=>onPress(categoryKey)}>
            <View key={categoryKey} style={styles.avatarContainer}>
                <View style={{...styles.imageContainer,backgroundColor: categoryKey === selectedId ? '#6e3b6e' : '#C0E8F4'}}>
                    <Image size={70} source={photo} />
                </View>
                <Text style={styles.categoryText}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};



// Lista de categorias pré-definidas
const categorias = [
    { name: 'Todas as categorias', photo: require('../../../Assets/Categories/Hamper.png'), value:'Hamper.png' },
    { name: 'Geladeira', photo: require('../../../Assets/Categories/Fridge.png'), value:'Fridge.png' },
    { name: 'Hortifruti', photo: require('../../../Assets/Categories/Fruits.png'), value:'Fruits.png' },
    { name: 'Armário da cozinha', photo: require('../../../Assets/Categories/Pantry.png'), value:'Pantry.png' },
    { name: 'Banheiro', photo: require('../../../Assets/Categories/Bathtub.png'), value:'Bathtub.png' },
    { name: 'Lavanderia', photo: require('../../../Assets/Categories/WashingMachine.png'), value:'WashingMachine.png' },
    { name: 'Gato', photo: require('../../../Assets/Categories/Cat.png'), value:'Cat.png' },
    { name: 'Cachorro', photo: require('../../../Assets/Categories/Corgi.png'), value:'Corgi.png' },
    { name: 'Garagem', photo: require('../../../Assets/Categories/Garage.png'), value:'Garage.png' },
    { name: 'Horta', photo: require('../../../Assets/Categories/GrowingPlant.png'), value:'GrowingPlant.png' },
    { name: 'Patinha', photo: require('../../../Assets/Categories/Heartwithdogpaw.png'), value:'Heartwithdogpaw.png' },
    { name: 'Sofá', photo: require('../../../Assets/Categories/LivingRoom.png'), value:'LivingRoom.png' },
    { name: 'Cama', photo: require('../../../Assets/Categories/SleepinginBed.png'), value:'SleepinginBed.png' }
];


// Componente principal que gerencia o estado e a renderização das categorias
const Categorias = ({ navigation }) => {
    const [minhasCategorias, setMinhasCategorias] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleEditar, setModalVisibleEditar] = useState(false);
    const [modalVisibleRemover, setModalVisibleRemover] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [nomeCategoria, setNomeCategoria] = useState('')
    const [fotoCategoria, setFotoCategoria] = useState('')
    const [selectedId, setSelectedId] = useState()
    // Abre o modal para adicionar uma categoria
    const openModal = (category) => {
        setSelectedCategory(category);
        setModalVisible(true);
    };

    // Abre o modal ao clicar em uma categoria
    const openModalEditar = (category) => {
        setSelectedCategory(category);
        setSelectedId(category.foto)
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
        setSelectedId(null)
        resetarCampos()
    };

    const closeModalEditar = () => {
        setModalVisibleEditar(false)
        setSelectedId(null)
        resetarCampos()
    }
    // Remove a categoria selecionada (ainda precisa ser implementado)
    const removeCategory = async () => {
        // Implementar a lógica de remoção da categoria
        const categoriaId = selectedCategory.key
        console.log("Categoria a ser removida", selectedCategory)
        console.log("Categoria removida com sucesso", categoriaId)
        await deleteCategoria(categoriaId)
      
        closeModal();
        setModalVisibleEditar(false)
        setModalVisibleRemover(false)
        carregarCategorias()
        
        
    };

    // Abre o modal do FAB
    const openFABModal = () => {
        setModalVisible(true);
    };

    const handleCategoriaClique = (nomeCategoria) => {
        // Faça algo com o nome da categoria clicada
        setSelectedId(nomeCategoria)
        console.log("nome categoria", nomeCategoria)
        if (categorias.some(categoria => categoria.value === nomeCategoria)) {
            console.log('Categoria clicada:', nomeCategoria);
            setFotoCategoria(nomeCategoria);
        } else {
            console.error('Categoria inválida:', nomeCategoria);
        }
      };

    
    const salvarCategoria =async ()=>{
        const novaCategoria = {
            nome: nomeCategoria,
            foto: fotoCategoria 
        }
        console.log(novaCategoria)
        await postCategoria(novaCategoria)
        resetarCampos()
        closeModal();
        carregarCategorias()
        
    }

    const editarCategoria = async ()=>{
        const categoriaId = selectedCategory.key
        const categoriaEditada = {
            nome: selectedCategory.nome,
            foto: selectedCategory.foto
        }

        console.log("Nome:", nomeCategoria, " Foto:", fotoCategoria)
        // console.log(categoriaEditada)
        if(nomeCategoria !== ''){
            console.log("Nome precisa ser nome Categoria")
            categoriaEditada.nome = nomeCategoria
        }
           
        if(fotoCategoria !== ''){
            console.log("Foto precisa ser foto Categoria")
            categoriaEditada.foto = fotoCategoria
        }
            
        console.log("Categoria id", categoriaId, "Categoria Editada", categoriaEditada)

        await updateCategoria(categoriaId, categoriaEditada)
        closeModalEditar()
        carregarCategorias()
        // Adicionar mensagem de alerta
    }


    const resetarCampos = ()=>{
        setNomeCategoria('')
        setFotoCategoria('')
    }

    const carregarCategorias = async () => {
        const data = await getCategorias()
        let aux = []
        console.log("Data", data)
        if(  data && data.length > 0){
            aux = data.reduce((rows, key, index) => (index % 3 === 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows, []);

           
            setMinhasCategorias(aux);
            
            
        }else{
            setMinhasCategorias(null)
        }

        setLoading(false)
    }

    const baseImage = (categoriaFoto) =>{
        return baseDeImagemCategorias.findIndex(image => image.value == categoriaFoto) + 1
    }


    useEffect(() => {
        carregarCategorias()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            carregarCategorias()
            return () => console.log("Categorias atualizadas");
        }, [])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator animating={true} color="#00ff00" />
            </View>
        )
    }else{
    return (
        <View style={styles.container}>
            {
                minhasCategorias === null ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../../Assets/Categories/Hamper.png')}
                            style={{ marginTop: 30, opacity: 0.8 }}
                        />
                        <Text
                            variant="headlineMedium"
                            style={{
                                fontSize: 18,
                                color: '#898585'
                            }}>
                            Nenhuma categoria encontrada!
                        </Text>
                        <FAB
                            icon="plus"
                            style={styles.fab}
                            onPress={openFABModal} // Alterado para chamar a função openFABModal
                        />
                    </View>:
                    <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={styles.gridBox}>
                        {minhasCategorias.map((grupo, i) => (
                            <View key={i} style={styles.rowFlex}>
                                {grupo ? grupo.map((categoria, index) => (
                                    <CategoryAvatar
                                        key={index}
                                        categoryKey={categoria.nome}
                                        name={categoria.nome}
                                        photo={baseImage(categoria.foto)}
                                        onPress={() => openModalEditar(categoria)}
                                    />
                                )) : ""}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            }
            


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
                            <Text variant='titleMedium' style={{ textAlign: 'center', fontSize: 20 }}>Você tem certeza que quer excluir essa lista de compras?</Text>
                            <Button
                                textColor='#FFFFFF'
                                buttonColor='#ff0000'
                                style={{ marginTop: 10, marginHorizontal: 20, alignSelf: 'stretch' }}
                                mode="contained"
                                onPress={() => removeCategory()}
                            >
                                Remover
                            </Button>

                            <Button
                                textColor='#5DB075'
                                buttonColor='#FFFFFF'
                                style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20, borderColor: '#5DB075', alignSelf: 'stretch' }}
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
                        <Text style={{ textAlign: 'center', fontSize: 25 }}>Adicionar nova categoria</Text>

                        <TextInput
                            style={{ marginTop: 10, marginHorizontal: 20, alignSelf: "stretch" }}

                            label=" Nome da categoria"
                            mode="outlined"
                            error={false}
                            value={nomeCategoria}
                            onChangeText={nomeCategoria => setNomeCategoria(nomeCategoria)}

                        />
                        <Text style={{ textAlign: 'left', fontSize: 20, marginTop: 20 }}>Selecione um ícone:</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {categorias.map(categoria =>
                                    <View key={categoria.value} style={{ display: 'flex', flexDirection: 'row', margin: 5, alignSelf: 'stretch', marginTop: 15 }}>
                                        <CategoryModal categoryKey={categoria.value} photo={categoria.photo} onPress={handleCategoriaClique} selectedId={selectedId}/>
                                    </View>
                                )}
                            </ScrollView>
                        </View>

                        {/* Botões para remover e cancelar */}
                        <Button
                            textColor='#FFFFFF'
                            buttonColor='#5DB075'
                            style={{ alignSelf: 'stretch' }}
                            mode="contained"
                            onPress={() => salvarCategoria()}
                        >
                            Salvar
                        </Button>

                        <Button
                            textColor='#5DB075'
                            buttonColor='#FFFFFF'
                            style={{ marginTop: 20, alignSelf: 'stretch' }}
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
                onRequestClose={() => { setModalVisibleEditar(false) }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Button
                            textColor='#FFFFFF'
                            buttonColor='#ff0000'
                            style={{ alignSelf: 'stretch', marginBottom: 10 }}
                            mode="contained"
                            onPress={() => openModalRemover(selectedCategory)}
                        >
                            Remover Categoria
                        </Button>
                        <Text style={{ textAlign: 'center', fontSize: 25 }}>Editar categoria</Text>

                        <TextInput
                            style={{ marginTop: 10, marginHorizontal: 20, alignSelf: "stretch" }}

                            label=" Nome da categoria"
                            mode="outlined"
                            error={false}
                            defaultValue={selectedCategory.nome}
                            onChangeText={e => setNomeCategoria(e)}
                        />
                        <Text style={{ textAlign: 'left', fontSize: 20, marginTop: 20 }}>Selecione um ícone:</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {categorias.map(categoria =>
                                    <View key={categoria.name} style={{ display: 'flex', flexDirection: 'row', margin: 5, alignSelf: 'stretch', marginTop: 15 }}>
                                        <CategoryModal categoryKey={categoria.value} photo={categoria.photo} checked={selectedCategory.foto} onPress={handleCategoriaClique} selectedId={selectedId}/>
                                    </View>
                                )}
                            </ScrollView>
                        </View>

                        {/* Botões para remover e cancelar */}
                        <Button
                            textColor='#FFFFFF'
                            buttonColor='#5DB075'
                            style={{ alignSelf: 'stretch' }}
                            mode="contained"
                            onPress={() => editarCategoria()}
                        >
                            Salvar
                        </Button>

                        <Button
                            textColor='#5DB075'
                            buttonColor='#FFFFFF'
                            style={{ marginTop: 20, alignSelf: 'stretch' }}
                            mode="outlined"
                            onPress={() => closeModalEditar()}
                        >
                            Cancelar
                        </Button>
                    </View>
                </View>
            </Modal>
            {/* Fim do modal dE eDiTaR */}
        </View>
    );
    }

    
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
        marginBottom: 20,
        width: 90
    },
    imageContainer: {
        backgroundColor: '#c0e8f4',
        padding: 10,
        borderRadius: 50,
    },
    imageContainerAvatar: {
        // backgroundColor: '#c0e8f4',
        borderRadius: 50,
    },
    categoryText: {
        textAlign: 'center',
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
