// const response = fetch('https://pokeapi.co/api/v2/pokemon')
// console.log(response)
let page = 1

const fetchPokemons = async (page = 1) => {
    const limit= 8
    const offset = (page -1)*limit
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    // console.log(data)
    // const dataResults = data.results
    // console.log(dataResults)

    const dataResults = data.results.map((pokemon) => {
        //https://pokeapi.co/api/v2/pokemon/1/
        // const id = pokemon.url.split('/')[6]
        const id = pokemon.url.split("/").at(6)
        // console.log(id)
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`

        // console.log(image)

        return {
            ...pokemon, //actualmente tiene name, url
            id,
            image
        }
    })

    // console.log(dataResults)
    return dataResults
}

const renderPokemons = (pokemons) => {
    // document.body.innerHTML = "<h1>Hola DOM</h1>"
    const pokemonList = document.getElementById('pokemonsList')

    // pokemonList.innerHTML='Hola Div'

    let elements = ''

    pokemons.forEach((pokemon) => {

        elements += `
        <article class='pokemons-item' >
            <img src="${pokemon.image}" with='80' height='80'/>
            <h2>#${pokemon.id} ${pokemon.name}</h2>
        </article>
        `
        
    })

    pokemonList.innerHTML = elements
}


const documentReady = async () =>{
    const nextPage = document.getElementById('nextPage')
    const prevPage = document.getElementById('prevPage')
    const currentPage = document.getElementById('currentPage')

    nextPage.addEventListener('click', async () =>{
        const pokemons = await fetchPokemons(++page)
        if(pokemons.length>0){
            renderPokemons(pokemons)
            currentPage.innerHTML = page
        }else{
            --page
        }
    })

    prevPage.addEventListener('click' , async () =>{
        --page
        if(page === 0){
            page=1
        }else{
        const pokemons = await fetchPokemons(page)
        renderPokemons(pokemons)
        currentPage.innerHTML = page
        }
    })

    const pokemons = await fetchPokemons()
    // console.log(pokemons)

    renderPokemons(pokemons)
    

}

//DOMContentLoaded escucha cuando se terminó de cargar toda nuestra página html 

document.addEventListener('DOMContentLoaded', documentReady)

