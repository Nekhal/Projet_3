let htmlBox = document.querySelector("html");
let bodyBox = document.querySelector("body");



//CREATION DE LA NOUVELLE VERSION "MES PROJETS"

// Création des filtres
const filtersForm = document.createElement("form");
filtersForm.setAttribute("action", "#");
filtersForm.setAttribute("method", "get");
filtersForm.setAttribute("id", "filtres");
filtersForm.setAttribute("class","filtres");

const portFolioDiv = document.querySelector("#portfolio");
portFolioDiv.appendChild(filtersForm);

// Création de la nouvelle galerie
const portfolioBox = document.querySelector("#portfolio");
newDiv = document.createElement("div");
portfolioBox.appendChild(newDiv);

// Application de la class .gallery
const newGallery = document.querySelector("#portfolio div");
newGallery.setAttribute("data-categorie-id", "");
newGallery.setAttribute("class","gallery");


function openModal() {
    createModal('Galerie photo', modalPage1());
};
function closeModal() {
    document.querySelector("#modalBox").remove();
};

// Vérification du token de la session
let userSessionId = sessionStorage.getItem("id");
let userSessionToken = sessionStorage.getItem("token");

// Ouverture du mode édition si tout est OK 
if (userSessionId && userSessionToken) {
    editorMode();
    } else {
    "";
};

// Création de l'icone d'édition
function createIcon(classes, parent, name, fonction) {
    let creation = document.createElement('i');
        creation.setAttribute('class', classes);
        parent.appendChild(creation);
        parent.innerHTML += ' '+name;
        parent.addEventListener('click', fonction);
}
// mise en place des fonctions d'edition une fois connecté
function editorMode() {
    const mainBox = document.querySelector('main');
    // Bandeau d'édition
    let ConnectTopBar = document.createElement("div");
        ConnectTopBar.setAttribute('class', 'topBar');
    let topBarIcon = document.createElement('i');
        topBarIcon.setAttribute('class', 'fa-regular fa-pen-to-square');
        ConnectTopBar.appendChild(topBarIcon);
        ConnectTopBar.textContent += 'Mode édition';
    let ConnectTopInput = document.createElement('input');
        ConnectTopInput.setAttribute('type', 'submit');
        ConnectTopInput.setAttribute('value', 'publier les changements');
        ConnectTopBar.appendChild(ConnectTopInput);
        htmlBox.insertBefore(ConnectTopBar, bodyBox);

    // Petit lien d'édition
    let divEditorSmall = document.createElement("div");
        divEditorSmall.setAttribute('class', 'editDiv editDiv1');

    // Création de l'icon
    createIcon('fa-regular fa-pen-to-square', divEditorSmall, 'modifier');

    // insertion du lien
    const introRight = document.querySelector("#introduction article"); 
        introRight.insertBefore(divEditorSmall, introRight.children[0]);

    divEditorSmall = document.createElement("div");
    divEditorSmall.setAttribute('class', 'editDiv editDiv2');

    // Création de l'icon
    createIcon('fa-regular fa-pen-to-square', divEditorSmall, 'modifier');

    // insertion du lien
    let presLeft = document.querySelector("#introduction figure");
    mainBox.insertBefore(divEditorSmall, mainBox.children[1]);

    divEditorSmall = document.createElement("div");
    divEditorSmall.setAttribute('class', 'editDiv editDiv3');
    // Création de l'icon
    createIcon('fa-regular fa-pen-to-square', divEditorSmall, 'modifier', openModal);        

    // Insertion du lien avant "Mes Projets"
    portfolioBox.insertBefore(divEditorSmall, portfolioBox.children[0]);

    // Disparition des boutons de catégorie et ajout de marge
    document.querySelector("#filtres").style.display = "none";
    document.querySelector("#portfolio h2").style.marginBottom = '80px';

    // passer le li login en logout une fois connecté
    inToOut = document.querySelectorAll("nav ul li");
    inToOut[2].textContent = "logout";
};

