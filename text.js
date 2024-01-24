<FlatList
			data={notes}
			keyExtractor={(item,index)=>index.toString()}
			renderItem={({item})=><Text>{item}</Text>}
		/>