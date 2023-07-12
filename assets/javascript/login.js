let loginButton = document.getElementById('login');
let loginForm = document.getElementById('login-Form');
let signupButtom = document.getElementById('signup');

loginButton.addEventListener('click', () => {
    loginForm.style.left = "-50%";
});

signupButtom.addEventListener('click', () => {
    loginForm.style.left = "0";
});

  // login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário
    const username = document.getElementById('nome').value;
    const password = document.getElementById('senha').value;

  
    // Redireciona para a página de eventos
    window.location.href = 'listaEvento.html';
  });
})
