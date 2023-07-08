let loginButton = document.getElementById('login');
let loginForm = document.getElementById('login-Form');
let signupButtom = document.getElementById('signup');

loginButton.addEventListener('click', () => {
    loginForm.style.left = "-50%";
});

signupButtom.addEventListener('click', () => {
    loginForm.style.left = "0";
});


document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    cadastrarUsuario(nome, email, senha);
  });
  
  async function cadastrarUsuario(nome, email, senha) {
    try {
      const response = await fetch('//localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });
  
      if (response.ok) {
        const usuario = await response.json();
        console.log(usuario);
        window.location.href = '/login.html';
      } else {
        console.error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error(error);
    }
  }

  window.onload = () => {
  const eventosDiv = document.getElementById('eventos');
  const formLogin = document.getElementById('loginForm');

  formLogin.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário
    
    fetch('//localhost:3000/eventos')
      .then(response => response.json())
      .then(eventos => {
        eventosDiv.innerHTML = '';

        eventos.forEach(evento => {
          const eventoDiv = document.createElement('div');
          eventoDiv.classList.add('evento-container');

          const idP = document.createElement('p');
          idP.textContent = `ID: ${evento._id}`;
          eventoDiv.appendChild(idP);

          const nomeP = document.createElement('p');
          nomeP.textContent = `Nome: ${evento.nome}`;
          eventoDiv.appendChild(nomeP);
          
          eventosDiv.appendChild(eventoDiv);
        });
      })
      .catch(error => {
        console.error('Erro ao listar os eventos:', error);
      });
  });
};