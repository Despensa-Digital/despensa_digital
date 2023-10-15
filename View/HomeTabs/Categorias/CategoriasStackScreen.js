import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Categorias from './Categorias';

const CategoriasStack = createNativeStackNavigator();

function CategoriasStackScreen() {
  return (
    <CategoriasStack.Navigator>
      <CategoriasStack.Screen name="Categorias" component={Categorias} />     
    </CategoriasStack.Navigator>
  );
}

export default CategoriasStackScreen