document.getElementById("fraisForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const mois = document.getElementById("mois").value;
    const nbJustificatifs = document.getElementById("nbJustificatifs").value;
    const montantValide = document.getElementById("montantValide").value;
    const dateModif = document.getElementById("dateModif").value;

    // Construire l'objet de la fiche de frais
    const ficheFrais = {
        mois: mois,
        nbJustificatifs: parseInt(nbJustificatifs),
        montantValide: parseFloat(montantValide),
        dateModif: dateModif,
    };

    // Faire une requête POST vers le back-end
    fetch("http://localhost:8080/api/ficheFrais", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ficheFrais)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Fiche de frais ajoutée :", data);
        alert("Fiche de frais ajoutée avec succès !");
    })
    .catch(error => {
        console.error("Erreur lors de l'ajout de la fiche de frais :", error);
        alert("Erreur lors de l'ajout de la fiche de frais.");
    });
});
