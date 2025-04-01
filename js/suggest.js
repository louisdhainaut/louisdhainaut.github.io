const searchInput = document.querySelector(".input");
const suggestionPanel = document.querySelector(".suggest");

async function loadJSON() {
    const response = await fetch('../img/splash_arts/images.json');
    if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(item => item.texte).filter(Boolean);
}

// Usage
loadJSON()
    .then(champs => {
        console.log('Loaded champions:', champs);
        
        searchInput.addEventListener("keyup", function() {
            const input = searchInput.value.toLowerCase();
            suggestionPanel.innerHTML = '';
            
            if (input === '') {
                return;
            }
            
            const suggestions = champs.filter(function(champion) {
                return champion.toLowerCase().startsWith(input);
            });
            
            suggestions.forEach(function(suggested) {
                const button = document.createElement('button');
                button.innerHTML = suggested;
                suggestionPanel.appendChild(button);
            });
        });
    });