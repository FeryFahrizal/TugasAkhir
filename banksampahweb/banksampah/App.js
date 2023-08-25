// In App.js in a new project

import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    LoginScreen,
    RegisterScreen,
    KonfirmasiScreen,
    HomeScreen,
    TransaksiScreen,
    BaruScreen,
    ProsesScreen,
    SelesaiScreen,
    BatalScreen,
    JemputScreen,
    JenisScreen,
    DetailjenisScreen,
    ProfileScreen,
    AlamatUpdateScreen,
    DetailtransaksiScreen
} from "./screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Konfirmasi" component={KonfirmasiScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transaksi" component={TransaksiScreen} />
        <Stack.Screen name="Baru" component={BaruScreen} />
        <Stack.Screen name="Proses" component={ProsesScreen} />
        <Stack.Screen name="Selesai" component={SelesaiScreen} />
        <Stack.Screen name="Batal" component={BatalScreen} />
        <Stack.Screen name="Detailtransaksi" component={DetailtransaksiScreen} />
        <Stack.Screen name="Jemput" component={JemputScreen} />
        <Stack.Screen name="Jenis" component={JenisScreen} />
        <Stack.Screen name="Detailjenis" component={DetailjenisScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AlamatUpdate" component={AlamatUpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;