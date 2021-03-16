import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.onEnterUsername = this.onEnterUsername.bind(this);
        this.onEnterPassword = this.onEnterPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
    }

    onEnterUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onEnterPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errorMessage: ''
        });
        const loginUser = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(loginUser);

        axios.post('http://localhost:5000/users/login', loginUser)
            .then(res => {
                console.log(res.data);
                window.location = '/roomlist';
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.setState({ errorMessage: "the username or password combination failed" })
                }
                else {
                    this.setState({ errorMessage: err.message });
                }
            });

        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <div>
                <h3>User Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onEnterUsername}
                        />
                        <label>Password: </label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onEnterPassword}
                        />                    
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
                {this.state.errorMessage.length > 0 &&
                    <h2>
                        Sorry, {this.state.errorMessage}.
                    </h2>
                }
            </div>
        );
    }
}