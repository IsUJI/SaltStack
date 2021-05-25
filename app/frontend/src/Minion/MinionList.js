import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DetailsContext } from '../DetailsContext';
import { Modal, Grid, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const MinionsContext = createContext({
	minions: [], getMinions: () => { }
})

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		marginTop: '5%',
		marginLeft: '22%',
		width: '50%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},

	button: {
		marginTop: 5,
		borderRadius: 10,
		padding: 10,
		fontSize: 18,
	},

	card: { 
		padding: 15,
		borderColor: 'rgb(41, 210, 41)', 
		borderRadius: '10', 
		borderWidth: 'medium', 
	}
}));

export default function MinionList() {

	const classes = useStyles();
	const { details, setDetails } = useContext(DetailsContext)
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

	const selectMinion = minion => {
		console.log("Minion selected: " + minion._id)
		setDetails(minion)
		handleOpen()
	}

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
	  setOpen(true)
	};

	const handleClose = () => {
	  setOpen(false);
	};

	const body = (
		  <div className={classes.paper}>
		    <h2 id="simple-modal-title">{details.name}</h2>
		    <p id="simple-modal-description">
		      Display de los detalles.
		      {details.created}
		    </p>
		  </div>
		);

	return (
		<MinionsContext.Provider value={{ minions, getMinions }}>
			<div>
				<Grid container spacing={5}>
					{minions.map((minion) => (
						<Grid item xs={3} key={minion._id}>
							<Card variant="outlined" className={classes.card}>
								<CardContent>
									<h2>{minion._id}</h2>
									
								</CardContent>
								<CardActions>
									<button className={classes.button} type="button" onClick={() => selectMinion(minion)}>
										DETAILS
									</button>
									<Modal
										open={open}
										onClose={handleClose}
										aria-labelledby="simple-modal-title"
										aria-describedby="simple-modal-description"
									>
										{body}
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