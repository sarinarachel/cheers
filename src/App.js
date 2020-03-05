import React, {useContext, useState} from 'react';
import './App.css';
import { Box, Button, Grommet, Heading, Paragraph, ResponsiveContext, Text, TextInput, ThemeContext } from 'grommet';
import { Bar, Cafeteria, Filter, Search, Update } from "grommet-icons";
// import { MDBIcon } from 'mdbreact';

const context = React.createContext()

const customTheme = {
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
    searchTerm:'', mode:'cocktail'
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
  const {loading, searchTerm, mode} = ctx
  const screenSize = React.useContext(ResponsiveContext);
  return <Box>
    <Box tag='header' direction='row' align='center' justify='between' pad='medium'>
      <Button 
        className="cocktail"
        icon={<Bar />}
        plain={false} 
        color={mode==='cocktail' ? "#6FFFB0" : "brand"}
        onClick={() => ctx.set({mode:'cocktail'})} 
      >
      </Button>
      <Button 
        className="ingredient"
        plain={false} 
        icon={<Cafeteria />}
        style={{ marginLeft: '4px', marginRight: '10px' }}
        color={mode==='ingredient' ? "#6FFFB0" : "brand"}
        onClick={()=> ctx.set({mode:'ingredient'})}
      />

      <TextInput
        className="input"
        placeholder={mode==="cocktail" ? "Search Cocktails" : "Search by Ingredient"}
        value={searchTerm}
        disabled={loading}
        style={{fontSize: screenSize==="small" ? '16px' : '20px'}}
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
        style={{ marginLeft: '4px' }}
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
      <Box pad={{horizontal:'medium', vertical:'small'}} direction='row' align='start' background='#F2F2F2' justify='between'>
        <Button
          className="random"
          primary
          icon={<Update size='small' color="brand"/>}
          label="Random"
          style={{ marginTop: '0px' }}
          color="#E6E1F0"
          onClick={() => random(ctx)} 
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
    return <Box background="#E8E8E8" overflow="scroll" pad="medium" style={{minHeight :'84.7vh'}}> 
        {drinks.map((drink,i)=> <Drink key={i} {...drink} />)}
    </Box>
  } return <Box background="#E8E8E8" height="84.7vh" pad="medium">
      {error && <div className="error">{error}</div>}
    </Box>
}

async function search({searchTerm, set, mode}){
  try {
    const term = searchTerm
    console.log(mode)
    set({error:'', loading:true, drinks:[]})
    let url = ``
    if (mode==='cocktail'){
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`
    }
    const r = await fetch(url)
    const drinkData = await r.json()
    console.log(drinkData['drinks'])
    if(!drinkData['drinks'][0]){
      return set({error:'No drink matching that query'})
    }
    set({drinks:drinkData['drinks'], loading:false, searchTerm:''})
  } catch(e) {
    set({error: 'No drink matching that query'})
  } set ({loading:false})
}

async function random({set}){
  try {
    set({error:'', loading:true})
    const url=`https://www.thecocktaildb.com/api/json/v1/1/random.php`
    const r = await fetch(url)
    const drinkData = await r.json()
    set({drinks:drinkData['drinks'], loading:false, searchTerm:''})
  } catch(e) {
    set({error: 'No drink matching that query'})
  } set ({loading:false})
}

function Drink(props){
  return (
    <Box 
      round="4px" 
      elevation="medium" 
      background="white" 
      direction="row" 
      height="171px" 
      margin="small" 
      pad="medium"
      onClick={() => {}}>
      <img 
        alt="drink"
        src={props.strDrinkThumb}
        style={{ objectFit: "cover", height: '142px', width: '142px', borderRadius: '4px' }}
      />
      <Box overflow="hidden" direction="column" margin={{ "left": "medium" }}>
        <Heading size="small" margin={{"top": "none", "bottom": "small"}}> {props.strDrink} </Heading>
        <Box wrap={true} direction="row" margin={{"bottom":"small"}}>
          {props.strIngredient1 && <Box margin={{"vertical":"xsmall", "right":"xsmall"}} background="#3D138D" pad={{"vertical":"xsmall", "horizontal":"medium"}} round="100px">
            <Text size="xsmall" weight="bold"> {props.strIngredient1} </Text>
          </Box>}
          {props.strIngredient2 && <Box margin={{"vertical":"xsmall"}} background="#3D138D" pad={{"vertical":"xsmall", "horizontal":"medium"}} round="100px">
            <Text size="xsmall" weight="bold"> {props.strIngredient2} </Text>
          </Box>}
        </Box>
        <Box >
        <Paragraph size="small">
          {props.strInstructions}
        </Paragraph>
        </Box>
      </Box>
    </Box>
  )
}

export default App;
