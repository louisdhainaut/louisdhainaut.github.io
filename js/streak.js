document.addEventListener("DOMContentLoaded", () => {
    const resultat = document.getElementById("resultat");
    const reponse = document.getElementById("reponse");
    const affichageScore = document.getElementById("score");
    const imageContainer = document.getElementById("imageContainer"); // Conteneur d'image
    const maStreak = document.getElementById("maStreak")
    let imageActuelle = null;
    let score = 0;
    let currentStreak = 0;

    function afficherImageAleatoire() {
        fetch("../img/images.json")
            .then(response => response.json())
            .then(data => {
                const randomItem = data[Math.floor(Math.random() * data.length)];
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
            resultat.textContent = "✅ Correct ! Bravo ! (ggwp)";
            score++;
            affichageScore.textContent = `Score : ${score}`;

            currentStreak = Math.max(currentStreak, score);
            maStreak.textContent = `Votre meilleure streak : ${currentStreak}`;

            afficherImageAleatoire();
        } else {
            loose();
        }
    }

    function loose() {
        resultat.textContent = "❌ Mauvaise réponse, vous avez interrompu votre série ! (t'es trop nul c'était ez)";
        maStreak.textContent = `Votre meilleure streak : ${currentStreak}`;
        score = 0;
        affichageScore.textContent = `Score : ${score}`;

        afficherImageAleatoire();
    }

    function main() {
        afficherImageAleatoire();
        affichageScore.textContent = `Score : ${score}`;
        maStreak.textContent = `Votre meilleure streak : ${currentStreak}`;
        window.testerReponse = testerReponse;
    }

    main();
});
