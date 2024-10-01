document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const abilityName = params.get('ability');

    const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
    const abilityData = await response.json();

    const abilityList = document.getElementById('ability-list');

    abilityData.pokemon.forEach(pokemonEntry => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const pokemonImage = document.createElement('img');
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonEntry.pokemon.url.split('/')[6]}.png`;
        pokemonCard.appendChild(pokemonImage);

        const pokemonName = document.createElement('p');
        pokemonName.textContent = pokemonEntry.pokemon.name;
        pokemonCard.appendChild(pokemonName);

        pokemonCard.addEventListener('click', () => {
            window.location.href = `pokemon.html?name=${pokemonEntry.pokemon.name}`;
        });

        abilityList.appendChild(pokemonCard);
    });
});