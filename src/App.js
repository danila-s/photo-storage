import './App.css';
import {connect} from 'react-redux'
import React from 'react';
import AutorizePage from './AutorizePage/AutorizePage';
import AppPage from './AppPage/AppPage'

class App extends React.Component{


  
  render (){
    
    const {isAutorize} = this.props
    return (
      <div className="App">
        {isAutorize? <AppPage /> : <AutorizePage />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  
});

const mapStateToProps = (state) => {
  return {
    isAutorize : state.isAutorize
  };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(App);

