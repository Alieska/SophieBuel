let emailUser = document.getElementById('email')
let MDPuser = document.getElementById('MDP')
const messageErreur = document.querySelector(".messageErreur")
const navLogout = document.querySelector(".navLogout")
const navLogin = document.querySelector(".navLogin")
const bandeauEdition = document.querySelector(".bandeauEdition")

menuConnection ()

//Vérification email et MDP sur formulaire de LogIn
addEventListener('submit', (Event)=>{
    Event.preventDefault() 
    fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailUser.value,
            password: MDPuser.value,
        })
    })
    .then( (response) => { 
        console.log (response.status)
        if (response.status === 200) {
            const responseLogin = response.json ()
            console.log(responseLogin)
            window.sessionStorage.setItem("connexionUser","true")
            menuConnection ()
            window.location.href="index.html"
        }
        else {
            messageErreur.innerText = "Erreur dans l’identifiant ou le mot de passe"            
        } })    
    })

//Affichage menu logIn / logOut
function menuConnection () {
const connexionUser = window.sessionStorage.getItem("connexionUser")
if (connexionUser=== "true"){
	navLogin.classList.add("objetCache")
	navLogout.classList.remove("objetCache")
    bandeauEdition.classList.remove("objetCache")
	} else {
    navLogin.classList.remove("objetCache")
    navLogout.classList.add("objetCache") 
    bandeauEdition.classList.add("objetCache")   
    }
}

//Déconnection
navLogout.addEventListener ("click", function (event){
    event.preventDefault()
    window.sessionStorage.removeItem("connexionUser")
    console.log(window.sessionStorage.getItem("connexionUser"))
    menuConnection ()
})