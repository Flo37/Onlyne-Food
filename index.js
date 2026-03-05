import com from "/data.js"
let array=JSON.parse(localStorage.getItem("card"))||[]
function render() {
    return com.map(products => {
        return `
        <div class="liste">
            <div class="image">
                <span class="emoji" data-emo="${products.uuid}">${products.emoji} </span>
            </div>
            <div class="content">
                <h3>${products.name} </h3>
                <p>${products.engredient} </p>
                <h4>$${products.price} <h4>
            </div>
        </div>
        `
    }).join("")
}
document.getElementById("container").innerHTML = render()

document.addEventListener("click", (e) => {
    if (e.target.dataset.emo) {
        getProducts(e.target.dataset.emo)

    } else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }
})

function getProducts(prodId) {
    const filterId = com.find(ids =>
         prodId === ids.uuid
    )
    if (filterId) {
        array.push(filterId)
        localStorage.setItem("card", JSON.stringify(array))

        getOrder()
        getPrice()
   }
}

function getOrder() {
    let orders =array.map(order => {
        return `
        <div class="order-container">
        <div class="order">
        <span>${order.emoji} </span>
        <h3>${order.name} </h3>
        <h4>$${order.price} <h4>
        <button data-remove=${order.uuid}>Remove</button
        </div>
        </div>
        `
    }).join("")
    document.getElementById("order").innerHTML = orders

}

getOrder()

function getPrice() {
    const total = array.reduce((price, currentPrice) => {
       return price + currentPrice.price
},0)
    document.getElementById("total").innerHTML = `
    <h2>Total: $${total}</h2>
    `
}

getPrice()

function removeItem(itemId) {
    array = array.filter(remove => itemId !== remove.uuid)
     localStorage.setItem("card",JSON.stringify(array))
        getOrder()
        getPrice()
}

// getform
document.getElementById("btn").addEventListener("click", () => {
    if (array.length === 0) {
             document.getElementById("total").innerHTML = `
    <h2>You have to buy Some☺️</h2>
    `
    } else {

        document.getElementById("form").style.display = "block"
        }
        })

        // removeForm

    document.getElementById("deleteBtn").addEventListener("click", () => {

        document.getElementById("form").style.display="none"
})

//  spacing the card number
const input = document.getElementById('cardNumber');
input.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
  e.target.value = formattedValue;
});

const form=document.getElementById("form")
document.getElementById("acceptBtn").addEventListener("click", confirmation)

function confirmation(e) {
    e.preventDefault()
    if (form.reportValidity()){
        localStorage.clear()

            document.getElementById("btn").style.display = "none"
            document.getElementById("form").style.display = "none"
            document.getElementById("order").style.display="none"
            document.getElementById("total").style.display="none"
        let confirm = `
            <div class="celebrate">
            <h2 class="thanksGive"> Thank you <strong>${document.getElementById("names").value}</strong> to Choose Us🥳</h2>
            </div>
            `
            document.getElementById("confirmation").innerHTML=confirm
    }
}

