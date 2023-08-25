// In App.js in a new project

import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    LoginScreen,
    HomeScreen,
    JemputScreen,
    HistoriScreen,
    HistoridetailScreen,
    ProfileScreen
} from "./";
const Stack = createNativeStackNavigator();

function App() {

  const [defaultRoute, setdefaultRoute] = useState('')
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={`Login`}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Jemput" component={JemputScreen} />
        <Stack.Screen name="Histori" component={HistoriScreen} />
        <Stack.Screen name="Historidetail" component={HistoridetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;