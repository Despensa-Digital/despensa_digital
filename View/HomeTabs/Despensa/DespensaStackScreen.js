import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Despensa from './Despensa';
import AdicionarProduto from './AdicionarProduto';
import EditarProduto from './EditarProduto';
import AdicionarExistente from './AdicionarExistente';
import VerItem from './VerItem'

const DespensaStack = createNativeStackNavigator();

function DespensaStackScreen() {
  return (
    <DespensaStack.Navigator>
      <DespensaStack.Screen name='Despensa' component={Despensa} />
      <DespensaStack.Screen
        name='AdicionarProduto'
        component={AdicionarProduto}
        options={{ title: 'Adicionar produto' }} />
      <DespensaStack.Screen
        name='EditarProduto'
        component={EditarProduto}
        options={{ title: 'Editar produto' }} />
      <DespensaStack.Screen
        name='AdicionarExistente'
        component={AdicionarExistente}
        options={{ title: 'Adicionar produto' }} />
         <DespensaStack.Screen
        name='VerItem'
        component={VerItem}
        options={{ title: 'Ver Item' }} />
    </DespensaStack.Navigator>
  );
}

export default DespensaStackScreen