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
  
// Obtém referência ao botão de login
const btnLogin = document.getElementById('btnLogin');

// Adiciona um evento de clique ao botão
btnLogin.addEventListener('click', () => {
  // Redireciona para a página de eventos
  window.location.href = '/crud.html';
});
