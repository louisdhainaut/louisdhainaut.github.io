document.addEventListener("DOMContentLoaded", () => {
    const resultat = document.getElementById("resultat");
    const reponse = document.getElementById("reponse");
    const imageContainer = document.getElementById("imageContainer"); // Conteneur d'image
    let imageActuelle = null;

    function getDailyRandomNumber(max) {
        const today = new Date();
        const seed = today.toDateString(); // "Tue Mar 26 2024"
        
        // Convertir en hash simple (somme des char codes)
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash * 31 + seed.charCodeAt(i)) % 1000000; // Nombre pseudo-aléatoire
        }
    
        return hash % max; // Nombre dans l'intervalle [0, max-1]
    }
    

    function afficherImageAleatoire() {
        fetch("../img/images.json")
            .then(response => response.json())
            .then(data => {
                const randomItem = data[Math.floor(getDailyRandomNumber(data.length))];
                imageActuelle = randomItem;

                // Supprimer l'ancienne image
                imageContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter la nouvelle image

                // Ajouter la nouvelle image dans le conteneur
                const img = document.createElement("img");
                img.src = "../img/" + randomItem.image;
                img.alt = "Devinez ce que c'est";
                img.id = "imageAffichee";
                img.style.height = "150px";

                imageContainer.appendChild(img); // Ajoute l'image dans le conteneur
            })
            .catch(error => console.error("Erreur lors du chargement du JSON :", error));
    }

    function testerReponse() {
        let monTexte = reponse.value.trim().toLowerCase();

        if (imageActuelle && monTexte === imageActuelle.texte.toLowerCase()) {
            resultat.textContent = "✅ Correct ! Bravo !";
        } else {
            resultat.textContent = "❌ Mauvaise réponse, essayez encore !";
        }
    }

    afficherImageAleatoire();
    window.testerReponse = testerReponse;
});
