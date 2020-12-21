let email = document.getElementById('email');
let password = document.getElementById('password');
let form = document.getElementById('login');



form.addEventListener("submit", function (e) {
    e.preventDefault();
    let myForm = {
        "email": email.value,
        "password": password.value

    }
    login(myForm);
})


function login(myForm) {
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myForm)
    }
    fetch("http://localhost:3000/api/auth/login", requestOptions)
        .then(response => response.json())

}



