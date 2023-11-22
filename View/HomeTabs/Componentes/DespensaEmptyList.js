import { View, Image } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

//Componente para o ListEmptyComponent do FlatList. View exibida quando não há itens na lista
const DespensaEmptyList = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={require('../../../Assets/Categories/Hamper.png')}
                style={{ marginTop: 30, opacity: 0.8 }}
            />
            <Text
                variant="headlineMedium"
                style={{

                    color: '#898585'
                }}>
                Despensa vazia!
            </Text>
        </View>
    )
}

export default DespensaEmptyList