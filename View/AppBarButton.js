import { useState } from 'react';
import { Appbar, PaperProvider, Text, TouchableRipple } from 'react-native-paper';


const AppBarButton = () => {

    return (
        <TouchableRipple
            onPress={() => console.log('Pressionei o cadastras')}
            rippleColor="rgba(0, 0, 0, .32)">
            <Text style={{ color: '#5DB075', fontSize: 14 }}>Cadastrar</Text>
        </TouchableRipple>
    );
};

export default AppBarButton;