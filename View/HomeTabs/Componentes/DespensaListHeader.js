import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native'
import { Divider, Searchbar, Text } from 'react-native-paper';
import CategoryAvatar from './CategoryAvatar';
import { getCategorias } from '../../../Controller/Categoria/categoriaController';
import categoria from '../../../Model/Firestore/categoria';
import { set } from 'date-fns';
//Componente para o ListHeader do FlatList [partes da tela que não são itens da lista]
const DespensaListHeader = ({ categorias, searchQuery, setSearchQuery, setSelectedId, selectedId, setSearchCategoria, setWhatCategoryIs }) => {
    const onChangeSearch = query => setSearchQuery(query);

    //iniciar com o ID de "Todas as Categorias"
    /*esse useState é criado aqui e passado como parametro para CategoryAvatar
    para poder alterar o nome da categoria atual no <Text> junto com o useEffect*/
    //const [selectedId, setSelectedId] = useState(1);
    const [categoryName, setCategoryName] = useState('');
    //pega o selectedId, busca em categorias qual item possui esse id e seta o nome em setCategoryName
    const carregarCategoriaSelecionada = async () => {
        // try {
        if (categorias && categorias.length > 0) {
            let findCategoria = await categorias.findIndex((categoria) => selectedId === categoria.key)
            console.log("Find", findCategoria);
            setSearchCategoria(categorias[findCategoria].nome)
            setCategoryName(categorias[findCategoria].nome)
            setWhatCategoryIs(findCategoria)
            
        } else {
            console.log("Entrei aqui, categoria não existe")
            setCategoryName('Todas as categorias')
            setSearchCategoria('Todas as categorias')
            setWhatCategoryIs(0)
        }

        // } catch (error) {
        //     console.log("Erro", error);
        // }
    }

    useEffect(() => {
            console.log("DESPENSALISTHEADER")
            carregarCategoriaSelecionada()       
    }, [selectedId])

    return (
        <>
            <Text
                variant="titleMedium"
                style={{
                    marginTop: 10,
                    marginStart: 22
                }}>
                Filtrar Categorias
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <CategoryAvatar categorias={categorias} setSelectedId={setSelectedId} selectedId={selectedId}/>
                </ScrollView>
            </View>

            <Text
                variant="titleLarge"
                style={{
                    marginTop: 10,
                    marginStart: 22
                }}>
                Produtos
            </Text>
            <Text
                variant="titleSmall"
                style={{
                    marginStart: 22,
                    color: '#898585'
                }}>
                {/* Nome da categoria atual */}
                {categoryName}
            </Text>
            <View style={{ marginTop: 10 }}>
                <Divider bold style={{ backgroundColor: '#898585' }} />
                <Searchbar
                    style={{ backgroundColor: '#fff' }}
                    mode='view'
                    placeholder="Procurar produtos"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
        </>
    )
}

export default DespensaListHeader