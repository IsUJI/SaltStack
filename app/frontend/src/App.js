import React, { Component } from 'react';
import './App.css';
import IdProvider from './Context';
import MinionList from './Minion/MinionList'


class App extends Component {
  render() {
    return (
      <IdProvider>
        <div>
          <MinionList />
        </div>
      </IdProvider>
    );
  }
}

export default App;
