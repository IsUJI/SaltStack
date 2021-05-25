import React from 'react';
import MinionList from '../Minion/MinionList'

const styles = {
	Body: { with: '80%' }
}

export default function Body () {
	return (
		<div style={styles.Body}>
			<MinionList />
		</div>
	)
}