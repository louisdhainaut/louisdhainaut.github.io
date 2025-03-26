document.addEventListener("DOMContentLoaded", () => {
    const resultat = document.getElementById("resultat");
    const reponse = document.getElementById("reponse");
    let imageActuelle = null; // Stocke l'image affichée pour comparer la réponse

    function afficherImageAleatoire() {
        fetch("images.json")
            .then(response => response.json())
            .then(data => {
                // Sélectionner une image aléatoire
                const randomItem = data[Math.floor(Math.random() * data.length)];
                imageActuelle = randomItem; // Stocke l'image actuelle pour comparaison

                // Supprimer l'ancienne image
                const oldImage = document.getElementById("imageAffichee");
                if (oldImage) {
                    oldImage.remove();
                }

                // Ajouter la nouvelle image
                const img = document.createElement("img");
                img.src = "images/" + randomItem.image;
                img.alt = "Devinez ce que c'est"; // Ne pas donner la réponse
                img.id = "imageAffichee";
                img.style.width = "200px";

                document.body.appendChild(img);
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

    // Lancer une image aléatoire au chargement
    afficherImageAleatoire();

    // Rendre les fonctions accessibles dans le HTML
    window.testerReponse = testerReponse;
});
