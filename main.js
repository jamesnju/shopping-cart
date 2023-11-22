let removeItemCart = document.getElementsByClassName('remove');

for(let i=0; i<removeItemCart.length; i++){
    let button = removeItemCart[i];
    button.addEventListener('click', removeItems)
}
// remove cart items
function removeItems(event){
    let clickedButton = event.target
    clickedButton.parentElement.parentElement.remove();
    updateCartTotal();

}

// updating the quantity buttons
let quantityInput = document.getElementsByClassName('quantity');

for(let i=0; i<quantityInput.length; i++){
    let input = quantityInput[i];
    input.addEventListener('change', quantityUpdate)
}

function quantityUpdate(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal();
}



// updating the items on cart
function updateCartTotal(){
    let cartcontainer = document.querySelector('.cartcontainer');
    let cartitems = cartcontainer.querySelectorAll('.cartitems');
    total = 0;

    for(let i=0; i<cartitems.length; i++){
        let item = cartitems[i];

        let  priceElement = item.querySelector('.price');
        let QuantityElement= item.querySelector('.quantity');

        let price = parseFloat(priceElement.innerText.replace('Ksh', ''));
        let quantity = QuantityElement.value
        total = total + (price * quantity);
        
    }
        document.getElementsByClassName('totalprice')[0].innerText = 'Total/: Ksh ' + total.toFixed(2);
}

// add to cart button

let addtocart = document.getElementsByClassName('btnadd');

for(let i=0; i<addtocart.length; i++){
    let cartButton = addtocart[i];

    cartButton.addEventListener('click', AddToCart);
}

function AddToCart(event){
    let cartButton = event.target;

    let products = cartButton.parentElement//getting all products in the parentContainer
    let title = products.getElementsByClassName('title')[0].innerText;
    let Amount = products.getElementsByClassName('amount')[0].innerText;
    let imgSrc = products.getElementsByClassName('prodictimage')[0].src

    AddItemsToCart (title, Amount, imgSrc)
    updateCartTotal();
}

function AddItemsToCart (title, Amount, imgSrc){
    // creating cart row and appeding the row
    let cartRow = document.createElement('div');
    cartRow.classList.add('cartitems')
    let cartItems = document.getElementsByClassName('cartcontainer')[0];//in the cart container
    let itemNames = cartItems.getElementsByClassName('carttitle');
    for(let i=0; i<itemNames.length; i++){
        if(itemNames[i].innerText == title){
            alert('items already in cart')
            return
        }
    }
    let cartRowContent = `
        <td class="carttitle">${title}</td>
        <td><img src=${imgSrc} alt=""></td>
        <td class="price">${Amount}</td>
        <td><input type="number" id="quantitybutton" min="1"  value="1" class="quantity"></td>
        <td><button class="remove">remove</button></td>
    
    `
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);

}