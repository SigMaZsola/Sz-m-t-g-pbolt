const specs = {};
const products = [];

const comparing = [];

const cardContainer = document.getElementById("card-container");
const compBtn = document.getElementsByClassName("comp");
const comparefield = document.getElementById("comcont");
async function loadData() {
    try {
        const specsResponse = await fetch('specs.txt');
        const specsText = await specsResponse.text();
        const specsLines = specsText.trim().split('\n');
        
        specsLines.forEach(line => {
            if (line.trim() === "") return;
            const parts = line.split('#');
            if (parts.length !== 2) return;
            
            const faj = parts[0].trim();
            const ertek = parts[1].trim();
            specs[faj] = {};
            
            const params = ertek.split(';');
            params.forEach(param => {
                const [k, v] = param.split(':').map(p => p.trim());
                if (k && v) specs[faj][k] = v;
            });
        });

        const srcResponse = await fetch('src.txt');
        const srcText = await srcResponse.text();
        const srcLines = srcText.trim().split('\n');
        
        srcLines.forEach(line => {
            if (line.trim() === "") return;
            const parts = line.split(';').map(p => p.trim());
            if (parts.length < 7) return;
            
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

        console.log("Specs:", specs);
        console.log("Products:", products);

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function motherBoard(){
    displayData("motherboard")
}
function cpu(){
    displayData("cpu")

}

function memory(){
    displayData("memory")
}

function gpu(){
    displayData("gpu")
}

function harddrive(){
    displayData("harddrive")
}

function monitor(){
    displayData("monitor")
}

function mouse(){
    displayData("mouse")
}

function keyboard(){
    displayData("keyboard")
}


function displayData(faj) {
    cardContainer.innerHTML = "";

    products.forEach(termek => {

        if (faj === termek.type.toLowerCase()) {
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
                
                <button class="toggle-info">Tovább...</button>
                <button class="compare-button">Összehasonlítt</button>
                <div class="extra-info" style="display: none;">
                    <p>Specifikációk: ${termek.spec1}, ${termek.spec2}</p>
                </div>
            `;


            const toggleButton = card.querySelector(".toggle-info");
            toggleButton.addEventListener("click", () => {
                const extraInfo = card.querySelector(".extra-info");
                extraInfo.style.display = extraInfo.style.display === "none" ? "block" : "none";
                toggleButton.innerText = extraInfo.style.display === "none" ? "Tovább..." : "Kevesebb...";
            });


            const compareButton = card.querySelector(".compare-button");
            compareButton.addEventListener("click", () => {
                comparing.push(termek);
                console.log("Összehasonlít:", comparing);
                compareProducts()
            });

            cardContainer.appendChild(card);
        }
    });
}

async function compareProducts(){
    comparefield.innerHTML = " ";
        comparing.forEach(termek => {
            let card = document.createElement("div");
            card.classList.add("termek");
            card.classList.add("col-lg-6");
            card.innerHTML = `
                <h3>${termek.marka} ${termek.modell}</h3>
                <p>Ár: ${termek.ar} Ft</p>
                <p>Típus: ${termek.type}</p>
                
                <div class="extra-info" style="display: none;">
                    <p>Specifikációk: ${termek.spec1}, ${termek.spec2}</p>
                </div>
            `;
            comparefield.appendChild(card)
        })
    
}

loadData();