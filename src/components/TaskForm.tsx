import {Grid, Card, Typography, CardContent, TextField, Button, CircularProgress} from '@mui/material'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const TaskForm = () => {
    const [task, setTask] = useState({
      title: "",
      description: "",
      task_created_at: new Date(),
    })
    const [editing, setEditing] = useState(false)

    const [loading, setLoading] = useState(false)

    const navigateTo = useNavigate()
    const params = useParams()

    const handleSubmit = async (ev: any) => {
      ev.preventDefault();
      setLoading(true)

      if (editing){
        await fetch(`http://localhost:4000/tasks/${params.id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        })
      }else{
        await fetch('http://localhost:4000/tasks', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
      }


      setLoading(false)
      navigateTo('/')
    }

    const handleChanges = (ev: React.ChangeEvent<HTMLInputElement>) => {
      setTask({...task, [ev.target.name]: ev.target.value})
    }

    const loadTask = async (id: any) => {
      const result = await fetch(`http://localhost:4000/tasks/${id}`)
      const data = await result.json()
      setTask({title: data.title, description: data.description, task_created_at: data.task_created_at})
      setEditing(true)
    } 

    useEffect(() => {
      if(params.id){
        loadTask(params.id)
      }
    }, [params.id])

    return (
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={10}>
            <Card 
              sx={{mt: 5}}
              style={{
                backgroundColor: '#1e272e',
                padding: '1rem',
              }}
            >
                <Typography color={'white'} >
                    {editing ? 'Edit Task' : 'Create Task'}
                </Typography>
                <CardContent style={{
                  width: '600px'
                }}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        color="secondary"
                        
                        fullWidth
                        variant='filled'
                        label='Write your title'
                        sx={{
                          display: 'block',
                          margin: '.5rem 0',
                        }}
                        name='title'
                        value={task.title}
                        InputLabelProps={{style: {color: 'white'}}}
                        inputProps={{style: {color: "white"}}}
                        onChange={handleChanges}
                        />

                      <TextField
                       fullWidth
                        variant='filled'
                        label='Write your description'
                        multiline
                        rows='4'
                        value={task.description}
                        sx={{
                          display: 'block',
                          margin: '.5rem 0'
                        }}
                        InputLabelProps={{style: {color: 'white'}}}
                        inputProps={{style: {color: "white"}}}
                        name='description'
                        onChange={handleChanges}
                      />
                        

                        <Button variant='contained' color='primary' type='submit'  disabled={!task.title || !task.description} style={{
                          color: 'white'
                        }}>
                          {loading ? <CircularProgress color='inherit' size={24}/> : "Save"}
                        </Button>
                 
                    </form>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    )
  };
  
  export default TaskForm;
  