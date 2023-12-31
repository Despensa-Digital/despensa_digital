import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import AppBarGerenciarResidenciasButton from './AppBarGerenciarResidenciasButton';
import GerenciarResidencias from '../Residencias/GerenciarResidencias';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => <AppBarGerenciarResidenciasButton />
          }}
        />
      </HomeStack.Group>

      {/* Grupo de telas de Gerenciar Residência */}
      <HomeStack.Group>
        <HomeStack.Screen
          name="GerenciarResidencias"
          component={GerenciarResidencias}
          options={{
            title: "Gerenciar Residências"
          }}
        />
      </HomeStack.Group>

    </HomeStack.Navigator>
  );
}

export default HomeStackScreen