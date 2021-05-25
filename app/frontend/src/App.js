import React, { Component } from 'react';
import './App.css';
import DetailsProvider from './DetailsContext';
import MinionList from './Minion/MinionList'

class App extends Component {
  render() {
    return (
      <DetailsProvider>
        <div className="body" style={{marginLeft: '25%'}}>
          <MinionList />
        </div>
      </DetailsProvider>
    );
  }
}

export default App;
