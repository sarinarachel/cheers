import React, {useContext, useState} from 'react';
import './App.css';
import { Box, Button, Grommet, TextInput, ThemeContext } from 'grommet';
import { Filter, Search, Update } from "grommet-icons";
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
      horizontal: "8px"
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
      <Body />
    </Grommet>
  </context.Provider>
}

function Header(){
  const ctx = useContext(context)
  const {searchTerm} = ctx
  return <Box> 
    <Box tag='header' direction='row' align='center' justify='between' pad='medium'>
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
    <ThemeContext.Extend value={{ 
      global: {
        colors: {
          text: "brand"
        }
      },
      text: { medium: { size: "16px"}}
    }}>
      <Box pad='small' direction='row' align='start' background='#F2F2F2' justify='between'>
        <Button
          className="random"
          primary
          icon={<Update size='small' color="brand"/>}
          label="Random"
          style={{ marginTop: '0px' }}
          color="#E6E1F0"
          onClick={() => {}} 
        />
        <Button
          className="filter"
          primary
          icon={<Filter size='small' color="brand"/>}
          label="Filter"
          style={{ marginTop: '0px' }}
          color="#E6E1F0"
          onClick={() => {}} 
        />
      </Box>
    </ThemeContext.Extend>
  </Box>
}


function Body(){
  const ctx = useContext(context)
  return <Box background="#E8E8E8" height="84.7vh" pad="medium"> 
    Cocktails
  </Box>
}

export default App;
