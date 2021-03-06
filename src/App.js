import './App.css';
import { connect } from 'react-redux'
import React from 'react';
import AutorizePage from './AutorizePage/AutorizePage';
import AppPage from './AppPage/AppPage'
import { loginWithToken } from './api'
import { changeAutorize } from './redux/actions';

class App extends React.Component {

  componentDidMount() {
    const isToken = localStorage.getItem('token')
    if (isToken) {
      loginWithToken(isToken)
        .then(data => {
          if (typeof data !== 'string') {
            this.props.changeAutorize(data.result)
          } else {
            console.log(data)
          }
        })

    }

  }

  render() {

    const { isAutorize , isLoading } = this.props
    return (
      <div className="App">
        {isLoading ? <div className='loading'>
          <p className='loading-text'>Loading ...</p>
        </div> : <></>}
        {isAutorize ? <AppPage /> : <AutorizePage />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeAutorize: (data) => dispatch(changeAutorize(data))
});

const mapStateToProps = (state) => {
  return {
    isAutorize: state.isAutorize,
    isLoading : state.isLoading
  };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(App);