// Fonction pour rediriger au clic sur login
function linkLogin() {
    window.location.href = "login.html";
};

// Fonction pour supprimer la session au clic sur logout
function linkLogout() {
    sessionStorage.clear();
    window.location.href = "index.html";
};

// Intéraction avec le menu via login
inToOut = document.querySelectorAll("nav ul li");

// en fonction de l'état connecté ou non connecté
if (userSessionId && userSessionToken) {
    inToOut[2].addEventListener("click", linkLogout);
    } else {
    inToOut[2].addEventListener("click", linkLogin);
    }

// utiliser newGallery comme container
// Fonction pour créer une figure pour un projet du portfolio
function newFigure(imgUrl, imgTitle, imgId) {
    let newFig = document.createElement("figure");
        newGallery.appendChild(newFig);
        newFig.setAttribute('data-id', imgId);
        newImg = document.createElement("img");
        newImg.crossOrigin = "anonymous";
        newFig.appendChild(newImg);
        newFigCap = document.createElement("figcaption");
        newFig.appendChild(newFigCap);

    // Application du src et alt
    newImg.setAttribute("src", imgUrl);
    newImg.setAttribute("alt", imgTitle);

    newFigCap.innerHTML += imgTitle;
    newFigCap.setAttribute('data-id', imgId);
    newFigCap.style.cssText = `font-size: 13px; font-weight: 400;`;
}


