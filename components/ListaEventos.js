import React, { useState, Component } from 'react';
import firebase from "./Firebase.js";
import { RefreshControl, StyleSheet, FlatList, View, TouchableOpacity, Text, Button, Dimension, Modal, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import database from '@firebase/database';

var needsReload = false;

const styles = StyleSheet.create({
	eventoContainer: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'black',
		width: 500,
		height: 200,
		marginTop: 10,
		padding: 20,
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	buttonD: {
		backgroundColor: 'red',
		borderColor: 'black',
		borderWidth: 1,
		color: 'white',
		padding: 10,
		maxWidth: 200,
	},
	buttonW: {
		backgroundColor: 'yellow',
		borderColor: 'black',
		borderWidth: 1,
		padding: 10,
		color: 'white',
		maxWidth: 200,
	},
	modal: {
		flex: 1,
		maxHeight: 700,
	},


});

export default function listaEventos(){
	const [lista_eventos, setLista] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [eventoD, setEventoD] = useState(0);

	// modal data
	const [mVisible, setMVisible] = useState(false);
	const [mKey, setMKey] = useState('');
	const [mEvento, setMEvento] = useState('');
	const [mDataI, setMDataI] = useState('');
	const [mDataF, setMDataF] = useState('');
	const [mDesc, setMDesc] = useState('');
	const [mChanged, setMChanged] = useState(false);

	console.log(lista_eventos);
	async function buscaEventos(){
		let eventos = await firebase.database().ref('eventos');
		var key_l = 1;
		var n_arr = [];
		eventos.once('value', snapshot => {
			console.log(needsReload);
			if(!loaded || needsReload){ 
				snapshot.forEach((child) => {
					let row = {key_u: key_l, ck: child.key}
					console.log(child.key);
					for( var i in child.val()){ row[i] = child.val()[i];}
					n_arr.push(row);
					key_l++;
				});
				setLista(n_arr);
				n_arr = [];
				setLoaded(true);
				needsReload = false;
				console.log(loaded);
			}
			else {}
		});
		
	}
	
	function renderEvento({item}){		
		async function delEvento(){
			await firebase.database().ref("eventos").child(item.ck).remove();
			setLoaded(false);
		}

		function set2Update(){
			setMVisible(true);
			setMEvento(item.evento);
			setMDataI(item.data_inicio);
			setMDataF(item.data_fim);
			setMDesc(item.descricao);
			setMKey(item.ck);
		}
		return (
			<View style={styles.eventoContainer}>
				<Text><b>Evento: </b>{item.evento}</Text>
				<Text><b>Descrição: </b><br/>{item.descricao}</Text>
				<Text><b>Data de Início: </b>{item.data_inicio}</Text>
				<Text><b>Data de Fim: </b>{item.data_fim}</Text>
				<TouchableOpacity onPress={delEvento} style={styles.buttonD}>
					<Text>Deletar</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={set2Update} style={styles.buttonW}>
					<Text>Alterar</Text>
				</TouchableOpacity>
			</View>
		);

	}

	async function updateEvento(){
		if(!mChanged){
			await firebase.database().ref("eventos").child(mKey).set({
				evento: mEvento,
				data_inicio: mDataI,
				data_fim: mDataF,
				descricao: mDesc
			}).then(() => {
				alert("Evento alterado");
				unsetModal();
				setLoaded(false);
				setMChanged(true);
			});
		}
		else {}
	}
	function unsetModal(){
		setMVisible(false);
		setMEvento('');
		setMDataI('');
		setMDataF('');
		setMDesc('');
		setMKey('');

	}

	buscaEventos();
	console.log(lista_eventos);
	return (
		<View>
			<Modal
			 animationType="slide"
			 visible={mVisible}
			 transparent={false}
			 style={styles.modal}
			 >
				<View>
					<Text>Evento: </Text>
						<TextInput value={mEvento} onChangeText={(text)=>setMEvento(text)}/>

					<Text>Data Início: </Text>
						<TextInput value={mDataI} onChangeText={(text) => setMDataI(text)}/>

					<Text>Data Fim: </Text>
						<TextInput value={mDataF} onChangeText={text => setMDataF(text)}/>

					<Text>Descrição: </Text>
						<TextInput value={mDesc} onChangeText={text => setMDesc(text)}/>

					<TouchableOpacity style={styles.button} onPress={updateEvento} style={styles.buttonD}>
						<Text>Alterar</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={unsetModal}>
						<Text>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<FlatList 
			 data={lista_eventos}
		         renderItem={renderEvento}
			 keyExtractor={item => item.key_u}
			/>
		</View>
	);
}
