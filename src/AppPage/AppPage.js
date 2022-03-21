import React from "react";
import { connect } from 'react-redux'
import { changeAutorize , changeLoading } from '../redux/actions'
import './AppPage.css'
import { getActualImg } from '../api'


class AppPage extends React.Component {

    state = {
        isProblem: false,
        description: '',
        link: '',
        file: null,
        inputDescription: ''
    }



    componentDidMount() {
        getActualImg()
            .then(data => {
                this.setState({ description: data.description, link: data.link })
            })
    }



    exitFromAccount = () => {
        localStorage.clear();
        this.props.changeAutorize(false);
    }

    upload = e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const description = formData.get('description')
        const img = formData.get('upload-image')

        if (img.size <= 5000000) {
            this.props.changeLoading()
            fetch(`http://localhost:8000/gallery`, {
                method: 'POST',
                body: formData,
                description
            })
                .then(res => {
                    this.setState({ isProblem: false })
                    getActualImg()
                        .then(data => {
                            this.setState({ description: data.description, link: data.link, file: null, inputDescription: '' })
                            this.props.changeLoading();
                        })
                })
                .catch(err => {
                    console.log(err)
                    this.props.changeLoading();
                })
        }
        else {
            this.setState({ isProblem: true })
        }
    }

    changeArea = (e) => {
        this.setState({ inputDescription: e.target.value })
    }

    changeFile = (e) => {
        this.setState({ file: e.target.value })
    }

    noDigits(event) {
        if ("1234567890".indexOf(event.key) != -1)
            event.preventDefault();
    }


    render() {
        const { description, link, inputDescription, file } = this.state;
        return (
            <div className="app-page">
                <button onClick={this.exitFromAccount} className='log-out-button'>LogOut</button>
                <form onSubmit={this.upload}>
                    <div className="upload-form">
                        <label className="description-text">Описание:</label>
                        <textarea
                            onChange={this.changeArea}
                            value={inputDescription}
                            className="description"
                            type='text'
                            name="description"
                            maxLength="80"
                            onKeyPress={this.noDigits}
                        /><label className="file-text">Загрузка картинки</label>
                        <input
                            className="file-input"
                            type="file"
                            name="upload-image"
                            required={true}
                            accept="image/png, image/jpeg"
                            value={file}
                        />
                    </div>
                    {this.state.isProblem && <p className="alert">Размер картинки не должен превышать 5мб.</p>}
                    <div>
                        <input type="submit" value="Upload" />
                    </div>
                </form>
                <div>
                    <p>Последняя добавленная картинка :</p>
                    {link && <img src={link} />}
                    {description && <div><p>Описание :</p><p>{description}</p></div>}
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    changeAutorize: (data) => dispatch(changeAutorize(data)),
    changeLoading: () => dispatch(changeLoading())
});

const mapStateToProps = (state) => {
    return {

    };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(AppPage);