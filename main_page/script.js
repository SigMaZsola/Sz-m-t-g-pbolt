let SEARCH_TYPE = "ALL"

fetch("src/src.txt")
    .then((res) => res.text())
    .then((text) => {createItems(text)})
    .catch((e) => console.error(e));

const item_container = document.getElementById("items")

function createItems(text){
    let rows = text.split("\n")
    rows.forEach((line) => {createItem(line)})
}

function createItem(line){
    let split_txt = line.toString().split(";")

    let parts = {
        id: split_txt[0],
        type: split_txt[1],
        brand: split_txt[2],
        model: split_txt[3],
        price: split_txt[4]
    }

    let item = document.createElement("div")
    item.classList.add("item","element",parts["type"])
    item_container.appendChild(item)

    let item_img = document.createElement("div")
    item_img.classList.add("item-img")

    const img = new Image();
    img.src = 'src/img/' + parts['id'] + '.jpg';

    img.onload = function() {
        item_img.style.backgroundImage = 'url("' + 'src/img/' + parts['id'] + '.jpg' + '")';
    };

    item.appendChild(item_img)

    let item_description = document.createElement("div")
    item_description.classList.add("item-description")
    item_description.innerText = `
            Type: ${parts["type"]}
            Brand: ${parts["brand"]}
            Model: ${parts["model"]}
            Price: ${parts["price"]}
            a
            a
            a
            a
            a
            a
            a
            a
        `
    item.appendChild(item_description)

    let plus = document.createElement("div")
    plus.classList.add("plus")
    plus.innerText = "+"
    item.appendChild(plus)
}



function selectAll() {

    const items = document.getElementsByClassName("item");

    console.log(document.getElementsByClassName("item").length)
    console.log(document.getElementsByClassName("item"))
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
    }

}

selectAll()

function selectONE(link){
    let type = link.innerText
}
