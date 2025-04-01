document.addEventListener("DOMContentLoaded", () => {
    // Initialisation des états
    if (localStorage.getItem("reussi") === null) {
        localStorage.setItem("reussi", JSON.stringify(false));
    }
    
    const reussi = JSON.parse(localStorage.getItem("reussi"));
    let imageActuelle = null;

    // Éléments DOM
    const resultat = document.getElementById("resultat");
    const reponse = document.getElementById("reponse");
    const imageContainer = document.getElementById("imageContainer");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popupTitle");
    const popupMessage = document.getElementById("popupMessage");
    const popupImage = document.getElementById("popupImage");
    const popupScore = document.getElementById("popupScore");
    const closePopup = document.getElementById("closePopup");
    const nextBtn = document.getElementById("nextBtn");

    // Fonction aléatoire quotidienne
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
    

    // Chargement de l'image
    function afficherImageAleatoire() {
        fetch("../img/splash_arts/images.json")
            .then(response => response.json())
            .then(data => {
                const randomItem = data[getDailyRandomNumber(data.length)];
                imageActuelle = randomItem;

                imageContainer.innerHTML = "";
                const img = document.createElement("img");
                img.src = `../img/splash_arts/${randomItem.image}`;
                img.alt = "Image à deviner";
                img.style.height = "350px";
                imageContainer.appendChild(img);

                // Affiche la popup si déjà réussi aujourd'hui
                if (reussi) {
                    showSuccessPopup();
                }
            })
            .catch(error => console.error("Erreur:", error));
    }

    // Fonctions pour la popup
    function showSuccessPopup() {
        popupTitle.textContent = "Bravo !";
        popupMessage.textContent = `Vous avez reconnu ${imageActuelle.texte} !`;
        popupImage.src = `../img/splash_arts/${imageActuelle.image}`;

        overlay.style.display = "block";
        popup.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function hidePopup() {
        overlay.style.display = "none";
        popup.style.display = "none";
        document.body.style.overflow = "";
    }

    // Vérification de la réponse
    function testerReponse() {
        const reponseUtilisateur = reponse.value.trim().toLowerCase();
        
        if (imageActuelle && reponseUtilisateur === imageActuelle.texte.toLowerCase()) {
            resultat.textContent = "✅ Correct ! Bravo !";
            localStorage.setItem("reussi", JSON.stringify(true));
            showSuccessPopup();
            document.getElementById("reponse").value = '';
        } else {
            resultat.textContent = "❌ Incorrect, essayez encore !";
            document.getElementById("reponse").value = '';
        }
    }

    // Écouteurs d'événements
    reponse.addEventListener("keydown", (e) => {
        if (e.key === "Enter") testerReponse();
    });

    closePopup.addEventListener("click", hidePopup);
    overlay.addEventListener("click", hidePopup);
    nextBtn.addEventListener("click", hidePopup);

    // Initialisation
    afficherImageAleatoire();
    window.testerReponse = testerReponse; // Rend la fonction globale
});