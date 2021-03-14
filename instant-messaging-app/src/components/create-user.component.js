import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props); 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
        
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errorMessage: ''
        });
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(newUser);

        axios.post('http://localhost:5000/users/add', newUser)
        .then(res => console.log(res.data))
        .catch(err =>  {
            if(err.response.status === 409){
                this.setState({errorMessage: "User already exists"})
            }
            else{
                this.setState({errorMessage: err.message});
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
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <label>Password: </label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />                    
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
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