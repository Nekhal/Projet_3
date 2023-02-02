// ---DEBUT DU CODE--- //

let inputEmail = document.querySelector('#email');
let inputPassword = document.querySelector('#password');

const msgLogError = document.querySelector('#errorMsg');

// Création de l'envoi rattaché au bouton Login
const loginBtn = document.querySelector('input[type="submit"]');
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
   msgLogError.innerHTML = "";
    let userEmail = document.querySelector('#email').value;
    let userPassword = document.querySelector('#password').value;    
    logIn(userEmail,userPassword);
});



// ---FONCTION LOGIN--- //

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

        // Vérifie que l'utilisateur est authentifié        
        if (userId !== null && userToken != null) {
            storeTkn(userId, userToken);
          } else {
            msgLog = "Oups, authentification impossible. Vérifiez votre mot de passe s'il vous plait.";
          }
        // Sinon on affiche un message d'erreur
        msgLogError.innerHTML += msgLog;        
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
    window.location.href = "index.html";
};

// Nettoyage du message d'erreur lors d'un clic dans un des champs de saisie
const inputFields = [inputEmail, inputPassword];
inputFields.forEach((field) => {
    field.addEventListener('click', () => {
        msgLogError.textContent = '';
    });
});

// ---FIN DE CODE--- //