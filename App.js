import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Dimension } from 'react-native';
import firebase from './components/Firebase.js';
import database from '@firebase/database';
import { useNavigation } from '@react-navigation/core';


const Stack = createNativeStackNavigator();

// telas
import criaEvento from './components/CriaEvento.js';
import listaEventos from './components/ListaEventos.js'


function Home(){
	const navigation = useNavigation();
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		      <Text>Home Screen</Text>
		      <TouchableOpacity onPress={() => navigation.navigate('criaEvento')}>
			      <Text>Criar Evento</Text>
		      </TouchableOpacity>
			      <TouchableOpacity onPress={() => {navigation.navigate('Eventos')}}>
				<Text>Ver eventos de Hoje</Text>
		      </TouchableOpacity>
          	</View>
	);
}


export default function App() {
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
	      <Stack.Screen name="Home" component={Home}/>
	      <Stack.Screen name="criaEvento" component={criaEvento}/>
	      <Stack.Screen name="Eventos" component={listaEventos}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
