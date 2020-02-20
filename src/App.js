import React, {useContext, useState} from 'react';
import './App.css';
import { Box, Button, Grommet, TextInput } from 'grommet';
import { Search } from "grommet-icons";
import { MDBIcon } from 'mdbreact';

const context = React.createContext()

const customTheme = {
  global: {
    font: {
      family: "Roboto"
    }
  },
  button: {
    border: {
      radius: "4px"
    },
    padding: {
      vertical: "4px",
      horizontal: "4px"
    },
  }
};

function App() {
  const [state, setState] = useState({
    searchTerm:''
  })
  return <context.Provider value={{
    ...state, 
    set: v=> setState(current=> {
      return{...current, ...v}})
  }}>
    <Grommet theme={customTheme}>
      <Header />
    </Grommet>
  </context.Provider>
}

function Header(){
  const ctx = useContext(context)
  const {searchTerm} = ctx
  return <Box tag='header' direction='row' align='center' justify='between' pad={{ left: 'medium', right: 'medium', vertical: 'medium' }}>
    <Button 
      className="cocktail"
      plain={false} 
      onClick={() => {}} 
    />
    <Button 
      className="ingredient"
      plain={false} 
      style={{ marginLeft: '8px', marginRight: '12px' }}
      onClick={() => {}} 
    >
      <MDBIcon icon="cocktail" />
    </Button>
    <TextInput
      className="input"
      placeholder="Search Cocktails"
      value={searchTerm}
      onChange={e=> ctx.set({searchTerm: e.target.value})}
    />
    <Button 
      className="search"
      plain={false} 
      icon={<Search />} 
      primary
      color='#FFCA58'
      style={{ marginLeft: '8px' }}
      onClick={() => {}} 
    />
  </Box>
  
}



export default App;
