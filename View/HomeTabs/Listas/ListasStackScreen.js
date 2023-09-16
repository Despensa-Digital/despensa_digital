import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Listas from './Listas';

const ListasStack = createNativeStackNavigator();

function ListasStackScreen() {
  return (
    <ListasStack.Navigator>
      <ListasStack.Screen name="Listas" component={Listas} />     
    </ListasStack.Navigator>
  );
}

export default ListasStackScreen