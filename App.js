//COMPONENTS
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// NAVIGATOR
import {createStackNavigator} from '@react-navigation/stack';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
// SCREENS LOGIN
import WelcomeScreen from './src/screens/login/WelcomeScreen';
import Login from './src/screens/login//Login';
import SignUp from './src/screens/login/SignUp';
// SCREENS MAIN
import Home from './src/screens/main/Home';

//CREATE LOGIN STACK
const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}
      tabBarOption={{}}>
      <LoginStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        Options={{}}
      />
      <LoginStack.Screen name="SignUp" component={SignUp} Options={{}} />
      <LoginStack.Screen name="Login" component={Login} Options={{}} />
    </LoginStack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState();

  return (
    <NavigationContainer>
      <LoginStackScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
