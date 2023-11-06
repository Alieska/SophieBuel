let emailForm = document.getElementById('email').value
let passwordForm = document.getElementById('MDP').value
const formLogin = document.getElementById('submitForm')

addEventListener("submit", (Event) => {
	Event.preventDefault()
	console.log(emailForm)
	console.log(passwordForm)
    const login = "http://localhost:5678/api/users/login"
    fetch(login,{
        method: "post",
        body: JSON.stringify({
            email : emailForm,
            password : passwordForm,
        })
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err)})
})