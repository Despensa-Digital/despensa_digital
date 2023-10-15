import { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AppBarGerenciarResidenciasButton = () => {
    const navigation = useNavigation();

    return (
        <IconButton
            icon="home-group-plus"
            size={28}
            iconColor='#5DB075'
            onPress={() => navigation.navigate('GerenciarResidencias')}
        />
    );
};

export default AppBarGerenciarResidenciasButton;