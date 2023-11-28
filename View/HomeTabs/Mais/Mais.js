import { Avatar, Button, Card, PaperProvider, Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import { signOut } from '../../../Model/Firebase/signOut';

const Mais = ({navigation}) => {

    return (
        <PaperProvider>
            <View style={{ display: 'flex', gap: 40, marginTop: 40 }}>

                <TouchableOpacity onPress={() => navigation.navigate('Editar Perfil')}>
                    <Card.Title
                        title="Editar perfil"
                        titleVariant='titleMedium'
                        titleStyle={{ marginLeft: 10, color: '#000', textAlignVertical: 'center' }}              
                        style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 8, marginHorizontal: 20, backgroundColor: '#fff' }}
                        left={(props) => <Avatar.Icon {...props} icon="account-edit-outline" style={{ backgroundColor: 'transparent' }} size={50} color='#000' />}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => signOut()}>
                    <Card.Title
                        title="Sair"
                        titleVariant='titleMedium'
                        titleStyle={{ marginLeft: 10, color: '#fff', textAlignVertical: 'center' }}
                        style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 8, marginHorizontal: 20, backgroundColor: '#ff0000' }}
                        left={(props) => <Avatar.Icon {...props} icon="logout" style={{ backgroundColor: 'transparent' }} size={50} color='#fff'/>}
                    />
                </TouchableOpacity>

            </View>
        </PaperProvider>

    );
};

export default Mais;