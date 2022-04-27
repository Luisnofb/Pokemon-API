
let side = true;


const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemomPromises = () => Array(493).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json())
);

const insertPokeonsInto = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons;
}

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types, sprites}) => {
    const elementypes = types.map(typeInfo => typeInfo.type.name);

    accumulator +=
        `<li class="card ${elementypes[0]}">
            <img class="card-image" alt="${name}" src="${sprites.front_default}"/>
            <h2 class="card-title">${id} - ${name}</h2>
            <p class="card-subtitle">${elementypes.join(' | ')}</p>
        </li>`
    return accumulator;
}, '');


const pokemonPromises = generatePokemomPromises();


Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokeonsInto)
