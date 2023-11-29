import { useEffect, useState } from 'react';
import { Text } from "react-native-paper";
import { Image, Platform, TouchableOpacity, View} from 'react-native';
import FastImage from "react-native-fast-image";
import { useAppState } from "@react-native-community/hooks";
import { baseDeImagemCategorias } from '../../../Controller/Despensa/baseImageCategoryControl';

const CategoryAvatar = ({ categorias, setSelectedId, selectedId }) => {
        
    //Adicionar chamada ao controller aqui! provavelmente...

    const baseImage = (categoriaFoto) =>{
         return baseDeImagemCategorias.findIndex(image => image.value == categoriaFoto)
    }


    const listaCategorias = categorias.map(categoria =>

        <TouchableOpacity onPress={() => setSelectedId(categoria.key)} style={{ margin: 5, backgroundColor: 'transparent' }} key={categoria.key}>
            {/* Caso as fotos não venham com background, alterar o background color */}
            {/* <Avatar.Image source={photo} style={{backgroundColor: '#C0E8F4'}} size={70}/>
            <View style={{ height: 40, width: 70 }}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>{name}</Text>
            </View> */}
            <View style={{ backgroundColor: categoria.key === selectedId ? '#6e3b6e' : '#C0E8F4', borderWidth: 0, borderRadius: 35, height: 70, width: 70 }}>
                <View style={{ backgroundColor: 'white', borderTopWidth: 0, height: 10, width: 70, position: 'relative', alignSelf: 'center', top: 60 }}/>
                
                {/* <Text>{baseImage(categoria.foto)}</Text> */}
                <Image source={baseDeImagemCategorias[baseImage(categoria.foto)].foto} style={{ width: 70, height: 70, position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -35 }, { translateY: -40 }] }} />
            </View>
            <View style={{ height: 60, width: 80 }}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>{categoria.nome}</Text>
            </View>
        </TouchableOpacity>
        
    )

    return (
        <View style={{ display: 'flex', flexDirection: 'row', margin: 5 }}>
            {listaCategorias}
        </View>

    );
}

export default CategoryAvatar;