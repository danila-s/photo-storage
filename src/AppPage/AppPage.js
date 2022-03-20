import React from "react";
import { connect } from 'react-redux'
import { changeAutorize } from '../redux/actions'
import './AppPage.css'


class AppPage extends React.Component {

    state = {
        id: 0,
        isProblem: false
    }



    exitFromAccount = () => {
        localStorage.clear();
        this.props.changeAutorize(false);
    }

    upload = e => {
        e.preventDefault()
        let { id } = this.state;
        console.log(id)

        const formData = new FormData(e.target)
        const description = formData.get('description')
        const img = formData.get('upload-image')

        if (img.size <= 5000000) {
            fetch(`http://localhost:8000/gallery/${id}`, {
                method: 'POST',
                body: formData,
                description
            })
                .then(res => this.setState({ id: ++id, isProblem: false }))
                .catch(err => console.log(err))
        }
        else {
            this.setState({ isProblem: true })
        }
    }

    noDigits(event) {
        if ("1234567890".indexOf(event.key) != -1)
            event.preventDefault();
    }


    render() {
        return (
            <div className="app-page">
                <button onClick={this.exitFromAccount}>Выйти</button>
                <form onSubmit={this.upload}>
                    <div>
                        <label>Загрузка картинки</label>
                        <input
                            type="file"
                            name="upload-image"
                            required={true}
                            accept="image/png, image/jpeg"
                        />
                        <label>Описание:</label>
                        <textarea
                            className="description"
                            type='text'
                            name="description"
                            maxLength="54"
                            onKeyPress={this.noDigits}
                        />
                    </div>
                    {this.state.isProblem && <p className="alert">Размер картинки не должен превышать 5мб.</p>}
                    <div>
                        <input type="submit" value="Upload" />
                    </div>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    changeAutorize: (data) => dispatch(changeAutorize(data))
});

const mapStateToProps = (state) => {
    return {

    };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(AppPage);