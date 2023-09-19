import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Despensa from './Despensa';
import AdicionarProduto from './AdicionarProduto';

const DespensaStack = createNativeStackNavigator();

function DespensaStackScreen() {
  return (
    <DespensaStack.Navigator>
      <DespensaStack.Screen name='Despensa' component={Despensa} />  
      <DespensaStack.Screen 
        name='AdicionarProduto'
        component={AdicionarProduto} 
        options={{title: 'Adicionar produto'}}/>     
    </DespensaStack.Navigator>
  );
}

export default DespensaStackScreen