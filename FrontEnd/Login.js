/*DEBUT DU LOGIN*/

/*On déclare nos variables*/
let inputEmail = document.querySelector('#signin-email');
let inputPassword = document.querySelector('#signin-password');
let errorMessage = document.querySelector('#errorMsg');
//
const submitBtn = document.querySelector('input[type="submit"]');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    errorMessage.innerHTML = "";
    let userEmail = document.querySelector('#signin-email').value;
    let userPassword = document.querySelector('#signin-password').value;
    console.log(userEmail+userPassword);
    logIn(userEmail,userPassword);
});
//
function logIn(email,password) {
    fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            email: email,
            password: password
        })
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(value){
        let msgLog = "";
        let userId = value.id;
        let userToken = value.token;
        /*C'est là qu'on compare les 2 strings (mail+mdp) à l'ID enregistré+ son token*/
        userId !== null && userToken != null ? storeTkn(userId, userToken) : msgLog = "Erreur dans l’identifiant ou le mot de passe";        
        errorMessage.innerHTML += msgLog;        
    })
    .catch(function(err) {        
        console.log(err);
    })    
};
/*Storage du token*/
function storeTkn(id, token) {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("token", token);    
    window.location.href = "index.html";
};
/*RAZ du message d'erreur*/
inputEmail.addEventListener('click', () => {
    errorMessage.textContent = '';
});
inputPassword.addEventListener('click', () => {
    errorMessage.textContent = '';
});

/*FIN DU LOGIN*/


/*Retour vers les projets depuis la page LogIn*/
const loginToProjet = document.querySelectorAll("#retPortfolio");
function linkProjets() {
    window.location.href = "index.html#portfolio";
};
loginToProjet[0].addEventListener('click', linkProjets);

/*Retour vers le formulaire de contact depuis la page LogIn*/
const loginToContact = document.querySelectorAll("#retContact");
function linkContact() {
    window.location.href = "index.html#contact";
};
loginToContact[0].addEventListener('click', linkContact);