// Fonction pour charger tous les projets du portfolio
function loadGallery(categorieId) {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        return res.json();
    })
    .then(function(value) {
        const entries = value.length;
        // Nettoyage de la galerie
        newGallery.innerHTML = "";
        for(let n = 0; n < entries; n++)
        {
            let imgId = value[n].id;
            let imgUrl = value[n].imageUrl;
            let imgName = value[n].title;
            let imgCatId = value[n].category.id;
            // Compare l'ID du bouton (categorieId) et l'ID du/des projet(s) (imgCatId)
            if (categorieId == imgCatId || !categorieId) {
                newFigure(imgUrl, imgName, imgId);
              }
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}


// Affichage de la galerie au chargement de la page
window.onload = function(){
    loadGallery();
}


// Appel des catégories de l'api et création des boutons de filtre
fetch("http://localhost:5678/api/categories")
.then(function(res) {
    return res.json();
})
.then(function(value) {
    const entries = value.length;
    
    for(let n = 0; n < entries; n++)
    {
        let cateName = value[n].name;
        let categorieId = value[n].id;
        newBouton(cateName, categorieId, categorieOnClick);
    }
})
.catch(function(err) {
    console.log(err);
});

// Fonction pour la création des boutons de catégories
function newBouton(btnName, categorieId) {
    let newBtn = document.createElement("input");
    newBtn.setAttribute("type", "submit");
    newBtn.setAttribute("value", btnName);
    newBtn.setAttribute("class", "filtresBtn");
    newBtn.setAttribute("data-categorie-id", categorieId);
    newBtn.addEventListener('click', categorieOnClick);
    filtersForm.appendChild(newBtn);
}


// Le bouton Tous
newBouton('Tous', '');


// Filtre des projets par catégorie
function categorieOnClick(e) {
    e.preventDefault();
    let activeBtn = document.querySelector(".filtres input[style='background-color: rgb(29, 97, 84); color: white;']");
        if (activeBtn) {
            activeBtn.style.backgroundColor = "#FFFEF8";
            activeBtn.style.color = "#1D6154";
        }
    e.target.style.backgroundColor = "#1D6154";
    e.target.style.color = "white";
    let categorieDataId = e.target.getAttribute("data-categorie-id");
        loadGallery(categorieDataId);
}

    
// Création de la modale de base
function createModal(titre, modalContent) {
    
    // Création de la div contenant la modal
    const modalBox = document.createElement("div");
    htmlBox.insertBefore(modalBox, bodyBox);
    modalBox.setAttribute("id", "modalBox");
    modalBox.addEventListener('click', function(){
        closeModal();
    });
    let modal = document.createElement("div");
    modalBox.appendChild(modal);
    modal.setAttribute("id", "modal");
    modal.setAttribute("role", "modal");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener('click', function(e){
        e.stopPropagation();
    });
    
    let modalCross = document.createElement("span");
    // modal Cross close
    modal.appendChild(modalCross);
    let modalCrossContent = document.createElement('i');
    modalCrossContent.setAttribute('class', 'fa-solid fa-xmark');
    modalCross.appendChild(modalCrossContent);
    modalCross.addEventListener('click', closeModal);
    modalCross.setAttribute('class', 'modalCross');
    
    // titre
    let modalTitre = document.createElement("h2");
    modal.appendChild(modalTitre);
    modalTitre.textContent = titre;
    modalTitre.setAttribute('class', 'modalTitre');
    modal.appendChild(modalContent);
}


// Création de la page 1 de la modale
function modalPage1() {
    let page1 = document.createElement("div");
        page1.setAttribute('class', 'modalPage flexCol');
        page1.setAttribute("id", "page1");
    let modalGalerie = document.createElement("div");
        modalGalerie.setAttribute('class', 'modalGalerie');
    let modalBar = document.createElement("hr");
        modalBar.setAttribute('class', 'modalBar');
    let modalAddDel = document.createElement("div");
        modalAddDel.setAttribute('class', 'modalAddDel');
    let modalAdd = document.createElement("input");
        modalAdd.setAttribute('class', 'modalAdd');
        modalAdd.setAttribute("type", "submit");
        modalAdd.setAttribute("value", "Ajouter une photo");
        modalAddDel.appendChild(modalAdd);
        page1.append(modalGalerie, modalBar, modalAddDel);

    loadGalleryMini();

    // text supprimer la galerie
    let modalNewParagraph = document.createElement('p');
        modalNewParagraph.textContent = 'Supprimer la galerie';
        modalAddDel.appendChild(modalNewParagraph);

    // Changement de la modal en "Ajout photo"
    modalAddDel.firstChild.addEventListener('click', () => {
    document.querySelector("#modal").removeChild(page1);
    document.querySelector("#modal").appendChild(modalPage2());
    document.querySelector(".modalTitre").textContent = 'Ajout photo';
    // createModal('Ajout photo', modalPage2());
    });
    return page1;
} 


// Création de la page 2 de la modale
function modalPage2() {
    let page2 = document.createElement("div");
        page2.setAttribute("id", "page2");
        page2.setAttribute("class", "modalPage flexCol");

    // création du formulaire
    let formulaire = document.createElement("form");
        formulaire.setAttribute('class', 'flexCol');
        formulaire.setAttribute('id', 'formulaire');
        formulaire.setAttribute('enctype', 'multipart/form-data');
        page2.appendChild(formulaire);

    // input file
    let inputFile = document.createElement("input");
        inputFile.setAttribute("type", "file");
        inputFile.setAttribute("name", "image");
        inputFile.setAttribute("id", "imgFile");
        inputFile.setAttribute("accept", ".png, .jpeg");
        inputFile.addEventListener('click', imgRemove);
        inputFile.addEventListener('input', imgChange);
        inputFile.addEventListener('input', changeColorBtn);
        formulaire.appendChild(inputFile);

    let fileLabel = document.createElement("label");
        fileLabel.setAttribute("for", "imgFile");
        fileLabel.setAttribute("id", "labelBox");
        formulaire.appendChild(fileLabel);

    // icone du file input
    let labelDiv = document.createElement("div");
        labelDiv.setAttribute("id", "labelImg");
        fileLabel.appendChild(labelDiv);
    let newIcon = document.createElement('i');
        newIcon.setAttribute('class', 'fa-regular fa-image');
        labelDiv.appendChild(newIcon);

    // bouton du file input
    labelDiv = document.createElement("div");
    labelDiv.setAttribute("id", "labelBtn");
    fileLabel.appendChild(labelDiv);
    newDiv = document.createElement('div');
    newDiv.textContent = "+ Ajouter photo";
    labelDiv.appendChild(newDiv);

    // Informations sur les formats et "poids" acceptés
    labelDiv = document.createElement("div");
    fileLabel.appendChild(labelDiv);
    labelDiv.setAttribute("id", "labelMax");
    labelDiv.textContent = 'jpg, png : 4Mo max';

    // titre
    fileLabel = document.createElement("label");
    fileLabel.setAttribute("for", "titre");
    formulaire.appendChild(fileLabel);
    fileLabel.textContent = 'Titre';

    let inputTitre = document.createElement("input");
        inputTitre.setAttribute("type", "text");
        inputTitre.setAttribute("name", "titre");
        inputTitre.setAttribute("id", "titre");
        inputTitre.setAttribute("class", "inputUpload");
        inputTitre.addEventListener('input', changeColorBtn);
        formulaire.appendChild(inputTitre);

    // selection catégorie
    fileLabel = document.createElement("label");
    fileLabel.setAttribute("for", "categorie");
    formulaire.appendChild(fileLabel);
    fileLabel.textContent = 'Catégorie';

    let selectCategorie = document.createElement("select");
        selectCategorie.setAttribute("id", "categorie");
        selectCategorie.setAttribute("class", "inputUpload marginBottom");
        selectCategorie.addEventListener('input', changeColorBtn);

    // création de l'option vide
    let optionEmpty = document.createElement('option');
        selectCategorie.appendChild(optionEmpty);
        formulaire.appendChild(selectCategorie);

    // barre hr
    modalBar = document.createElement("hr");
    formulaire.appendChild(modalBar);
    modalBar.setAttribute('class', 'modalBar');

    // bouton valider
    modalValide = document.createElement("input");
    modalValide.setAttribute("type", "submit");
    modalValide.setAttribute("value", "Valider");
    modalValide.setAttribute("id", "buttonUpload");
    formulaire.appendChild(modalValide);

    modalValide.addEventListener('click', (e) => {
        e.preventDefault();
        addNewProject();
    });

    // Récupération des différentes catégories dans l'API
    // les ajouter à selectCategorie comme <option>
    fetch("http://localhost:5678/api/categories")
    .then(function(res) {
        return res.json();
    })
    .then(function(value) {
        const entries = value.length;
    
        for(n = 0; n < entries; n++)
        {
            let cateName = value[n].name;
            let cateId = value[n].id;
            newOption = document.createElement("option");
            selectCategorie.appendChild(newOption);
            newOption.textContent += cateName;
            newOption.setAttribute("value", cateName);
            newOption.setAttribute("name", cateName);
            newOption.setAttribute("class", 'option'+cateId);
            newOption.setAttribute("data-id-cat", cateId);
        }
    })
    .catch(function(err) {
        console.log(err);
    });


    // Création du message d'erreur du formulaire d'envoi de nouveau projet
    msgRefuse = document.createElement('div');
    msgRefuse.setAttribute('class', 'msgErrorUpload');
    formulaire.insertBefore(msgRefuse, modalValide);

    // création de la flèche retour
    let modalArrow = document.createElement("span");
        modalArrow.setAttribute('class', 'modalArrow')
    let modalArrowContent = document.createElement('i');
        modalArrowContent.setAttribute('class', 'fa-solid fa-arrow-left');
        modalArrow.appendChild(modalArrowContent);
        page2.appendChild(modalArrow);

    // Retour à la modale 1
    modalArrow.addEventListener('click', () => {
    document.querySelector("#modal").removeChild(page2);
    document.querySelector("#modal").appendChild(modalPage1());
    document.querySelector(".modalTitre").textContent = 'Galerie photo';
    });
    return page2;
} 


// Création de projet pour la galerie de la modale
function newFigureMini(imgId, imgUrl, imgTitle) {
    let newFig = document.createElement("figure");
    let modalGalerie = document.querySelector(".modalGalerie");
        modalGalerie.appendChild(newFig);
        newFig.setAttribute("class", "projets");
        newFig.setAttribute("data-id", imgId);


    // Apparition/disparition de l'icone de déplacement au survol
    function newFigCross(e) {
        e.target.addEventListener('mouseover', (e) => {
            e.target.parentElement.querySelector(".crossPop").style.display = "inline";
        });
        e.target.addEventListener('mouseout', (e) => {
            e.target.parentElement.querySelector(".crossPop").style.display = "none";
        });
    }

    let newImg = document.createElement("img");
        newImg.crossOrigin = "anonymous";
        newImg.style.width = '80px';
        // appel de la fonction de survol
        newImg.addEventListener('load', newFigCross);
        newFig.appendChild(newImg);

    // Création du span et de l'icone de la corbeille
    let TrashIcon = document.createElement("span");
        newFig.appendChild(TrashIcon);
        TrashIcon.setAttribute("data-del-id", imgId);
        TrashIcon.setAttribute("class", 'trash');    
    let trashContent = document.createElement('i');
        TrashIcon.appendChild(trashContent);
        trashContent.setAttribute('class', 'fa-solid fa-trash-can');
        trashContent.setAttribute('data-del-id', imgId);

    //Création du figcaption et de son contenu
    let newFigCap = document.createElement("figcaption");
        newFigCap.setAttribute("data-id", imgId);
        newFigCap.setAttribute("class", "editSpan");
    let newFigCapSpan = document.createElement("span");
        newFigCapSpan.textContent += "éditer";
        newFig.appendChild(newFigCap);
        newFigCap.appendChild(newFigCapSpan);

    // Ajout du src et du alt à l'image 
    newImg.setAttribute("src", imgUrl);
    newImg.setAttribute("alt", imgTitle);

    // Ajout de la fonction de suppression du projet
    function deleteImg(e) {
        let id = e.target.getAttribute("data-del-id");
        let userToken = sessionStorage.getItem('token');

        fetch("http://localhost:5678/api/works/"+id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json', 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
            id: id
            })
        })
        .then(function(){
            // Si tout est bon, on supprime l'image 
            const nbToDel = document.querySelectorAll("[data-del-id='"+imgId+"']").length;
                for(n = 0; n < nbToDel; n++)
                {
                    document.querySelector("[data-id='"+imgId+"']").remove();
                }            
        })
        .catch(function(err) {
            // Sinon message d'erreur
            console.log(err);
        })
    }
    //Création de l'icone Poubelle 
    TrashIcon.addEventListener('click', deleteImg);
    let moveIcon = document.createElement("span");
        newFig.appendChild(moveIcon);
    let moveIconContent = document.createElement("i");
    moveIconContent.setAttribute('class', 'fa-solid fa-arrows-up-down-left-right');
    moveIcon.appendChild(moveIconContent);
    moveIcon.setAttribute('class', 'crossPop');
}


