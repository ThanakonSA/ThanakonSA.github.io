document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get('name');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = await response.json();

    const pokemonDetails = document.getElementById('pokemon-details');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    pokemonDetails.appendChild(sprite);

    const name = document.createElement('h2');
    name.textContent = pokemon.name;
    pokemonDetails.appendChild(name);

    const height = document.createElement('p');
    height.textContent = `Height: ${pokemon.height}`;
    pokemonDetails.appendChild(height);

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon.weight}`;
    pokemonDetails.appendChild(weight);

    const types = document.createElement('p');
    types.innerHTML = `Types: ${pokemon.types.map(typeInfo => `<a href="type.html?type=${typeInfo.type.name}">${typeInfo.type.name}</a>`).join(', ')}`;
    pokemonDetails.appendChild(types);

    const stats = document.createElement('ul');
    stats.textContent = 'Stats:';
    pokemon.stats.forEach(stat => {
        const statItem = document.createElement('li');
        statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        stats.appendChild(statItem);
    });
    pokemonDetails.appendChild(stats);

    const abilities = document.createElement('p');
    abilities.innerHTML = `Abilities: ${pokemon.abilities.map(abilityInfo => `<a href="ability.html?ability=${abilityInfo.ability.name}">${abilityInfo.ability.name}</a>`).join(', ')}`;
    pokemonDetails.appendChild(abilities);
});