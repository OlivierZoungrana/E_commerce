

// Recupération du tableau
import { myArray } from "./database.js";

let article = document.querySelector(".boutique");
//console.log(article);
const body = document.body;
const container = document.createElement("div");
container.classList.add("container");
const cart = document.querySelector("#cart");
let items = 0;
cart.innerHTML = items;

function addToCart(productRaw, number) {
 // console.log(productRaw, number)
  //localStorage.getItem('cart', JSON.parse(productRaw))
  //localStorage.setItem('cart', JSON.stringify(productRaw));
 
 cart.innerHTML = items;
 StoreInLocalStorage(productRaw);
 total(myArray[items]) 
 ++items;
}




function StoreInLocalStorage(productRaw) {
  let productsToStore = [productRaw];
 

  const stringifyiedItems = localStorage.getItem("cart");
  const items = JSON.parse(stringifyiedItems);
  if (items) {
    productsToStore.push(items);
   
  }else{
    localStorage.setItem("cart", JSON.stringify(productsToStore));

  }

}

function cartNumbers(myArray){

  let productNumbers = localStorage.getItem('cartN');

  productNumbers = parseInt(productNumbers);

  if(productNumbers){
      localStorage.setItem('cartN', productNumbers+1);
      document.querySelector('.cart span').textContent = productNumbers +1;
  }else{
      localStorage.setItem('cartN', 1);
      document.querySelector('.cart span').textContent = 1;
  }

  setItem(myArray);
}



function setItem(myArray){
  console.log(myArray)
 let cartItems = localStorage.getItem('myarraysinCart');
 cartItems = JSON.parse(cartItems)

if(cartItems != null){

  if(cartItems[myArray.model] == undefined){
      cartItems = {
          ...cartItems,
          [myArray.model]: myArray
      }
  }
  cartItems[myArray.model].inCart +=1;
} else{

  myArray.counter =1;
  cartItems = {
     [myArray.model]: myArray
}
  
  }
  localStorage.setItem('myarraysinCart', JSON.stringify(cartItems))
}


function total(myArray){
//  console.log(myArray.price)
let cartCost =localStorage.getItem('total');
console.log("my cart cost," , cartCost);
  
if(cartCost!=null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("total", cartCost + 
    myArray.price);
}else{
    localStorage.setItem("total", myArray.price);
}

}



function countItemsInStore() {
  const stringifyiedItems = localStorage.getItem("cart");
  let items = [JSON.parse(stringifyiedItems)];

  return items.length;
}


function chargementCart(){
  let productNumbers = localStorage.getItem('cart');

  if(productNumbers){
      document.querySelector('.cart span').textContent= productNumbers;
  }
}









function UpdateCartLabel(){
  const itemsCount = countItemsInStore()
  cart.innerHTML = items;
}

function displayCart (){
  const stringifyiedItems = localStorage.getItem("cart");
  const items = JSON.parse(stringifyiedItems);

  let itemsToDisplay = []
  
  items.forEach(item => {
    // Petit Piège dans le if
    if(itemsToDisplay.includes(item)){
      // Mise à jour de la quantité
    }
    itemsToDisplay.push(item)
  });}






myArray.forEach((item) => {
  const product = generateProduct(
    item.id,
    item.url,
    item.brand,
    item.model,
    item.price,
    addToCart
  );
  container.append(product);
});

article.appendChild(container);
//body.appendChild(container);

function generateProduct(id, imgUrl, brandName, model, price, onClick = {}) {
  const div = document.createElement("div");
  div.classList.add("produit");

  const productThumb = document.createElement("img");
  productThumb.src = imgUrl;

  const brand = document.createElement("h3");
  brand.innerHTML = brandName;

  const modelName = document.createElement("h4");
  modelName.innerHTML = model;

  const productPrice = document.createElement("h4");
  productPrice.innerHTML = price;

  const addContainer = document.createElement("div");
  const productRaw = {brand: brandName, modelName: model, price: price}


  const addButton = document.createElement("button");
  addButton.innerHTML = "Ajouter";
  addButton.addEventListener("click", () => onClick(productRaw, 1));
  addContainer.append(addButton);

  div.append(productThumb, brand, modelName, productPrice, addContainer);
  return div;
}


let btn = document.getElementById('toogle_btn')
const nav = document.querySelector('nav')


btn.addEventListener("click", event=>{
  
  nav.classList.toggle("is-visible");
  countItemsInStore();

})

//UpdateCartLabel();
//chargementCart();
//countItemsInStore();