async function Start() {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail`
    const r = await fetch(url)
    const startDrink = await r.json()
    return (startDrink['drinks'])
}

export default Start;