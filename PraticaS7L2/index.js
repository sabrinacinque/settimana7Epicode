let saveButton = document.getElementById("saveButton");
let deleteButton = document.getElementById("deleteButton");
let nome = document.getElementById("name");
let nomeValue = nome.value;

nome.addEventListener("input", function () {
    let nomeValue = nome.value;
    if (nomeValue.trim() !== "") {
        saveButton.removeAttribute("disabled");
    } else {
        saveButton.setAttribute("disabled", "disabled");
    }
});


saveButton.addEventListener("click", function () {
  let nomeValue = nome.value;

  if (nomeValue !== "") {
    localStorage.setItem("valoreNome", nomeValue);
    console.log("Nome salvato:", nomeValue);

    let riprendiNome = localStorage.getItem("valoreNome");
    console.log(riprendiNome);
    let risultato = document.getElementById("risultato");
    risultato.textContent = "il nome salvato è : " + riprendiNome;
    nome.value = "";
    saveButton.setAttribute("disabled", "disabled")
    deleteButton.removeAttribute("disabled");
  }
});

deleteButton.addEventListener("click", function () {
    localStorage.removeItem("valoreNome");
    risultato.textContent = "";
    deleteButton.setAttribute("disabled", "disabled");
});

function updateCounter() {
  var counterElement = document.getElementById("counter");
  var currentTime = sessionStorage.getItem("counterValue");
  var counterValue;
  if (currentTime) {
    counterValue = parseInt(currentTime);
  } else {
    counterValue = 0;
  }
  counterElement.textContent = "Tempo trascorso: " + counterValue + " secondi";
  counterValue++;
  sessionStorage.setItem("counterValue", counterValue);
}

// Chiamata alla funzione all'avvio e aggiornamento ogni secondo
updateCounter();
setInterval(updateCounter, 1000);