function loadGalleryMini() {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        return res.json();
    })
    .then(function(value) {
        const entries = value.length;
        for(n = 0; n < entries; n++)
        {
            let imgId = value[n].id;
            let imgUrl = value[n].imageUrl;
            let imgName = value[n].title;
            let imgCatId = value[n].category.id;
            newFigureMini(imgId, imgUrl, imgName);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}


// Affichage de l'image miniature
function showImg(url) {
    document.getElementById("labelImg").style.display = 'none';
    document.getElementById("labelBtn").style.display = 'none';
    document.getElementById("labelMax").style.display = 'none';

    // On récupère l'image choisie et on affiche un preview dans #labelBox
    let imageFile = document.getElementById('imgFile').files[0];
    let formBox = document.getElementById("labelBox");
    let image = document.createElement('img');
        image.setAttribute("id", "imageToUpload");
        image.style.maxHeight = '169px';
        image.file = imageFile;
        formBox.appendChild(image);

    let reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            }; 
        })
        // on applique le src à image
        (image);
        reader.readAsDataURL(imageFile);
}


// on fait réapparaitre le contenu information de l'input file
function imgRemove() {
    // si une preview est déjà présente on la retire
    document.getElementById("imageToUpload") ? document.getElementById("imageToUpload").remove() : "";
    // On réaffiche les infos de l'input file (format et taille autorisée)
    document.getElementById("labelImg").style.display = 'inline';
    document.getElementById("labelBtn").style.display = 'flex';
    document.getElementById("labelMax").style.display = 'inline';
}


