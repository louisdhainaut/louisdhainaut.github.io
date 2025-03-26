document.addEventListener("DOMContentLoaded", () => {
    const resultat = document.getElementById("resultat");
    const reponse = document.getElementById("reponse");
    const affichageScore = document.getElementById("score");
    const imageContainer = document.getElementById("imageContainer"); // Conteneur d'image
    let imageActuelle = null;
    let score = 0;

    function afficherImageAleatoire() {
        fetch("images.json")
            .then(response => response.json())
            .then(data => {
                const randomItem = data[Math.floor(Math.random() * data.length)];
                imageActuelle = randomItem;

                // Supprimer l'ancienne image
                imageContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter la nouvelle image

                // Ajouter la nouvelle image dans le conteneur
                const img = document.createElement("img");
                img.src = "images/" + randomItem.image;
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
            score++;
            affichageScore.textContent = `Score : ${score}`;
            afficherImageAleatoire();
        } else {
            resultat.textContent = "❌ Mauvaise réponse, essayez encore !";
        }
    }

    afficherImageAleatoire();
    affichageScore.textContent = `Score : ${score}`;

    window.testerReponse = testerReponse;
});
