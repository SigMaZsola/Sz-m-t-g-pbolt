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
    item.classList.add("item","element")
    item_container.appendChild(item)

    let item_img = document.createElement("div")
    item_img.classList.add("item-img")
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

