let emailUser = document.getElementById('email')
let MDPuser = document.getElementById('MDP')
let connexionUser = false

const messageErreur = document.querySelector(".messageErreur")

//Vérification email et MDP sur formulaire de LogIn
addEventListener('submit', (Event)=>{
    Event.preventDefault() 
    fetch ("http://localhost:5678/api//users/login", {
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
            connexionUser = true
            const token = response.token
            const userId = response.userId
            localStorage.setItem(userId, token)
            window.location.href="index.html"
        }
        else {
            messageErreur.innerText = "Erreur Email et/ou Mot de Passe" 
        } })
    
    console.log(emailUser.value)
    console.log(MDPuser.value)
    
    }
)





