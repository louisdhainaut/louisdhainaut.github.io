document.addEventListener("DOMContentLoaded", () => {
    const resultat = document.getElementById("resultat");
    const reponse = document.getElementById("reponse");
    const imageContainer = document.getElementById("imageContainer"); // Conteneur d'image
    let imageActuelle = null;

    function getDailyRandomNumber(max) {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate(); // Ex: 20240326
        const pseudoRandom = (seed * 9301 + 49297) % 233280; // Générateur simple
        return Math.floor((pseudoRandom / 233280) * max);
    }

    function afficherImageAleatoire() {
        fetch("../img/splash_arts/images.json")
            .then(response => response.json())
            .then(data => {
                const randomItem = data[Math.floor(getDailyRandomNumber(data.length))];
                imageActuelle = randomItem;

                // Supprimer l'ancienne image
                imageContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter la nouvelle image

                // Ajouter la nouvelle image dans le conteneur
                const img = document.createElement("img");
                img.src = `../img/splash_arts/${randomItem.image}`;
                img.alt = "Devinez ce que c'est";
                img.id = "imageAffichee";
                img.style.height = "400px";

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
