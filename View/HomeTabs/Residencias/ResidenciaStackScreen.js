import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GerenciarResidencias from './GerenciarResidencias';
import EditarResidencia from './EditarResidencia';

const ResidenciaStack = createNativeStackNavigator();

function ResidenciaStackScreen() {
  return (
    <ResidenciaStack.Navigator>
      <ResidenciaStack.Screen name="Minha residência" component={GerenciarResidencias} />     
      <ResidenciaStack.Screen name="Minha residência" component={EditarResidencia} />     

    </ResidenciaStack.Navigator>
  );
}

export default ResidenciaStackScreen