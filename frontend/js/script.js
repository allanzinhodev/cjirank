// Função para buscar os lutadores da API
async function fetchFighters() {
    try {
      const response = await fetch('http://localhost:3001/api/fighters');
      const fighters = await response.json();
      displayFighters(fighters);
    } catch (error) {
      console.error("Erro ao carregar os lutadores:", error);
    }
  }
  
  // Função para exibir os lutadores na tela
  function displayFighters(fighters) {
    const container = document.getElementById('fighters-container');
    
    fighters.forEach(fighter => {
      const card = `
        <div class="col-md-4">
          <div class="card mb-4">
            <img src="img/${fighter.id}.png" class="card-img-top" alt="${fighter.name}">
            <div class="card-body">
              <h5 class="card-title">${fighter.name}</h5>
              <p class="card-text"><strong>Equipe:</strong> ${fighter.team}</p>
              <p class="card-text"><strong>País:</strong> ${fighter.country}</p>
              <p class="card-text"><strong>Idade:</strong> ${fighter.age} anos</p>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  }
  
  // Carrega os lutadores quando a página é aberta
  document.addEventListener('DOMContentLoaded', fetchFighters);
  