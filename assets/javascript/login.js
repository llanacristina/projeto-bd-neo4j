let loginButton = document.getElementById('login');
let loginForm = document.getElementById('loginForm');
let signupButtom = document.getElementById('signup');

loginButton.addEventListener('click', () => {
    loginForm.style.left = "-50%";
});

signupButtom.addEventListener('click', () => {
    loginForm.style.left = "0";
});