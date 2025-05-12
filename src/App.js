import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import StockPage from "./pages/StockPage";
import CorrelationPage from "./pages/CorrelationPage";
import {AppBar,Toolbar,Typography,Button,Container} from "@mui/material";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow:1}}>
            Stock Analytics
          </Typography>
          <Button color="inherit" component={Link} to="/">Stock</Button>
          <Button color="inherit" component={Link} to="/correlation">Correlation</Button>
        </Toolbar>
        <Container sx={{mt:4}}>
          <Routes>
            <Route path="/" element={<StockPage/>}/>
            <Route path="/correlation" element={<CorrelationPage/>}/>
          </Routes>
        </Container>
      </AppBar>
    </Router>
  );
}

export default App;
