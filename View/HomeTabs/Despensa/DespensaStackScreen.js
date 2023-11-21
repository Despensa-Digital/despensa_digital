<<<<<<< HEAD
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Despensa from './Despensa';
import AdicionarProduto from './AdicionarProduto';
import EditarProduto from './EditarProduto';

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
    </DespensaStack.Navigator>
  );
}

=======
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Despensa from './Despensa';
import AdicionarProduto from './AdicionarProduto';
import EditarProduto from './EditarProduto';
// import AdicionarExistente from './AdicionarExistente';

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
      {/* <DespensaStack.Screen
        name='AdicionarExistente'
        component={AdicionarExistente}
        options={{ title: 'Adicionar produto' }} /> */}
    </DespensaStack.Navigator>
  );
}

>>>>>>> origin/luna_novo
export default DespensaStackScreen