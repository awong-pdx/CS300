import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import RoomsList from "./components/rooms-list.component";
import EditExercise from "./components/edit-exercise.component";
import EditRoom from "./components/edit-room.component";
import CreateExercise from "./components/create-exercise.component";
import CreateRoom from "./components/create-room.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route exact path="/" component={Login} />
        <Route path="/exerciselist" exact component={ExercisesList} />
        <Route path="/roomlist" exact component={RoomsList} />
        {/*<Route path="/edit/:id" component={EditExercise} /> */}
        <Route path="/edit/:id" component={EditRoom} />
        {/*<Route path="/create" component={CreateExercise} />*/}
        <Route path="/create" component={CreateRoom} />
        <Route path="/user" component={CreateUser} />
        <Route path="/sign-in" component={Login} />
      </div>
    </Router>
  );
}

export default App;
