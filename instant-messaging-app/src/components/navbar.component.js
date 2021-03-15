import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Instant Messaging App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/roomlist" className="nav-link">Rooms</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create New Chat Room</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/sign-in" className="nav-link">Sign In</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}