import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { IdContext } from '../Context'
import { List, ListItem, ListItemText } from '@material-ui/core';


const MinionsContext = createContext({
	minions: [], getMinions: () => {}
})

export default function TodoList () {

	const {setId} = useContext(IdContext)
	const [minions, setMinions] = useState([])
	const getMinions = async () => {
		axios.get(`http://localhost:8000/minions`)
		.then(res => {
			const minions = res.data;
			setMinions(minions);
		})
	}

	useEffect( () => {
		getMinions()
	}, [])

	const selectMinion = id => {
		setId(id)
	}
	return (
		<MinionsContext.Provider value={{minions, getMinions}}>
			<div>
				{ minions.map((minion) => (
					<List component="nav">
						<ListItem key={minion._id} button onClick={() => selectMinion(minion._id)} >
							<ListItemText 
								primary={minion.name}
							/>
						</ListItem>
					</List>
				))}
			</div>
		</MinionsContext.Provider>
	)

}