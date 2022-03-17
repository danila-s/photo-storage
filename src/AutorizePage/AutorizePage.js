import React from "react";
import './AutorizePage.css'
import { loginToServer } from '../api'
import {connect} from 'react-redux'
import {changeAutorize} from '../redux/actions'


class AutorizePage extends React.Component {

    state = {
        string: ''
    }

    loginToServer = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const pass = formData.get('password');
        const log = formData.get('login');
        loginToServer(log, pass)
            .then(data => {
                if(typeof data !== "string"){
                    this.props.changeAutorize(data)
                }
                else {
                    this.setState({string : data})
                }
                
    })}

    render() {
        const { string } = this.state;
        return (
            <div className="form-container">
                <p>Войдите в систему.</p>
                <form onSubmit={this.loginToServer}>
                    <label className="item-label">
                        <p>Логин:</p>
                        <input type="text" name="login" />
                    </label>
                    <label className="item-label">
                        <p>Пароль:</p>
                        <input type="text" name="password" />
                    </label>
                    <input type="submit" value="Отправить" /></form>
                <p>{string}</p>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeAutorize: (data) => dispatch(changeAutorize(data))
});

const mapStateToProps = (state) => {
  return {
    isAutorize : state.isAutorize
  };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(AutorizePage);