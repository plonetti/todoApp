<SafeAreaProvider>
		<View style={styles.container}>
		<Appbar.Header>
			<Appbar.Content title="Note Giornaliere" />  
		</Appbar.Header>
		
		<TextInput style={{backgroundColor:'white'}}
		label="Aggiungi nota"
		value={note} 
		onChangeText={(note) => setNote(note) } 
		/>
		<Button mode="contained" onPress={()=>addNote()} style={{margin:5, backgroundColor:'#A52A2A'}}>
			Salva
		</Button>
	
		
		<FlatList
			data={notes}
			keyExtractor={(item,index)=>index.toString()}
			renderItem={({item})=><Text>{item}</Text>}
		/>

	       
		<StatusBar style="auto" />
	</View>
	</SafeAreaProvider>

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