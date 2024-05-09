// Funzione generale per ottenere immagini
const fetchImages = function (query) {
    let URL = `https://api.pexels.com/v1/search?query=${query}`;
  
    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: "Bearer TrLqRmP9ZNx1DQHA1QZHQWc2565S4bFU3AiNBpvjPZRRiBRSFYwYsLie"
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Riceviamo l'oggetto JSON
      } else {
        throw new Error('Errore nella risposta del server');
      }
    })
    .then((data) => {
      if (data.photos.length === 0) {
        console.log(`Nessuna immagine trovata per la query: ${query}`);
        return;
      }
  
      console.log('ARRAY!', data); // Verifica la struttura dell'oggetto
      const arrayOfImages = data.photos; // Estrai l'array 'photos'
      const row = document.getElementById('events-row');
      row.innerHTML = ''; // Pulisci il contenuto precedente
  
      arrayOfImages.forEach((image) => {
        const newCol = document.createElement('div');
        newCol.classList.add('col');
        newCol.innerHTML = `
          <div class="card h-100 d-flex flex-column">
          <a href=""><img src="${image.src.medium}" alt="${image.photographer}" style="height: 200px; width: 100%;"></a>
            <div class="card-body d-flex flex-column justify-content-around">
              <h5 class="card-title">${image.id}</h5>
              <p class="card-text">${image.photographer}</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-primary buttonHide">Hide</button>
                <a href="detailsImg.html?imgId=${image.id}" class="btn btn-info">INFO</a>
              </div>
            </div>
          </div>
        `;
        row.appendChild(newCol);

        const hideButton = newCol.querySelector(".buttonHide");
        hideButton.addEventListener("click", function () {
                    newCol.classList.add("d-none");
                });
        


      });
    })
    .catch((err) => {
      console.log('ERRORE!', err);
    });
  };
  
  // Funzione per determinare se caricare gatti o cani
  const loadImages = function (isCats) {
    if (isCats) {
      fetchImages('cats');
    } else {
      fetchImages('dogs');
    }
  };
  
  // Assegna l'evento click al pulsante "secondButton"
  document.getElementById("secondButton").addEventListener('click', function () {
    loadImages(false); // Carica le immagini dei cani
  });

    // Assegna l'evento click al pulsante "secondButton"
    document.getElementById("firstButton").addEventListener('click', function () {
        loadImages(true); // Carica le immagini dei cani
      });
  
  // Carica le immagini dei gatti all'inizio
  loadImages(true);
  