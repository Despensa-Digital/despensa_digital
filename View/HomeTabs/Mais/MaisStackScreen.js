import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Mais from './Mais';

const MaisStack = createNativeStackNavigator();

function MaisStackScreen() {
  return (
    <MaisStack.Navigator>
      <MaisStack.Screen name="Mais" component={Mais} />     
    </MaisStack.Navigator>
  );
}

export default MaisStackScreen