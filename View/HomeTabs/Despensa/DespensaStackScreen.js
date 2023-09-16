import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Despensa from './Despensa';
import AdicionarProduto from './AdicionarProduto';

const DespensaStack = createNativeStackNavigator();

function DespensaStackScreen() {
  return (
    <DespensaStack.Navigator>
      <DespensaStack.Screen name="Despensa" component={Despensa} />  
      <DespensaStack.Screen name="AdicionarProduto" component={AdicionarProduto} />     
    </DespensaStack.Navigator>
  );
}

export default DespensaStackScreen