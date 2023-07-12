window.onload = () => {
  const eventosDiv = document.getElementById('eventos');

  fetch('//localhost:3000/eventos')
    .then(response => response.json())
    .then(eventos => {
      eventos.forEach(evento => {
        const eventoDiv = document.createElement('div');
        eventoDiv.classList.add('evento-container');

        const idP = document.createElement('p');
        idP.textContent = `ID: ${evento._id}`;
        eventoDiv.appendChild(idP);

        const nomeP = document.createElement('p');
        nomeP.textContent = `Nome: ${evento.nome}`;
        eventoDiv.appendChild(nomeP);

        const button = document.createElement('button');
        button.textContent = 'Participar';
        button.addEventListener('click', () => {
          const nomeUsuario = document.getElementById('inputNomeUsuario').value;
          const nomeEvento = evento.nome;

          const data = { nomeUsuario: nomeUsuario, nomeEvento: nomeEvento };

          fetch('//localhost:3000/relacionamento/criar-relacionamento', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.text())
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.error('Erro ao criar relacionamento:', error);
            // Faça aqui o tratamento de erro adequado
          });
        });

        eventoDiv.appendChild(button);

        eventosDiv.appendChild(eventoDiv);
      });
    })
    .catch(error => {
      console.error('Erro ao listar os eventos:', error);
    });
};
