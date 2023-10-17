import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Listas from './Listas';
import ListaMercado from './ListaMercado';

const ListasStack = createNativeStackNavigator();

function ListasStackScreen() {
  return (
    <ListasStack.Navigator>
      <ListasStack.Screen name="Listas" component={Listas} />     
      <ListasStack.Screen name="ListaMercado" component={ListaMercado} />     

    </ListasStack.Navigator>
  );
}

export default ListasStackScreen