import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TeamList from './feature/teamlist/TeamList';
import Quarter from './feature/quarter/Quarter';
import './App.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [tab, setTab] = useState(0);
  const [team, setTeam] = useState([]);
  const [quarter, setQuarter] = useState({});

  const updateTeam = (players) => {
    console.log('updateTeam : ', players.length);
    setTeam(players);
  }
  

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <div className="App">
        <header className="App-header">
          <h1>Basketball Team Manager</h1>
        </header>
        <div className="App-body">
          <AppBar position="static">
            <Tabs value={tab} onChange={handleChange}>
              <Tab label="Compose Team" />
              <Tab label="First Quarter" />
            </Tabs>
          </AppBar>
          <TabPanel value={tab} index={0}>
            <TeamList team={team} update={updateTeam} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Quarter team={team} quarter={quarter} />
          </TabPanel>
      </div>
    </div>
  );
}

export default App;
