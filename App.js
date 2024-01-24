import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView , FlatList} from 'react-native';
import {Appbar,Text, TextInput, Button, Card, List, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

const [note, setNote] = useState("");
const [notes, setNotes] = useState([]);


const addNote =async ()=> { 	 
	const updateNotes=[...notes,note];
	setNotes([...notes, note]); //la notazione ... permette di diffondere una array all'interno di un altro 
	setNote("");
	await updateAsyncStorage(notes);	
}

const deleteNotes= async(i)=> { 
	const updateNotes=[...notes];
	updateNotes.splice(i,1); // At position i, remove 1 items
	await updateAsyncStorage(updateNotes);
	setNotes(updateNotes);
	};
	
const updateAsyncStorage=(notes)=>{
return new Promise ( async (resolve, reject) =>{
	try {
		await AsyncStorage.removeItem('notes');
		await AsyncStorage.setItem('notes', JSON.stringify(notes));
		return resolve(true);
	} catch (e){
		console.log('cioeeeeeeee');
		return reject(e);
	}
});
}
     
useEffect( ()=>{
	const fetchNotes=async()=>{
	try{
		const storedNotes=await AsyncStorage.getItem('notes');
		if (storedNotes){
			setNotes(JSON.parse(storedNotes));
		}
	}catch(error){
		console.log("Errore:",error);
	}
	};
	fetchNotes();
	},[]);
	
  return (
		<SafeAreaProvider>
		<View style={styles.container}>
		<Appbar.Header>
			<Appbar.Content title="Note Giornaliere" />  
		</Appbar.Header>
		
		<TextInput style={{backgroundColor:'white'}}
		label="Aggiungi nota"
		value={note} 
		onChange={(note) => setNote(note.target.value) } 
		/>
		<Button mode="contained" onPress={()=>addNote()} style={{margin:5, backgroundColor:'#A52A2A'}}>
			Salva
		</Button>
		<ScrollView>
		<View>
	
		{notes.map ( (item, index) => 
			(<Card key={index} style={{margin:5}}>               
			  <List.Item
				title={item+"XXX"}
				right={() => <IconButton icon="delete"  onPress={()=>{deleteNotes(index)} } />}
				/>       
			</Card>             
			)
		  )
	  	}
		</View>  
		</ScrollView>         
		<StatusBar style="auto" />
	</View>
	</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d3d3d3',   
    }
  });
