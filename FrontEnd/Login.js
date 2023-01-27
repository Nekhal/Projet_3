/*DEBUT DU LOGIN*/

/*On déclare nos variables*/
let inputEmail = document.querySelector('#signin-email');
let inputPassword = document.querySelector('#signin-password');
let msgLogDiv = document.querySelector('#errorMsg');

const submitBtn = document.querySelector('#signin-btn-submit');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    msgLogDiv.innerHTML = "";
    const userEmail = document.querySelector('#signin-email').value;
    const userPassword = document.querySelector('#signin-password').value;    
    logIn(userEmail,userPassword);
});

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
        }
        )
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(value){
        let msgLog = "";
        let userId = value.id;
        let userToken = value.token;
        // On vérifie que la combinaison email+password correspond bien à un id et un token
        userId !== null && userToken != null ? storeTkn(userId, userToken) : msgLog = "Erreur dans l’identifiant ou le mot de passe";
        // Sinon on affiche un message d'erreur
        msgLogDiv.innerHTML += msgLog;
        // vérification
    })
    .catch(function(err) {
        // message d'erreur
        console.log(err);
    })
};

// mise en storage du token
function storeTkn(id, token) {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("token", token);
    // alert(id+"/"+token);
    window.location.href = "index.html";
};

// Au click dans un des deux input de login on clean la div de message d'erreur de connexion
inputEmail.addEventListener('click', () => {
    msgLogDiv.textContent = '';
});

inputPassword.addEventListener('click', () => {
    msgLogDiv.textContent = '';
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
    window.location.href = "index.html#footer";
};
loginToContact[0].addEventListener('click', linkContact);