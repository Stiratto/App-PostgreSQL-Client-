import {useEffect, useState} from "react"
import {Card, CardContent, Typography, Button} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from "react-router-dom";
import {format} from "date-fns"

const TaskList = () => {
  const [tasks, setTasks] = useState<{ id: number, title: string, description: string, task_created_at:string  }[]>([]);

  const navigateTo = useNavigate()
  const dateFormat = "EEEE, h:mm a";

  const loadTasks = async () => {
    const result = await fetch('http://localhost:4000/tasks')
    const data = await result.json()
    setTasks(data)
  }
  const handleDelete = async (id: number) => {
    try{
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'}
      })

    
      setTasks( tasks.filter((task) => task.id !== id))
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
      loadTasks()
  }, [])

    return (
      <>
        <h1>Task List</h1>
        {
          tasks.map((task) => (
            <Card style={{
              marginBottom: ".7rem",
              background: "#1e272e",
            }}
            key={task.id}>
              <CardContent style={{
                display: 'flex',
                justifyContent: 'space-between',
              }} > 
              
                <div style={{
                   color: "white"
                }}>
                  <Typography fontSize={'.6rem'} color={'gray'}>Task ID:{task.id}</Typography>
                  <Typography style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>{task.title}</Typography>
                  <Typography>{task.description}</Typography>
                  <Typography fontSize={'.8rem'}> {format(new Date(task.task_created_at), dateFormat)}</Typography>
                </div>
               <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.6rem'
               }}>
                  <Button variant="contained" color="warning" onClick={() => handleDelete(task.id)} startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <Button variant="contained" color="inherit" onClick={() => navigateTo(`/tasks/${task.id}/edit `)} startIcon={<EditIcon/>}>
                    Edit
                  </Button>
               </div>
              </CardContent>
            </Card>
          ))
        }
      </>
    );
  };
  
  export default TaskList;
  