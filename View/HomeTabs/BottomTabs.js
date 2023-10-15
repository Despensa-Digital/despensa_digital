import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Cada bottom menu tem sua stack
import HomeStackScreen from './Home/HomeStackScreen';
import DespensaStackScreen from './Despensa/DespensaStackScreen';
import ListasStackScreen from './Listas/ListasStackScreen';
import CategoriasStackScreen from './Categorias/CategoriasStackScreen';
import MaisStackScreen from './Mais/MaisStackScreen';

const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {

    return (
      <Tab.Navigator
        initialRouteName="HomeTab"
        activeColor="#5DB075"
        inactiveColor="#000"
        barStyle={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: 'rgba(0, 0, 0, .1)' }}
        screenOptions={{ headerShown: false }}               
      >
        <Tab.Screen 
            name="HomeTab" 
            component={HomeStackScreen}            
            options={{                
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home-outline" color={color} size={36} width= {36} height={40} />),
                title: "Home"
            }}
        />
        <Tab.Screen 
            name="DespensaTab" 
            component={DespensaStackScreen} 
            options={{ 
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="wardrobe-outline" color={color} size={36} width= {36} height={40} />),   
                title: "Despensa"           
            }}
        />
        <Tab.Screen 
            name="ListasTab" 
            component={ListasStackScreen} 
            options={{               
                 tabBarIcon: ({color}) => (<MaterialCommunityIcons name="clipboard-outline" color={color} size={36} width= {36} height={40} />),   
                 title: "Listas"                     
            }}
        />
        <Tab.Screen 
            name="CategoriasTab" 
            component={CategoriasStackScreen} 
            options={{
                 tabBarIcon: ({color}) => (<MaterialCommunityIcons name="view-grid-plus-outline" color={color} size={36} width= {36} height={40} />),   
                 title: "Categorias"                               
            }}
        />
        <Tab.Screen 
            name="MaisTab" 
            component={MaisStackScreen} 
            options={{ 
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="menu" color={color} size={36} width= {36} height={40} />),   
                title: "Mais"                     
            }}
        />
      </Tab.Navigator>
    );
  }

  export default BottomTabs;

  