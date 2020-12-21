
let email = document.getElementById('email');
let password = document.getElementById('password');
let form = document.getElementById('signup');




form.addEventListener("submit", function (e) {
    e.preventDefault();
    let myForm = {
        "email": email.value,
        "password": password.value

    }
    signup(myForm);
})


function signup(myForm) {
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myForm)
    }
    fetch("http://localhost:3000/api/auth/signup", requestOptions)
        .then(response => response.json())
        .then(signup => {
            console.log(myForm)
            console.log("Utilisateur créé!")
            document.location = 'login.html';
        });

}

