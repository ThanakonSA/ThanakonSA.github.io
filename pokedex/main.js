document.addEventListener('DOMContentLoaded', () => {
    let offset = 0;
    const limit = 20; // จำนวนโปเกมอนที่โหลดแต่ละครั้ง

    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', loadPokemon);

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterPokemon);

    async function loadPokemon() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        const pokemonList = document.getElementById('pokemon-list');

        for (const pokemon of data.results) {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            const pokemonImage = document.createElement('img');
            pokemonImage.src = pokemonData.sprites.front_default;
            pokemonCard.appendChild(pokemonImage);

            const pokemonName = document.createElement('p');
            pokemonName.textContent = pokemonData.name;
            pokemonCard.appendChild(pokemonName);

            pokemonCard.addEventListener('click', () => {
                window.location.href = `pokemon.html?name=${pokemonData.name}`;
            });

            pokemonList.appendChild(pokemonCard);
        }

        offset += limit;
    }

    function filterPokemon() {
        const searchTerm = searchInput.value.toLowerCase();
        const pokemonCards = document.querySelectorAll('.pokemon-card');
        
        pokemonCards.forEach(card => {
            const name = card.querySelector('p').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    loadPokemon();
});