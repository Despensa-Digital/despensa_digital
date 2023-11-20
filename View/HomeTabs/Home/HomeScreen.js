import { useState } from 'react';
import { FlatList } from 'react-native'
import { PaperProvider } from 'react-native-paper';

import HomeListHeader from '../Componentes/HomeListHeader';
import HomeRenderItem from '../Componentes/HomeRenderItem';
import HomeEmptyList from '../Componentes/HomeEmptyList';

const HomeScreen = () => {

    // const products = [
    //     { name: 'Beer', image: require('../../../Assets/Products/beer.png'), expire: '30/09/2023', key: 1 },
    //     { name: 'Coffee', image: require('../../../Assets/Products/Coffee.png'), expire: '30/09/2023', key: 2 },
    //     { name: 'Cola', image: require('../../../Assets/Products/Cola.png'), expire: '30/09/2023', key: 3 },
    //     { name: 'Juice', image: require('../../../Assets/Products/Juice.png'), expire: '30/09/2023', key: 4 },
    //     { name: 'Milk', image: require('../../../Assets/Products/Milk.png'), expire: '30/09/2023', key: 5 },
    //     { name: 'Rice', image: require('../../../Assets/Products/Rice.png'), expire: '30/09/2023', key: 6 },
    // ]

    const [products, setProducts] = useState([
        { key: 1, codigoDeBarras: '1234567891234', name: 'Cerveja', marca: 'Brahma', image: 'https://cdn-cosmos.bluesoft.com.br/products/7891149102488', expire: '30/09/2023', quantidade: '6', categoria: 'Geladeira', peso: '350', unidadeMedida: 'mL' },
        { key: 2, codigoDeBarras: '1234567891234', name: 'Café', marca: 'Pilão', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896089012453', expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '500', unidadeMedida: 'g' },
        { key: 3, codigoDeBarras: '1234567891234', name: 'Coca-Cola', marca: 'Coca-Cola', image: 'https://cdn-cosmos.bluesoft.com.br/products/7894900019155', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '200', unidadeMedida: 'mL' },
        { key: 4, codigoDeBarras: '1234567891234', name: 'Suco de Laranja', marca: 'Xandô', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896623100028', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L' },
        { key: 5, codigoDeBarras: '1234567891234', name: 'Leite', marca: 'Parmalat', image: 'https://cdn-cosmos.bluesoft.com.br/products/3789603461001', expire: '30/09/2023', quantidade: '1', categoria: 'Geladeira', peso: '1', unidadeMedida: 'L' },
        { key: 6, codigoDeBarras: '1234567891234', name: 'Arroz', marca: 'Camil', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896006711117', expire: '30/09/2023', quantidade: '1', categoria: 'Armário da Cozinha', peso: '1', unidadeMedida: 'kg' },
    ])


    return (
        <PaperProvider>          
            <FlatList
                style={{ backgroundColor: '#fff' }}
                data={products}
                keyExtractor={item => item.key}
                ListHeaderComponent={HomeListHeader}
                renderItem={({ item }) => <HomeRenderItem item={item} />}
                ListEmptyComponent={HomeEmptyList}
                onRefresh={() => console.log("refreshing")}
                //if set to true, the UI will show a loading indicator
                refreshing={false}
            />
        </PaperProvider>

    );
};

export default HomeScreen;