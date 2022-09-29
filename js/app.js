
let searchInput = document.querySelector("#search");
let cardsContainer = document.querySelector(".cards");
let filterButtons = document.querySelectorAll('.filter-option');

let allProducts = [];

const searchItem = {
    searchWord : ""
};

// connect to API

document.addEventListener("DOMContentLoaded", ()=>{
    axios
    .get("http://localhost:3000/items")
    .then((res)=>{
        allProducts = res.data;
        renderProducts(res.data,searchItem);
    })
    .catch((err)=> console.log(err));

})

//filter products

function renderProducts(_products,_filters){
    const filteredProducts = _products.filter( p =>{
        return p.title.toLowerCase().includes(_filters.searchWord.toLowerCase());
    })

    cardsContainer.innerHTML = ''
    // render products in DOM

    filteredProducts.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <div class="card-top-part">
                                <i class="far fa-heart"></i>
                            </div>
                            <div class="card-picture">
                                <img src="${item.image}">
                            </div>
                            <div class="product-name">
                                ${item.title}
                            </div>
                            <div class="card-footer">
                                <div class="price">
                                    $${item.price}
                                </div>
                                <i class="fas fa-shopping-basket"></i>
                            </div>
        `
        cardsContainer.appendChild(div);

    });
}

// receive user entered word

searchInput.addEventListener("input",(e)=>{
    searchItem.searchWord = e.target.value;
    renderProducts(allProducts,searchItem);
})

// filter products with category 

filterButtons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        searchItem.searchWord = e.target.dataset.filter;

        renderProducts(allProducts,searchItem)
    })
});

// delete filters and show all products

document.querySelector('.delete-filters').addEventListener('click',(e)=>{
    searchItem.searchWord = '';
    renderProducts(allProducts,searchItem)
})