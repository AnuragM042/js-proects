const searchBar = document.getElementById('searchBar');
const pokedex = document.getElementById('pokedex');
let allPokemon = []; // Store all the Pokemon data here



const getPokemon = () => {
    const promises = []

    for (let i = 1; i < 50; i++){
        const pokedexapi =  `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(pokedexapi)
        .then((res) => res.json()))
        console.log(pokedexapi)
    }

    Promise.all(promises).then(result => {
        const pokemon = result.map((data) => ({
            id : data.id,
            name: data.name,
            image : data.sprites['front_default'],
        }));
        displayPokemon(pokemon);
    })
};

const displayPokemon = (pokemon) => {
    const pokemonString = pokemon.map(singlePokemon =>`
    <li>
       <img src ="${singlePokemon.image}"/>
       <h3>${singlePokemon.id}. ${singlePokemon.name}</h3>
       </li>
    `).join("");
    pokedex.innerHTML = pokemonString;
};



getPokemon();