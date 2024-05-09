// Funzione per ottenere il parametro imgId dall'URL
const getImgIdFromUrl = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('imgId');
};

const imgId = getImgIdFromUrl();

const getImgData = function () {
  fetch(`https://api.pexels.com/v1/search?query=cats/${imgId}`, {
      headers: {
          Authorization: "TrLqRmP9ZNx1DQHA1QZHQWc2565S4bFU3AiNBpvjPZRRiBRSFYwYsLie"
      }
  })
  .then((response) => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error("Errore nel recupero dei dettagli dell'immagine");
      }
  })
  .then((image) => {
    console.log('DETTAGLI IMMAGINE RECUPERATI', image);
    // Verifica che l'array "photos" sia definito nell'oggetto "image"
    if (image && image.photos && image.photos.length > 0) {
        // Prende la prima foto dall'array
        const firstPhoto = image.photos[0];
        // Ottiene il percorso dell'immagine della prima foto
        const imageUrl = firstPhoto.url;
        // Ottiene il nome del fotografo della prima foto
        const photographerName = firstPhoto.photographer;

        // Creazione della card utilizzando il template literal
        const cardTemplate = `
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="${photographerName}">
                <div class="card-body">
                    <h5 class="card-title">${photographerName}</h5>
                </div>
            </div>
        `;

        // Aggiungi la card al tuo DOM
        document.getElementById('photos-container').innerHTML = cardTemplate;
    } else {
        console.log('L\'array "photos" non è definito o è vuoto nell\'oggetto "image"');
    }
})
.catch((err) => {
    console.log('ERRORE', err);
});



}

getImgData();
