window.onload = () => {
  const eventosDiv = document.getElementById('eventos');
  const btnListar = document.getElementById('btnListar');
  const btnPesquisar = document.getElementById('btnPesquisar');
  let listaVisivel = false;

  btnListar.addEventListener('click', () => {
    if (listaVisivel) {
      eventosDiv.innerHTML = '';
      listaVisivel = false;
    } else {
      // LISTAR os eventos
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

            const descricaoP = document.createElement('p');
            descricaoP.textContent = `Descrição: ${evento.descricao}`;
            eventoDiv.appendChild(descricaoP);

            const localP = document.createElement('p');
            localP.textContent = `Local: ${evento.local}`;
            eventoDiv.appendChild(localP);

            const dataInicioP = document.createElement('p');
            dataInicioP.textContent = `Data de Início: ${evento.dataDeInicio}`;
            eventoDiv.appendChild(dataInicioP);

            const dataTerminoP = document.createElement('p');
            dataTerminoP.textContent = `Data de Término: ${evento.dataDeTermino}`;
            eventoDiv.appendChild(dataTerminoP);

            eventosDiv.appendChild(eventoDiv);

            // Botão de DELETAR
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', () => {
              fetch(`//localhost:3000/eventos/${evento._id}`, { method: 'DELETE' })
                .then(response => response.text())
                .then(message => {
                  console.log(message); // Exibe a mensagem de sucesso ou erro no console
                  btnListar.click(); // Atualiza a lista de eventos
                })
                .catch(error => {
                  console.error(error);
                });
            });
            eventoDiv.appendChild(deleteButton);

            // Botão de ATUALIZAR
            const updateButton = document.createElement('button');
            updateButton.classList.add('update-button');
            updateButton.textContent = 'Atualizar';
            updateButton.addEventListener('click', () => {
              const modalContainer = document.getElementById('modalContainer');
              modalContainer.style.display = 'block';

              document.getElementById('inputNome').value = evento.nome;
              document.getElementById('inputDescricao').value = evento.descricao;
              document.getElementById('inputLocal').value = evento.local;
              document.getElementById('inputDataInicio').value = evento.dataDeInicio;
              document.getElementById('inputDataTermino').value = evento.dataDeTermino;

              const salvarBtn = document.getElementById('salvarBtn');
              salvarBtn.addEventListener('click', () => {
                const novoNome = document.getElementById('inputNome').value;
                const novaDescricao = document.getElementById('inputDescricao').value;
                const novoLocal = document.getElementById('inputLocal').value;
                const novaDataDeInicio = document.getElementById('inputDataInicio').value;
                const novaDataDeTermino = document.getElementById('inputDataTermino').value;

                const dadosAtualizados = {
                  nome: novoNome !== '' ? novoNome : evento.nome,
                  descricao: novaDescricao !== '' ? novaDescricao : evento.descricao,
                  local: novoLocal !== '' ? novoLocal : evento.local,
                  dataDeInicio: novaDataDeInicio !== '' ? novaDataDeInicio : evento.dataDeInicio,
                  dataDeTermino: novaDataDeTermino !== '' ? novaDataDeTermino : evento.dataDeTermino
                };

                fetch(`//localhost:3000/eventos/${evento._id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(dadosAtualizados)
                })
                  .then(response => response.text())
                  .then(message => {
                    console.log(message); // Exibe a mensagem de sucesso ou erro no console
                    btnListar.click(); // Atualiza a lista de eventos
                  })
                  .catch(error => {
                    console.error(error);
                  });

                modalContainer.style.display = 'none';
              });

              const cancelarBtn = document.getElementById('cancelarBtn');
              cancelarBtn.addEventListener('click', () => {
                modalContainer.style.display = 'none';
              });
            });
            eventoDiv.appendChild(updateButton);
          });

          listaVisivel = true;
        })
        .catch(error => {
          eventosDiv.textContent = 'Erro ao carregar eventos';
          console.error(error);
        });
    }
  });

  btnPesquisar.addEventListener('click', () => {
    const textSearch = prompt('Digite o termo de busca:');
    if (textSearch) {
      eventosDiv.innerHTML = 'Pesquisando...';

      fetch(`//localhost:3000/eventos/${textSearch}`)
        .then(response => response.json())
        .then(eventos => {
          eventosDiv.innerHTML = '';

          if (eventos.length === 0) {
            const mensagemP = document.createElement('p');
            mensagemP.textContent = 'Nenhum evento encontrado.';
            eventosDiv.appendChild(mensagemP);
          } else {
            eventos.forEach(evento => {
              const eventoDiv = document.createElement('div');
              eventoDiv.classList.add('evento-container');

              const idP = document.createElement('p');
              idP.textContent = `ID: ${evento._id}`;
              eventoDiv.appendChild(idP);

              const nomeP = document.createElement('p');
              nomeP.textContent = `Nome: ${evento.nome}`;
              eventoDiv.appendChild(nomeP);

              const descricaoP = document.createElement('p');
              descricaoP.textContent = `Descrição: ${evento.descricao}`;
              eventoDiv.appendChild(descricaoP);

              const localP = document.createElement('p');
              localP.textContent = `Local: ${evento.local}`;
              eventoDiv.appendChild(localP);

              const dataInicioP = document.createElement('p');
              dataInicioP.textContent = `Data de Início: ${evento.dataDeInicio}`;
              eventoDiv.appendChild(dataInicioP);

              const dataTerminoP = document.createElement('p');
              dataTerminoP.textContent = `Data de Término: ${evento.dataDeTermino}`;
              eventoDiv.appendChild(dataTerminoP);

              eventosDiv.appendChild(eventoDiv);
            });
          }
          listaVisivel = true;
        });
    }
  });
};
