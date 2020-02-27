import React, {useContext, useState} from 'react';
import './App.css';
import { Box, Button, Grommet, TextInput, ThemeContext } from 'grommet';
import { Image, Bar, Cafeteria, Filter, Search, Update } from "grommet-icons";
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
  const {loading, searchTerm} = ctx
  return <Box> 
    <Box tag='header' direction='row' align='center' justify='between' pad='medium'>
      <Button 
        className="cocktail"
        icon={<Bar />}
        plain={false} 
        onClick={() => {}} 
      >
      </Button>

      <Button 
        className="ingredient"
        plain={false} 
        icon={<Cafeteria />}
        style={{ marginLeft: '8px', marginRight: '12px' }}
        onClick={()=> {}}
      />

      <TextInput
        className="input"
        placeholder="Search Cocktails"
        value={searchTerm}
        disabled={loading}
        onChange={e=> ctx.set({searchTerm: e.target.value})}
        onKeyPress={e=>{
          if(e.key==='Enter' && searchTerm) search(ctx)
        }}
      />
      <Button 
        className="search"
        plain={false} 
        icon={<Search />} 
        primary
        color='#FFCA58'
        style={{ marginLeft: '8px' }}
        onClick={() => search(ctx)} 
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
  const {error, drinks} = ctx
  if (drinks) {
    console.log(drinks)
    return <Box background="#E8E8E8" overflow="scroll" pad="medium"> 
        {drinks.map((drink,i)=> <Drink key={i} {...drink} />)}
    </Box>
  } return <Box background="#E8E8E8" height="84.7vh" pad="medium"></Box>
}

async function search({searchTerm, set}){
  try {
    const term = searchTerm
    set({error:'', loading:true})
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`
    console.log(url)
    const r = await fetch(url)
    console.log(r)
    const drinkData = await r.json()
    if(!drinkData['drinks'][0]){
      return set({error:'No drink matching that query'})
    }
    set({drinks:drinkData['drinks'], loading:false, searchTerm:''})
  } catch(e) {
    set({error: e.message})
  }
}

function Drink(props){
  console.log("StrDrinkThumb " + props.strDrinkThumb)
  return (
    <Box background="white" direction="row" height="171px" margin="small" pad="medium">
      {/* <Box height="medium" width="large">
        <Image
          src="http://hdwpro.com/wp-content/uploads/2017/01/3D-Cool-Image.jpg"
          fit="cover"
        />
      </Box> */}
      <img 
        alt="drink"
        src={props.strDrinkThumb}
        style={{ height: '142px', width: '142px' }}
      />
      <Box direction="column" margin="small">
        {props.strDrink}
      </Box>
    </Box>
  )
}

export default App;
