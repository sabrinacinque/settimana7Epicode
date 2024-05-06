const petName = document.getElementById("petName");
const ownerName = document.getElementById("ownerName");
const species = document.getElementById("species");
const breed = document.getElementById("breed");
const formTag = document.getElementsByTagName('form')[0]

const pets = []

class Pet {
    constructor (_petName,_ownerName,_species,_breed){
        this.petName = _petName
        this.ownerName = _ownerName
        this.species = _species
        this.breed = _breed
    }


    isOwnerTheSame = function(a, b) {
        if(a.ownerName.toUpperCase() === b.ownerName.toUpperCase()) {
            return "Il " + a.species + " di nome " + a.petName + " e il " + b.species + " di nome " + b.petName + " hanno lo stesso padrone"
        } else {
            return "Il " + a.species + " di nome " + a.petName + " e il " + b.species + " di nome "  + b.petName + " hanno padroni diversi"
        }
    }
}

//const pet1 = new Pet("kira", "Sabrina", "cane", "Meticcio");
//const pet2 = new Pet("Dylan", "Giovanni", "cane", "maremmano");

//console.log(pet1.isOwnerTheSame(pet1, pet2));

const updatePets = function () {
    const petsRow = document.getElementById('pets-row')
    petsRow.innerHTML = ''
    pets.forEach((pet) => {
      const newDiv = document.createElement('div')
      newDiv.classList.add('col')
      newDiv.innerHTML = `
          <div class="card">
              <div class="card-body">
                <h3>Pet information:</h3>
                <ul>
                   <li>Name : ${pet.petName}</li>
                   <li>Owner name :${pet.ownerName}</li>
                   <li>Species : ${pet.species}</li>
                   <li>Breed : ${pet.breed}</li>
                </ul>
              </div>
          </div>
      `
      // appendo ora la col alla row
      petsRow.appendChild(newDiv)
    })
  }
  
  // ora occupiamoci dell'evento di submit del form
  formTag.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const petValues = new Pet(
      petName.value.trim(),
      ownerName.value.trim(),
      species.value.trim(),
      breed.value.trim()  
    )
  
    pets.push(petValues);
  
    petName.value = "";
    ownerName.value = "";
    species.value = "";
    breed.value = "";
  
    updatePets();
  });
  const petName1 = document.getElementById("petName1");
  const petName2 = document.getElementById("petName2");
  const formTagConfronto = document.getElementsByTagName('form')[1]
  
  formTagConfronto.addEventListener('submit', function (e) {
    e.preventDefault();

    //Una volta trovati gli oggetti pet corrispondenti, possiamo accedere alle proprietà di quegli oggetti, 
    //come il nome del proprietario, poiché ciascun oggetto pet ha queste informazioni memorizzate al suo interno.
  
    const petName1Value = petName1.value.trim();//trim è per togliere gli eventuali spazi bianchi
    const petName2Value = petName2.value.trim();

    /*Cerchiamo gli oggetti pet corrispondenti nell'array pets utilizzando i valori dei nomi dei pet.
     Utilizziamo il metodo find() per cercare l'oggetto pet che ha lo stesso nome del pet inserito nel campo del form.
     Una volta trovati gli oggetti pet corrispondenti (pet1 e pet2), possiamo accedere alle proprietà di quegli oggetti, 
     come il nome del proprietario, utilizzando la notazione punto. Ad esempio, pet1.ownerName ci dà il nome del proprietario del primo pet.*/ 
  
    const pet1 = pets.find(pet => pet.petName === petName1Value);
    const pet2 = pets.find(pet => pet.petName === petName2Value);
  
    if (pet1 && pet2) {
      const result = pet1.isOwnerTheSame(pet1, pet2);
      document.getElementById('risultato').textContent = result;
      petName1.value = "";
      petName2.value = "";
      
    } else {
      // Se uno o entrambi i pet non sono stati trovati nell'array pets
      let errorMessage = "Controlla di aver registrato entrambi i pet prima di effettuare il confronto.";
      if (!pet1 && !pet2) {
        errorMessage = "I pet inseriti non sono stati ancora registrati";
      } else if (!pet1) {
        errorMessage = `Il pet "${petName1Value}" non è stato ancora registrato.`;
      } else {
        errorMessage = `Il pet "${petName2Value}" non è stato ancora registrato.`;
      }
      document.getElementById('risultato').textContent = errorMessage;
      petName1.value = "";
      petName2.value = "";
    }
  });
  
  




