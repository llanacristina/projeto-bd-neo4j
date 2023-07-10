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
  
            eventosDiv.appendChild(eventoDiv);
          });
        })
        .catch(error => {
          console.error('Erro ao listar os eventos:', error);
        });
  };