// import React, { createContext, useEffect, useState, useContext } from 'react';
import React, { useContext } from 'react';
import { DetailsContext } from '../DetailsContext'

// const MinionContext = createContext({
// 	minion: [], getMinion: () => {}
// })

export default function MinionDetail () {

	const {details} = useContext(DetailsContext);
	// const [minion, setMinion] = useState([])
	// const getMinion = async () => {
  //   axios.get(`http://localhost:8000/minions/${id}`)
  //   .then(res => {
  //     setMinion(res.data);
  //   })
  // }

	// useEffect( () => {
	// 	getMinion()
	// }, [])

  // const [open, setOpen] = React.useState(false);


	// const handleOpen = () => {
  //   setOpen(true)
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const body = (
  //   <div>
  //     <h2 id="simple-modal-title">{minion.name}</h2>
  //     <p id="simple-modal-description">
  //       Display de los detalles.
  //       {}
  //     </p>
  //     <MinionDetail />
  //   </div>
  // );

  return (
      <div>
        <h2 id="simple-modal-title">{details.name}</h2>
        <p id="simple-modal-description">
          Display de los detalles.
          {details.created}
        </p>
      </div>
	);

}