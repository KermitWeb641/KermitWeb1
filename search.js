import { openGameInNewTab } from "./games.js"; // Import the function from games.js

export function initSearch(games) {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions-container');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let suggestions = [];

        if (searchTerm) {
            // Filter games that include the search term (case-insensitive)
            const matchingGames = Object.keys(games).filter(game =>
                game.includes(searchTerm)
            );
            // Limit the suggestions to the top 10 results
            suggestions = matchingGames.slice(0, 10);
        }

        displaySuggestions(suggestions, games);
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            // Check for exact match first
            if (games[searchTerm]) {
                openGameInNewTab(searchTerm, games[searchTerm]); // Use imported function
            } else {
                // If no exact match, find games that include the term and open the first one
                const matchingGames = Object.keys(games).filter(game => game.includes(searchTerm));
                if (matchingGames.length > 0) {
                    openGameInNewTab(matchingGames[0], games[matchingGames[0]]); // Use imported function, pass game name and url
                }
            }
            // Hide suggestions after pressing Enter
            suggestionsContainer.style.display = 'none';
        }
    });

    // Hide suggestions when clicking outside the search input or suggestions
    document.addEventListener('click', function(event) {
        const target = event.target;
        if (!suggestionsContainer.contains(target) && target !== searchInput) {
            suggestionsContainer.style.display = 'none';
        }
    });

    function displaySuggestions(suggestions, games) {
        suggestionsContainer.innerHTML = '';
        if (suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.classList.add('suggestion');
                suggestionDiv.textContent = suggestion;
                suggestionDiv.addEventListener('click', function() {
                    searchInput.value = suggestion;
                    suggestionsContainer.style.display = 'none';
                    openGameInNewTab(suggestion, games[suggestion]); // Use imported function, pass game name and url
                });
                suggestionsContainer.appendChild(suggestionDiv);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }
}