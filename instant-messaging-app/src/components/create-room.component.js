import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateRoom extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAddParticipant = this.onAddParticipant.bind(this);
        this.onChangeParticipantUsername = this.onChangeParticipantUsername.bind(this);

        this.state = {
            username: '',
            description: '',
            date: new Date(),
            users: [],
            participantUsername: '',
            availableParticipants: [],
            selectedParticipants: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        availableParticipants: response.data.map(user => user.username),
                        username: response.data[0].username,
                        participantUsername: response.data[0].username
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeParticipantUsername(e) {
        this.setState({
            participantUsername: e.target.value
        });
    }
    

    onAddParticipant(e) {
        e.preventDefault();

        this.setState({
            availableParticipants: this.state.availableParticipants.filter((_, i) => i !== e),
            selectedParticipants: [...this.selectedParticipants, e]
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const room = {
            username: this.state.username,
            description: this.state.description,
            date: this.state.date,
            selectedParticipants: this.state.selectedParticipants
        }

        console.log(room)

        axios.post('http://localhost:5000/rooms/add', room)
            .then(res => console.log(res.data));

        window.location = '/roomlist';
    }


    render() {
        return (
            <div>
                <h3>Create New Chat Room</h3>
                <form onAddParticipant={this.onAddParticipant}>
                    <div className="form-group">
                        <label>Participant to Add: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.participantUsername}
                            onChange={this.onChangeParticipantUsername}>
                            {
                                this.state.availableParticipants.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Added Participants: </label>
                        <h1 ref="userInput"
                            className="form-control"
                            value = {this.state.onChangeParticipantUsername}
                            onChange={this.onChangeParticipantUsername}>
                            {
                                this.state.selectedParticipants.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </h1>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add participant" className="btn btn-primary" />
                    </div>
                </form>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Host: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create New Room" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}