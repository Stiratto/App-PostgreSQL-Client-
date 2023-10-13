import { Box, AppBar, Container, Toolbar, Typography, Button } from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {

  const navigateTo = useNavigate()
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{flexGrow: 1}}>
              <Link to="/" style={{
                textDecoration: 'none',
                color: '#eee'
              }}>PERN Stack</Link>
            </Typography>

            <Button variant="contained" color="primary" onClick={() => navigateTo('/tasks/new')} startIcon={<AddIcon/>}>
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
)};

export default Navbar;
