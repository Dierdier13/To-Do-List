
let champContainer = document.getElementById("champ");
const ajoutContainer = document.getElementById("ajout");
const allContainer = document.getElementById("all");
const todoContainer = document.getElementById("todo");
const finishContainer = document.getElementById("finish");
const valeurContainer = document.getElementById("valeurChamp");
const deletSelectContainer = document.getElementById("deletSelec");
const deletAllContainer = document.getElementById("deletAll");

// Références au modal et aux boutons de confirmation/annulation
const confirmationModal = document.getElementById("confirmationModal");
const modalOverlay = document.getElementById("modalOverlay");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let currentDeleteAction = null; // Stocke l'action de suppression globale (toutes ou sélectionnées)
let taskToDelete = null; // Stocke la tâche individuelle à supprimer

//  DIV Ajouter taches
let ajoutTache = document.createElement('div');
ajoutTache.textContent = "Ajouter tâche";
ajoutContainer.appendChild(ajoutTache);
ajoutTache.addEventListener("click", function () {
    addTask();
});

// Div Toutes les taches
let afficheAll = document.createElement('div');
afficheAll.textContent = "Toutes les tâches";
allContainer.appendChild(afficheAll);
afficheAll.addEventListener("click", showAllTasks);

// Div Taches a faire
let afficheTodo = document.createElement('div');
afficheTodo.textContent = "Tâches à faire";
todoContainer.appendChild(afficheTodo);
afficheTodo.addEventListener("click", showUncheckedTasks);

//  Div Taches accomplies
let afficheFinish = document.createElement('div');
afficheFinish.textContent = "Tâches accomplies";
finishContainer.appendChild(afficheFinish);
afficheFinish.addEventListener("click", showCheckedTasks);

//  Div Delete Checked
let deletCheck = document.createElement('div');
deletCheck.textContent = "Delete Cheked";
deletSelectContainer.appendChild(deletCheck);
deletCheck.addEventListener("click", function () {
    if (document.querySelectorAll(".div-add input[type='checkbox']:checked").length > 0) {
        currentDeleteAction = deleteCheckedTasks;
        showModal();
    } 
});

// Div Delete All
let deletAll = document.createElement('div');
deletAll.textContent = "Delete All";
deletAllContainer.appendChild(deletAll);
deletAll.addEventListener("click", function () {
    currentDeleteAction = deleteAllTasks;
    showModal();
});

// Validation avec le bouton Entrée
champContainer.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

// Fonction ajouter taches //////////////////////////////////////////////////////////////////////
function addTask() {
    if (champContainer.value.trim() === "") return;

    // Créer la check box
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.style.marginLeft = "90px";

    // Créer le Label
    let label = document.createElement("p");
    label.textContent = champContainer.value;

    // Créer le bouton de suppression avec une icône de poubelle
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.classList.add("corbeille")
    deleteButton.addEventListener("click", function () {
        taskToDelete = taskContainer; // Stocke la tâche actuelle pour suppression
        currentDeleteAction = deletTask; // Associe l'action de suppression individuelle
        showModal();
    }); 
    

    // Créer un conteneur pour regrouper la checkbox et le label
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("div-add");
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(label);
    taskContainer.appendChild(deleteButton);
    taskContainer.style.margin = "20px";

    // Ajouter le conteneur de la tâche dans le conteneur valeur
    valeurContainer.appendChild(taskContainer);

    // Effacer le champ de texte après ajout
    champContainer.value = '';
}
// Fin fonction ajouter tache //////////////////////////////////////////////////////////////////////////


// Affiche le modal de confirmation
function showModal() {
    confirmationModal.style.display = "block";
    modalOverlay.style.display = "block";
}

// Cache le modal de confirmation
function hideModal() {
    confirmationModal.style.display = "none";
    modalOverlay.style.display = "none";
    currentDeleteAction = null;
    taskToDelete = null; // Réinitialise après fermeture du modal
}

confirmDelete.addEventListener("click", function () {
    if (currentDeleteAction) currentDeleteAction();
    hideModal();
});

// Annule la suppression
cancelDelete.addEventListener("click", hideModal);
modalOverlay.addEventListener("click", hideModal);

// Fonction pour afficher toutes les tâches
function showAllTasks() {
    document.querySelectorAll(".div-add").forEach(task => (task.style.display = "flex"));
}

// Fonction pour afficher uniquement les tâches non cochées (à faire)
function showUncheckedTasks() {
    document.querySelectorAll(".div-add").forEach(task => {
        let checkbox = task.querySelector("input[type='checkbox']");
        task.style.display = !checkbox.checked ? "flex" : "none";
    });
}

// Fonction pour afficher uniquement les tâches cochées (accomplies)
function showCheckedTasks() {
    document.querySelectorAll(".div-add").forEach(task => {
        let checkbox = task.querySelector("input[type='checkbox']");
        task.style.display = checkbox.checked ? "flex" : "none";
    });
}

// fonction pour delete un element
function deletTask() {
    if (taskToDelete) {
        valeurContainer.removeChild(taskToDelete);
        taskToDelete = null; // Réinitialise après suppression
    }
}

// Fonction pour delete les elements cheked
function deleteCheckedTasks() {
    document.querySelectorAll(".div-add input[type='checkbox']:checked").forEach(checkbox => {
        let task = checkbox.closest(".div-add");
        if (task) valeurContainer.removeChild(task);
    });
}

// Fonction pour delete tous les elements
function deleteAllTasks() {
    document.querySelectorAll(".div-add").forEach(task => {
        valeurContainer.removeChild(task);
    });
}
