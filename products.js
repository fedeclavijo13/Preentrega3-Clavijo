const productos = [
    {
       id: 1,
       productName: "El Castigador - Máquina de guerra",
       description: "“Frank Castle: Máquina de Guerra”. En su guerra, El Castigador siempre ha estado limitado por el hecho de ser un único hombre. Pero ahora Frank tiene a su disposición las herramientas para hacer que su misión tenga carácter global. ¿Cómo va a negarse?",
       cost: 350,
       imgSrc: "resources/prod1.jpg"
    },
    {
       id: 2,
       productName: "Spiderman vs Morbius",
       description: "Ante el salto a la gran pantalla de Morbius, te ofrecemos un volumen que recoge algunas de sus aventuras más destacadas, como antagonista de Spiderman. Desde su debut, en la legendaria saga de los brazos extra, hasta sus más recientes historias, pasando por la particular visión que de Michael Morbius diera Todd McFarlane.",
       cost: 350,
       imgSrc: "resources/prod2.jpg"
    },
    {
        id: 3,
       productName: "Thor - El carnicero de dioses",
       description: "A lo largo de los siglos, los dioses han estado desapareciendo, lo que condena al caos a sus adoradores. Ahora, Thor sigue el rastro de sangre que amenaza con consumir su pasado, presente y futuro.",
       cost: 600,
       imgSrc: "resources/prod3.jpg"
    },
    {
        id: 4,
       productName: "Caballero Luna - Cuenta atrás hacia la oscuridad",
       description: "Mercenario, cazador de hombres lobo, millonario, taxista… ¿fantasma? Descubre al Caballero Luna desde su debut y hasta meterse de lleno en la más recordada de las épocas que viviera jamás, en que se convirtió en una referencia indiscutible del cómic estadounidense.",
       cost: 600,
       imgSrc: "resources/prod4.jpg"
    },
    {
        id: 5,
       productName: "Ms. Marvel - Fuera de lo normal",
       description: "¡La edición completa de la obra maestra de Busiek y Ross! Un emocionante recorrido por los momentos que sirvieron para forjar el Universo Marvel bajo la visión única del fotógrafo Phil Sheldon. Desde los orígenes de los superhéroes a la trágica muerte de Gwen Stacy, de la llegada de Galactus a la Guerra Kree-Skrull, de la irrupción de los mutantes a la boda de Reed Richards y Sue Storm… ¡Los Prodigios están aquí!",
       cost: 350,
       imgSrc: "resources/prod5.jpg"
    },
    {
        id: 6,
       productName: "Daredevil - El hombre sin miedo",
       description: "¡El Hombre Sin Miedo consigue su primer Omnigold! Descubre las aventuras de Daredevil desde el principio, en un cuidado volumen que recoge los dos primeros años de su existencia, con la presentación de algunos de sus peores villanos.",
       cost: 600,
       imgSrc: "resources/prod6.jpg"
    }
 ]

const getJSONData = (key, value) => { localStorage.setItem(key, value) };
for (const product of productos) {
    getJSONData("listaProductos", JSON.stringify(productos))
}

let productsLS = localStorage.getItem("listaProductos")
let productsData = JSON.parse(productsLS)
let currentProductsArray = []
let minCost = undefined
let maxCost = undefined

function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `<div class="col">
            <div class="card">
                <div class="comic-image text-center">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class = "img-thumbnail">
                </div>
                <div class="card-details">
                    <h4><a href="#">` + product.productName + `</a></h4>
                    <p>` + product.description + `</p>
                    <div class="card-bottom-details d-flex justify-content-end">
                        <div class="card-cost">$` + product.cost + `</div>
                    </div>
                </div>
            </div>
        </div>`
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    currentProductsArray = productsData
    showProductsList()
});

    document.getElementById("sortAsc").addEventListener("click", function () {
        productsData.sort((a, b) => {
            if (a.productName.toLowerCase() < b.productName.toLowerCase()) {
                return -1
            }
            if (a.productName.toLowerCase() > b.productName.toLowerCase()) {
                return 1
            }
            return 0
        })
        currentProductsArray = productsData
        showProductsList()
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        document.getElementById("prod-list-container").innerHTML = ""
        let productsSortedDesc = productsData.sort((a, b) => {
            if (a.productName.toLowerCase() < b.productName.toLowerCase()) {
                return 1
            }
            if (a.productName.toLowerCase() > b.productName.toLowerCase()) {
                return -1
            }
            return 0
        })
        currentProductsArray = productsSortedDesc
        showProductsList();
    });

    document.getElementById('rangeFilterCost').addEventListener('click', function () {
        minCost = document.getElementById('rangeFilterCostMin').value;
        maxCost = document.getElementById('rangeFilterCostMax').value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList();
    })

    document.getElementById('clearRangeFilter').addEventListener('click', function () {
        document.getElementById('rangeFilterCostMin').value = "";
        document.getElementById('rangeFilterCostMax').value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    function searchProduct(query){
        let resultsList = document.querySelector(".result")
        resultsList.innerHTML = ""

        productos.map(function(e){
            query.split(" ").map(function (word){
                if(e.toLowerCase().indexOf(word.toLowerCase()) != -1){
                    resultsList.innerHTML += `<li class="list-group-item">${algo}</li>`
                }
            })
        })
    }