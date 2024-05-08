const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books", {})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("La risorsa richiesta non è stata trovata");
        } else if (response.status === 500) {
          throw new Error("La risposta del server è stata negativa");
        }
      }
    })
    .then((arrayOFBooks) => {
      const row = document.getElementById("row");
      const carrello = document.getElementById("carrello");
      const totaleCart = document.getElementById("totaleCart");
      const priceBooks = [];
      const cartBooks = [];

      arrayOFBooks.forEach((book) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col", "col-3");
        newCol.innerHTML = `<div class="card my-5 border-black " style="width: 18rem;">
                        <img src="${book.img}" class="card-img-top" style="height: 400px;" alt="immagine copertina libro">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-center" style="min-height: 100px">${book.title}</h5>
                            <p class="card-text text-center fw-bold">Price ${book.price}</p>
                            <div class="text-center">
                                <button class="btn btn-primary scarta-button">SCARTA</button>
                                <button class="btn btn-primary compra-button">COMPRA ORA</button>
                            </div>
                        </div>
                    </div>`;
        row.appendChild(newCol);

        const scartaButton = newCol.querySelector(".scarta-button");
        scartaButton.addEventListener("click", function () {
          newCol.classList.add("d-none");
        });

        const compraButton = newCol.querySelector(".compra-button");

        compraButton.addEventListener("click", function () {
          const currentBook =
            this.parentElement.parentElement.querySelector(
              ".card-title"
            ).textContent;
          const newLi = document.createElement("li");
          newLi.innerHTML = `${currentBook}- ${book.price}<span> Euro</span>
                                    <button class="btn btn-danger deleteCart">X</button>`;
          carrello.appendChild(newLi);
          priceBooks.push(book.price);
          cartBooks.push(currentBook, book.price);
          const savedCart = localStorage.setItem(
            "totalCart",
            JSON.stringify(cartBooks)
          );

          const totalPrice = priceBooks.reduce((total, price) => total + price);
          totaleCart.innerHTML = "Totale : " + totalPrice.toFixed(2);

          const deleteFromCart = newLi.querySelector(".deleteCart");
          deleteFromCart.addEventListener("click", function () {
            const index = cartBooks.indexOf(currentBook);
            if (index !== -1) {
              cartBooks.splice(index, 2); // Rimuovi sia il titolo che il prezzo (che sono posti adiacenti nell'array)
              priceBooks.splice(index, 1);
              localStorage.setItem("totalCart", JSON.stringify(cartBooks)); // Aggiorna il localStorage
            }

            carrello.removeChild(newLi);

            // Ricalcolo il totale aggiornato senza l'articolo eliminato
            const totalPrice = priceBooks.reduce(
              (total, price) => total + price
            );
            totaleCart.innerHTML = "Totale : " + totalPrice.toFixed(2);
          });
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getBooks();
