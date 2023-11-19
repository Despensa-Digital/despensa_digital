import { Avatar, PaperProvider, Text } from "react-native-paper";
import { Image, View } from 'react-native';
import * as React from 'react';

const CategoryAvatar = ({ categoryKey, name, photo }) => {

    return (
        <View style={{ margin: 5, backgroundColor: 'transparent' }} key={categoryKey}>
            {/* Caso as fotos não venham com background, alterar o background color */}
            {/* <Avatar.Image source={photo} style={{backgroundColor: '#C0E8F4'}} size={70}/>
            <View style={{ height: 40, width: 70 }}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>{name}</Text>
            </View> */}
            <View style={{ backgroundColor: '#C0E8F4', borderWidth: 0, borderRadius: 35, height: 70, width: 70 }}>
                <View style={{ backgroundColor: 'white', borderTopWidth: 0, height: 10, width: 70, position: 'relative', alignSelf: 'center', top: 60 }}>
                </View>

                <Image source={photo} style={{ width: 70, height: 70, position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -35 }, { translateY: -40 }] }} />
            </View>
            <View style={{ height: 40, width: 70 }}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>{name}</Text>
            </View>
        </View>


    );
}

export default CategoryAvatar;