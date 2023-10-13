import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container, Menu } from "@mui/material";
import React from "react"

function App() {

  return (
    <div>
        <Navbar/>
        <Container>
          <Routes>
            <Route path="/" element={<TaskList/>}/>
            <Route path="/tasks/new" element={<TaskForm/>}/>
            <Route path="/tasks/:id/edit" element={<TaskForm/>}/>
          </Routes>

        </Container>
     
    </div>
 
  );
}

export default App;
