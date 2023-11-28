import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Mais from './Mais';
import EditarPerfil from './EditarPerfil';

const MaisStack = createNativeStackNavigator();

function MaisStackScreen() {
  return (
    <MaisStack.Navigator>
      <MaisStack.Screen name="Mais" component={Mais} /> 
      <MaisStack.Screen name="Editar Perfil" component={EditarPerfil} />     
    </MaisStack.Navigator>
  );
}

export default MaisStackScreen