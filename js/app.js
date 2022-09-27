
let searchInput = document.querySelector("#search");

let allProducts = [];

const searchItem = {
    searchWord : ""
};

document.addEventListener("DOMContentLoaded", ()=>{
    axios
    .get("http://localhost:3000/items")
    .then((res)=>{
        allProducts = res.data;
        renderProducts(res.data,searchItem);
    })
    .catch((err)=> console.log(err));

})


function renderProducts(_products,_filters){
    const filteredProducts = _products.filter( p =>{
        return p.title.toLowerCase().includes(_filters.searchWord.toLowerCase());
    })
    console.log(filteredProducts);
}
searchInput.addEventListener("input",(e)=>{
    searchItem.searchWord = e.target.value;
    console.log(searchItem.searchWord)
    renderProducts(allProducts,searchItem);
})