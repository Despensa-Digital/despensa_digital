
import { useState } from 'react';
import { Appbar, PaperProvider, Text, TouchableRipple } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

const AppBarButton = () => {

    const navigation = useNavigation();
    return (
        <TouchableRipple
            onPress={() => navigation.navigate('Cadastro')}
            rippleColor="rgba(0, 0, 0, .32)">
            <Text style={{ color: '#5DB075', fontSize: 14 }}>Cadastrar</Text>
        </TouchableRipple>
    );
};

export default AppBarButton;