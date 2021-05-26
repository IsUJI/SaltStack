import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DetailsContext } from '../DetailsContext';
import { Modal, Grid, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MinionDetails from './MinionDetails';


const MinionsContext = createContext({
	minions: [], getMinions: () => { }
})

const useStyles = makeStyles((theme) => ({

	button: {
		marginTop: '5px',
		borderRadius: '10px',
		padding: '10px',
		fontSize: 18,
	},

	card: {
		padding: 15,
		borderColor: 'rgb(41, 210, 41)',
		borderRadius: '10px',
		borderWidth: 'medium',
	},

	reload: {
		borderRadius: '10px',
		marginBottom: '20px',
		float: 'right',
	}

}));

export default function MinionList() {

	const classes = useStyles();
	const { setDetails } = useContext(DetailsContext)
	const [minions, setMinions] = useState([])
	const getMinions = async () => {
		axios.get(`http://localhost:8000/minions`)
			.then(res => {
				const minions = res.data;
				setMinions(minions);
			})
	}

	useEffect(() => {
		getMinions()
	}, [])

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true)
	};

	const handleClose = () => {
		setOpen(false);
	};

	const selectMinion = minion => {
		console.log("Minion selected: " + minion._id)
		setDetails(minion)
		handleOpen()
	}

	return (
		<MinionsContext.Provider value={{ minions, getMinions }}>
			<div className={classes.reload}>
				<button style={{width: '35px', height: '35px', padding: '2px'}}>
					<img alt="icono" src="https://e7.pngegg.com/pngimages/365/764/png-clipart-computer-icons-refresh-free-one-button-reload-text-logo-thumbnail.png" style={{width: '28px', height: '28px'}}/>
				</button>
			</div>
			<div>
				<Grid container spacing={5}>
					{minions.map((minion) => (
						<Grid item xs={3} key={minion._id}>
							<Card variant="outlined" className={classes.card}>
								<CardContent>
									<h2>{minion._id}</h2>
									<h3>{minion.status.disk['/'].capacity}</h3>
								</CardContent>
								<CardActions>
									<button className={classes.button} type="button" onClick={() => selectMinion(minion)}>
										DETAILS
									</button>
									<Modal
										open={open}
										onClose={handleClose}
									>
										<MinionDetails />
									</Modal>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</MinionsContext.Provider>
	);

}