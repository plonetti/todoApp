import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Appbar, TextInput, Button, Card, List, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {

	const [note, setNote] = useState('');
	const [notes, setNotes] = useState([]);
		
	const cloneNotes=()=>{
		return [...notes];
	}
/*
	const addNote1 =async ()=> { 
		if (note.length <=0)
			return;  
		const notes=cloneNotes();
		notes.push(note);
		await updateAsyncStorage(notes);
		setNote('');
  }
  */
  const addNote =async ()=> { 
		if (note.length <=0)
			return;  
		const updateNotes=[...notes,note];
		setNotes(updateNotes);
		await updateAsyncStorage(updateNotes);
		setNote('');
  }
  
   const deleteNotes1= async(i)=> {
		const notes = cloneNotes();
		notes.splice(i,1);
      	await this.updateAsyncStorage(notes);
		setNotes(notes);
		//getNotes();
		};
    const deleteNotes= async(i)=> {
     
      const updateNotes=[...notes,note];
      updateNotes.splice(i,1);
          await this.updateAsyncStorage(updateNotes);
      setNotes(updateNotes);
      //getNotes();
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
	  
	  const getNotes=async ()=>{
		try {
		const result=await AsyncStorage.getItem ('notes');
		if (result!==null) setNotes (JSON.parse(result));
		} catch{
		  //read error
		}
	  }
    useEffect( ()=>{
      const fetchNotes=async()=>{
        try{
          const storedNotes=await AsyncStorage.getItem('notes');
          if (storedNotes!==null){
            setNotes(JSON.parse(storedNotes));
          }
        }catch(error){
          console.log("Errore:",error);
        }
      };
      fetchNotes();
      },[]);
	  /*
	  useEffect( ()=>{
		getNotes()
	  },[notes]);
	*/  

/*
    componentDidMount=async ()=>{
      AsyncStorage.removeItem("notes")
      const notes=await AsyncStorage.getItem("notes");
      if (notes && notes.length >0){
		setNotes(JSON.parse(notes))
      }
  }
  */
  

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
				title={item}
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
