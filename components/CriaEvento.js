import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Dimension } from 'react-native';
// import firebase from './components/Firebase.js';
import database from '@firebase/database';
import { useNavigation } from '@react-navigation/core';
import firebase from './Firebase.js';

const styles = StyleSheet.create({
	button: {
		flex: 1,
		backgroundColor: "green",
	},
});

export default function criaEvento(){
	const navigation = useNavigation();
	const [evento, setEvento] = useState();
	const [dataI, setDataI] = useState();
	const [desc, setDesc] = useState();
	const [dataF, setDataF] = useState();

	async function addEvento(evento, dataI, desc, dataF){
		let lake = await firebase.database().ref("eventos");
		let k = lake.push().key;
		let data = {
			evento: evento,
			data_fim: dataF,
			data_inicio: dataI,
			descricao: desc
		};
		console.log(data);
		lake.child(k).set(data)
		alert("Dados enviados");
		
	}

	// parte visual
	return(
		<View>
			<Text>Evento: </Text>
			<TextInput name={evento} onTextChange={(text) => setEvento(text)}/>

			<Text>Data Início: </Text>
			<TextInput name={dataI} onTextChange={(text) => setDataI(text)}/>

			<Text>Data Fim: </Text>
			<TextInput name={dataF} onTextChanges={(text) => setDataF(text)}/>

			<Text>Descrição: </Text>
			<TextInput name={desc} onTextChange={(text) => setDesc(text)}/>

			<TouchableOpacity style={styles.button} onPress={() => addEvento(evento, dataI, desc, dataF)}>
				<Text>Teste</Text>
			</TouchableOpacity>
		</View>
	)
}

