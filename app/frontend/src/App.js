import React, { Component } from 'react';
import './App.css';
import DetailsProvider from './DetailsContext';
import Body from './Layout/Body';
import Header from './Layout/Header';

class App extends Component {
  render() {
    return (
      <DetailsProvider>
        <div style={{marginLeft: '22%'}}>
          <Header />
          <Body />
        </div>
      </DetailsProvider>
    );
  }
}

export default App;
