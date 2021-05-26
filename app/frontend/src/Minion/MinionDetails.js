import React, { useContext } from 'react';
import { DetailsContext } from '../DetailsContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    marginTop: '10%',
    marginLeft: '28%',
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
	reload: {
		borderRadius: '10px',
		marginBottom: '20px',
		float: 'right',
	},

  table: {
    marginLeft: '80px',
    width: '650px'
  },

  title: {
    padding: 15,
    textAlign: 'center'
  },

  label: {
    width: '110px',
    fontWeight: 'bold'
  },

  statusLabel: {
    width: '20%',
    fontStyle: 'italic'
  }
}));
export default function MinionDetails() {

  const classes = useStyles();
  const { details } = useContext(DetailsContext);

  return (
    <div className={classes.paper}>
      <div className={classes.reload}>
				<button style={{width: '35px', height: '35px', padding: '2px'}}>
					<img alt="icono" src="https://e7.pngegg.com/pngimages/365/764/png-clipart-computer-icons-refresh-free-one-button-reload-text-logo-thumbnail.png" style={{width: '28px', height: '28px'}}/>
				</button>
			</div>

      <table className={classes.table}>
        <tbody>
          <tr>
            <td colSpan="3" className={classes.title}>
              <h2>{details.name}</h2>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <h3>DETAILS</h3>
            </td>
          </tr>
          <tr>
            <td className={classes.label}>
              <p>Created: </p>
            </td>
            <td colSpan="2">
              {details.created}
            </td>
          </tr>
          <tr>
            <td className={classes.label}>
              <p>Updated: </p>
            </td>
            <td colSpan="2">
              {details.updated}
            </td>
          </tr>
          <tr>
            <td colSpan="3" className={classes.label}>
              <p>Status: </p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className={classes.statusLabel}>
              <p>Connected: </p>
            </td>
            <td>
              {details.status.connected ? "True" : "False"}
            </td>
          </tr>
          <tr>
            <td></td>
            <td className={classes.statusLabel}>
              <p>Last Connected: </p>
            </td>
            <td>
              {details.status.last_connected}
            </td>
          </tr>
          <tr>
            <td></td>
            <td className={classes.statusLabel}>
              <p>Disk Capacity: </p>
            </td>
            <td>
              {details.status.disk['/'].capacity}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );


}