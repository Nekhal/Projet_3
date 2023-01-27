const reponse = await fetch('http://localhost:5678/api/works');
const images = await reponse.json();


/*Création de la galerie */
function genererImages(images){
   for (let i = 0; i < images.length; i++) {

       const article = images[i];
       /*Récupération de l'élément du DOM qui accueillera les images*/
       const gallery = document.querySelector(".gallery");
       /*Création d’une balise dédiée à une image*/
       const blocElement = document.createElement("figure");
       /*Création des balises*/ 
       const imageElement = document.createElement("img");
       imageElement.src = article.imageUrl;
       const nomElement = document.createElement("figcaption");
       nomElement.innerText = article.title;
       /*Balise utilisée pour les filtres */ 
       const categoryElement = document.createElement("p");
       categoryElement.innerText = article.categoryId;
    
       /*On rattache la balise figure à la section gallery*/
       gallery.appendChild(blocElement);
       /*On rattache l’image et sa description à la balise figure*/
       blocElement.appendChild(imageElement);
       blocElement.appendChild(nomElement);       
    };
}

/*Permet l'affichage de la gallerie*/ 
genererImages(images);


/*---------LES FILTRES---------*/

/*Bouton "Tous"/reset */
const boutonAll = document.querySelector(".btn-all");

boutonAll.addEventListener("click", function () {
    const imagesReset = images.filter(function () {
        return images;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererImages(imagesReset)
    console.log(imagesReset)    
});
/*Bouton "Objets"*/
const boutonObjets = document.querySelector(".btn-objets");

boutonObjets.addEventListener("click", function () {
    const imagesObjets = images.filter(function (image) {
        return image.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererImages(imagesObjets)    
});
/*Bouton "Appartements"*/
const boutonApparts = document.querySelector(".btn-appart");

boutonApparts.addEventListener("click", function () {
    const imagesAppart = images.filter(function (image) {
        return image.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererImages(imagesAppart)    
});
/*Bouton "Hotels et restaurants"*/
const boutonHotels = document.querySelector(".btn-hr");

boutonHotels.addEventListener("click", function () {
    const imagesHotel = images.filter(function (image) {
        return image.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererImages(imagesHotel)    
});


/*MODALE 1*/


/*Génerer la galerie de la modale*/
function genererMiniImages(images){
    for (let i = 0; i < images.length; i++) {
 
        const miniArticle = images[i];
        /*Récupération de l'élément du DOM qui accueillera les images*/
        const miniGalery = document.querySelector(".miniGalery");
        /*Création d’une balise dédiée à une image*/
        const minBlocElement = document.createElement("figure");
        /*Création des balises*/ 
        const minImageElement = document.createElement("img");
        minImageElement.src = miniArticle.imageUrl;
        const minNomElement = document.createElement("figcaption");
        minNomElement.innerText = "éditer";
        /*Balise utilisée pour les filtres */ 
        const minCategoryElement = document.createElement("p");
        minCategoryElement.innerText = miniArticle.categoryId;
        /*Création du bouton "déplacer"*/
        const moveIcon = document.createElement("span");        
        const moveIconContent = document.createElement("i");
        moveIconContent.setAttribute('class', 'fa-solid fa-arrows-up-down-left-right');
        /*Création du bouton "Supprimer"*/
        const supprimIcon = document.createElement("span");
        const supprimIconContent = document.createElement("i");
        supprimIconContent.setAttribute('class','fa-solid fa-trash-can' )

     
        /*On rattache la balise figure à la section gallery*/
        miniGalery.appendChild(minBlocElement);        
        /*On rattache l’image et sa description à la balise figure*/
        minBlocElement.appendChild(minImageElement);
        minBlocElement.appendChild(minNomElement);        
        /*On rattache l'icone de déplacement et on lui attribut une classe*/ 
        minBlocElement.appendChild(moveIcon);
        moveIcon.appendChild(moveIconContent);
        moveIcon.setAttribute('class', 'moveIcon');        
        /*Rattachement de l'icone "supprimer" et on lui attribut une classe*/
        minBlocElement.appendChild(supprimIcon);
        supprimIcon.appendChild(supprimIconContent);
        supprimIcon.setAttribute('class','trashIcon');

        /*Ajout d'un évènement "mouseover" pour afficher l'icone de déplacement*/
        minBlocElement.addEventListener("mouseover", function () {
        moveIcon.style.display = "block";
        });
        /*Ajout d'un évènement "mouseout" pour cacher l'icone de déplacement*/
        minBlocElement.addEventListener("mouseout", function () {
        moveIcon.style.display = "none";
        });
     };     
 } 

 /*Permet l'affichage de la galerie de la modale*/ 
 genererMiniImages(images);


// Vérification du token de la session
let userSessionId = sessionStorage.getItem("id");
let userSessionToken = sessionStorage.getItem("token");

// Ouverture du mode édition si la session est bien composée d'un Id et d'un Token
userSessionId && userSessionToken ? editorMode() : "";

function editorMode() {
    //Apparition des div de modification ainsi que du bandeau du haut
    document.querySelectorAll(".connected").display = "block";
    //Disparition des filtres
    document.querySelector(".filtres").display = "none";
    //Changement du logIn et logOut
    styleLog = document.querySelectorAll("#loginBtn");
    styleLog[2].textContent = "logout";
}


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
styleLog = document.querySelector("#loginBtn");

// en fonction de l'état connecté ou non connecté
userSessionId && userSessionToken ? styleLog[2].addEventListener("click", linkLogout) : styleLog[2].addEventListener("click", linkLogin);