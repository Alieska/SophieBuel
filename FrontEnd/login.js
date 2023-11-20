let emailUser = document.getElementById('email')
let MDPuser = document.getElementById('MDP')
const messageErreurLogin = document.querySelector(".messageErreurLogin")
const submitLogin = document.querySelector(".submitLogin")

//Vérification email et MDP sur formulaire de LogIn
submitLogin.addEventListener('click', (Event)=>{
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
    .then (async (response) => { 
        console.log (response)
        if (response.status === 200) {
            const responseLogin = await response.json ()
            console.log(responseLogin)
            console.log(responseLogin.token)
            const token = responseLogin.token
            window.sessionStorage.setItem("token",token)
            window.location.href="index.html"
        }
        else {
            messageErreurLogin.innerText = "Erreur dans l’identifiant ou le mot de passe"            
        } } ) 
    })

