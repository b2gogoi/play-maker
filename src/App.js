import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TeamList from './feature/teamlist/TeamList';
import Quarter from './feature/quarter/Quarter';
import './App.css';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
  const [tab, setTab] = React.useState(0);
  const [team, setTeam] = useState([]);
  const [quarter, setQuarter] = useState({});
  

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
              <Tab label="Compose Team" {...a11yProps(0)} />
              <Tab label="First Quarter" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tab} index={0}>
            <TeamList team={team} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Quarter team={team} quarter={quarter} />
          </TabPanel>
      </div>
    </div>
  );
}

export default App;
