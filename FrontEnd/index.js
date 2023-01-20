const reponse = await fetch('http://localhost:5678/api/works');
const images = await reponse.json();

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
//genererImages(images);


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

