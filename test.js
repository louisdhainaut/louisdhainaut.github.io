document.addEventListener("DOMContentLoaded", () => {
    const resultat = document.getElementById("resultat");
    const reponse = document.getElementById("reponse");

    function afficherImage() {
        if (!document.getElementById("imageFeet")) {
            const image = new Image();
            image.src = "images/feet.png";
            image.id = "imageFeet"; // Pour éviter les doublons
            document.body.appendChild(image);
        }
    }

    function testerReponse() {
        let monTexte = reponse.value.trim().toLowerCase();

        if (monTexte === "feet") {
            resultat.textContent = "✅ Bravo ! Vous avez trouvé la bonne réponse.";
        } else {
            resultat.textContent = "❌ Mauvaise réponse, essayez encore !";
        }
    }

    // Lancer automatiquement afficherImage() au chargement de la page
    afficherImage();

    // Rend les fonctions accessibles dans le HTML
    window.afficherImage = afficherImage;
    window.testerReponse = testerReponse;
});
