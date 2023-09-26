const loadProducts = async() => {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => showProducts(data))
};


const searchButton = document.getElementById("buttonForSearch");
const inputVal = document.getElementById("form-style");

searchButton.addEventListener("click", async() => {
  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json();
  console.log(data);
  const inputValue = inputVal.value;
  // console.log(inputValue);
  data.forEach((a) => {
    console.log(a);
  })

})

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const rating = product.rating.rate;
    const star1 = rating > 4 ? "fill-rate" : "noRating";
    const star2 = rating > 3 && rating <= 4 ? "fill-rate" : "noRating";
    const star3 = rating > 2 && rating <= 3 ? "fill-rate" : "noRating";
    const star4 = rating > 1 && rating <= 2 ? "fill-rate" : "noRating";
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
        <div>
      <img class="product-image" src=${product.image}></img>
        </div>
        <h3 class="product-title mt-4">${product.title}</h3>
        <p>Category: <b>${product.category}</b></p>
        <p class="product-ratings"><span>
        <i class="fas fa-star rating ${star1} ${star2} ${star3} ${star4}"></i>
        <i class="fas fa-star rating ${star1} ${star2} ${star3}"></i>
        <i class="fas fa-star rating ${star1} ${star2}"></i>
        <i class="fas fa-star rating ${star1}"></i>
        <i class="fas fa-star rating"></i>
        </span> (${product.rating.rate})</p></h5>
        <p class="icon-detail"><i class="fas fa-user"></i> ${product.rating.count}</P>
        
        <h2 class="product-price">Price: $<b class="text-secondary"> ${product.price}</b></h2>
        
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn the-btn">add to cart</button>
        <button id="details-btn" class="btn the-btn bg-primary">Details</button></div>
        `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }

  updateTotal();
};
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


loadProducts();
