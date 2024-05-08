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

            
            const savedCart = localStorage.getItem("totalCart");
            if (savedCart) {
                const savedItems = JSON.parse(savedCart); //Converte la stringa JSON recuperata in un array JavaScript.
                for (let i = 0; i < savedItems.length; i += 2) {//Itera sull'array recuperato, presupponendo che ogni libro sia salvato come coppia [title, price]
                    const bookTitle = savedItems[i];//Per ogni iterazione, aggiunge il titolo (bookTitle) e il prezzo (bookPrice) agli array cartBooks e priceBooks, rispettivamente.
                    const bookPrice = savedItems[i + 1];
                    cartBooks.push(bookTitle, bookPrice);
                    priceBooks.push(bookPrice);
                }
                updateCartUI();
            }

            function updateCartUI() {
                carrello.innerHTML = '';
                cartBooks.forEach((book, index) => {
                    if (index % 2 === 0) { //Filtra i titoli e i prezzi, assicurandosi che index % 2 === 0 (poiché ogni coppia è [title, price]).
                        const bookTitle = book;
                        const bookPrice = cartBooks[index + 1];
                        const newLi = document.createElement("li");
                        newLi.innerHTML = `${bookTitle} - ${bookPrice} Euro <button class="btn btn-danger deleteCart">X</button>`;
                        carrello.appendChild(newLi);

                        const deleteFromCart = newLi.querySelector(".deleteCart");
                        deleteFromCart.addEventListener("click", function () {
                            cartBooks.splice(index, 2);
                            priceBooks.splice(index / 2, 1);
                            localStorage.setItem("totalCart", JSON.stringify(cartBooks));
                            updateCartUI();
                        });
                    }
                });
                const totalPrice = priceBooks.reduce((total, price) => total + price, 0);
                totaleCart.innerHTML = "Totale : " + totalPrice.toFixed(2);
            }

            arrayOFBooks.forEach((book) => {
                const newCol = document.createElement("div");
                newCol.classList.add("col", "col-3");
                newCol.innerHTML = `<div class="card my-5 border border-white bg-dark text-white  " style="width: 18rem;">
                                    <img src="${book.img}" class="card-img-top" style="height: 400px;" alt="immagine copertina libro">
                                    <div class="card-body ">
                                        <h5 class="card-title fw-bold text-center" style="min-height: 100px">${book.title}</h5>
                                        <p class="card-text text-center fw-bold fs-4">Price ${book.price}</p>
                                        <div class="text-center">
                                            <button class="btn btn-danger scarta-button">SCARTA</button>
                                            <button class="btn btn-success compra-button">COMPRA ORA</button>
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
                    const currentBook = this.parentElement.parentElement.querySelector(".card-title").textContent;
                    const bookPrice = book.price;
                    cartBooks.push(currentBook, bookPrice);
                    priceBooks.push(bookPrice);
                    localStorage.setItem("totalCart", JSON.stringify(cartBooks));
                    updateCartUI();
                });
            });
        })
        .catch((err) => {
            console.log("ERRORE", err);
        });
};

getBooks();
