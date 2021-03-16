import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Room = props => (
    <tr>
        <td>{props.room.username}</td>
        <td>{props.room.description}</td>
        <td>{props.room.date.substring(0, 10)}</td>
        <td>
            <a target="_blank" href="localhost:3001">enter</a> | <Link to={"/edit/" + props.room._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRoom(props.room._id) }}>delete</a>
        </td>
    </tr>
)

export default class RoomsList extends Component {
    constructor(props) {
        super(props);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.state = { rooms: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rooms/')
            .then(response => {
                this.setState({ rooms: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteRoom(id) {
        axios.delete('http://localhost:5000/rooms/' + id)
            .then(res => console.log(res.data)); 
            this.setState({
                rooms: this.state.rooms.filter(el => el._id !== id)
            })
    }

    roomList() {
        return this.state.rooms.map(currrentroom => {
            return <Room room={currrentroom} deleteRoom={this.deleteRoom} key={currrentroom._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Existing Rooms</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.roomList()}
                    </tbody>
                </table>
            </div> 
        );
    }
}