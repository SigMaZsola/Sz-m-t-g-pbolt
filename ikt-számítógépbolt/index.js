const specs = {};
const products = [];

const compareing = [];

const cardContainer = document.getElementById("card-container");

async function loadData() {
    const specsResponse = await fetch('specs.txt');
    const specsText = await specsResponse.text();
    const specsLines = specsText.split('\n');
    specsLines.forEach(line => {
        const parts = line.split('#');
        const faj = parts[0];
        const ertek = parts[1];
        specs[faj] = {};
        const params = ertek.split(';');
        params.forEach(param => {
            const [k, v] = param.split(':');
            specs[faj][k] = v;
        });
    });

    const srcResponse = await fetch('src.txt');
    const srcText = await srcResponse.text();
    const srcLines = srcText.split('\n')
    srcLines.forEach(line => {
        const parts = line.split(';');
        const product = {
            id: parts[0],
            type: parts[1],
            marka: parts[2],
            modell: parts[3],
            ar: parts[4],
            spec1: parts[5],
            spec2: parts[6],
        };
        products.push(product);
    });
    console.log(products)
    displayData()
}




async function displayData(){
    products.forEach(termek => {
        let card = document.createElement("div");
        card.classList.add("termek");
        card.classList.add("col-md-3");

        switch (termek.marka.toLowerCase()) {
            case "amd":
                card.classList.add("amd");
                break;
            case "intel":
                card.classList.add("intel");
                break;
            case "nvidia":
                card.classList.add("nvidia");
                break;
            default:
                card.classList.add("default");
                break;
        }
        card.innerHTML = `
            <h3>${termek.marka} ${termek.modell}</h3>
            <p>Ár: ${termek.ar} Ft</p>
            <p>Típus: ${termek.type}</p>
            <p>Specifikációk: ${termek.spec1}, ${termek.spec2}</p>
            <button>Tovább...</button>
            <div class="extra-info" style="display: none;">
                <p>Részletes információk a termékről: Itt lesz több szöveg a termékről.</p>
            </div>
        `;

        const button = card.querySelector("button");
        
        button.addEventListener("click", () => {
            const extraInfo = card.querySelector(".extra-info");
            extraInfo.style.display = extraInfo.style.display === "none" ? "block" : "none";
            if (extraInfo.style.display === "none") {
                button.innerText = "Tovább...";
            } else {
                button.innerText = "Kevesebb...";
            }
        });

        card.addEventListener("click", () => {
            compareing.push(card.innerHTML)
            
        })

        cardContainer.appendChild(card);
    });
}


loadData();