// Si l'input contient quelque chose on l'envoi à la fonction showImg
function imgChange(e) {
    e.target.value ? (
    checkFile = e.target.files[0].name,
    checkFile != null ? showImg(checkFile) : ""
    ) : "";
}


// si chaque input a été rempli le bouton passe en vert
function changeColorBtn() {
    checkImg = document.getElementById("imgFile").value;
    checkTitre = document.getElementById("titre").value;
    checkCategorie = document.getElementById("categorie").value;
    const isImgInputFilled = checkImg !== "";
    const isTitleInputFilled = checkTitre !== "";
    const isCategoryInputFilled = checkCategorie !== "";

    if (isImgInputFilled && isTitleInputFilled && isCategoryInputFilled) {
        buttonGreen();
    } else {
        buttonGrey();
    }
}

function buttonGreen() {
    document.getElementById("buttonUpload").style.backgroundColor = "#1D6154";
}

function buttonGrey() {
    document.getElementById("buttonUpload").style.backgroundColor = "#A7A7A7";
}


// Ajout d'un projet
function addNewProject() {
    const imgFileInput = document.getElementById("imgFile");
    const titleInput = document.getElementById("titre");
    const categoryInput = document.getElementById("categorie");
    const checkImg = imgFileInput.value;
    const checkTitre = titleInput.value;
    const checkCategorie = categoryInput.value;
    const isImgInputFilled = checkImg !== "";
    const isTitleInputFilled = checkTitre !== "";
    const isCategoryInputFilled = checkCategorie !== "";
    
    if (isImgInputFilled && isTitleInputFilled && isCategoryInputFilled) {
        const categoryOption = document.querySelector(`[name="${checkCategorie}"]`);
        const categoryId = categoryOption.getAttribute("data-id-cat");
        addNewProjectCheck(checkTitre, checkImg, categoryId);
    } else {
        formError("Votre formulaire n'est pas complet.");
    }
    
    // Efface le message d'erreur au bout de 3 secondes
    setTimeout(() => { msgRefuse.textContent = ""; }, 3000);
}


// Fonction pour afficher une erreur dans le formulaire
function formError(msg) {
    msgRefuse.textContent = msg;
}


// Controle de l'extension et du poids de l'image
function addNewProjectCheck(title, imageUrl, categoryId) {
    let isValid = true;
    let imageFile = document.getElementById("imgFile").files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedImageTypes.includes(imageFile.type)) {
        formError("Ce format d'image n'est pas accepté.");
        isValid = false;
    }
    if (imageFile.size > 1024 * 4000) {
        formError("L'image dépasse la taille maximum autorisée.");
        isValid = false;
    }
    if (isValid) {
        uploadImage(imageFile, title, categoryId);
    }
}


// Envoi de l'image et du projet à l'api
function uploadImage(image, title, categoryId) {
    let userToken = sessionStorage.getItem('token');    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', categoryId);

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Authorization': `Bearer ${userToken}`
        },
        body: formData
    }).then(response => {
        document.querySelector("#modal").removeChild(page2);
        document.querySelector("#modal").appendChild(modalPage1());
        document.querySelector(".modalTitre").textContent = 'Galerie photo';

        loadGallery();
    })
    .catch(function(err) {
        // message d'erreur
        console.log(err);
    });
}