import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import TeamList from './feature/teamlist/TeamList';
import Quarter from './feature/quarter/Quarter';
import * as v from './util/utils';
import './App.css';

const emptyQuarter = (() => {
  return v.positions.reduce((acc, p) => {
    return {...acc, [p.code]: ''};
  }, {});
})();

// For testing
const dummyQuarter = {
  C: 1,
  SF: 2,
  PF: 6,
  PG: 5,
  SG: 4
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

const teamDummy = [
  { id: 1, firstName: 'Bhaskar', lastName: 'Gogoi', height: 162, positions: ['C'] },
  { id: 2, firstName: 'Jean', lastName: 'Marc', height: 222, positions: ['SF', 'PG'] },
  { id: 3, firstName: 'Lebron', lastName: 'James', height: 179, positions: ['SG'] },
  { id: 4, firstName: 'Kobe', lastName: 'Bryant', height: 240, positions: ['SG'] },
  { id: 5, firstName: 'Michael', lastName: 'Jordan', height: 212, positions: ['PF', 'C', 'SF', 'SG', 'PG'] },
  { id: 6, firstName: 'Magic', lastName: 'Johnson', height: 134, positions: ['PF', 'SF'] },
  { id: 7, firstName: 'Shaq', lastName: 'Oneal', height: 299, positions: ['PF', 'C'] },
]

function App() {
  const [tab, setTab] = useState(0);
  const [team, setTeam] = useState(teamDummy);

  const [quarter, setQuarter] = useState(emptyQuarter);
  // const [quarter, setQuarter] = useState(dummyQuarter);

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
            <Quarter team={team} quarter={quarter} update={setQuarter} />
          </TabPanel>
      </div>
    </div>
  );
}

export default App;
