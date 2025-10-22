const inputSearch = document.querySelector('.search-product')   
const mainContainerProducts = document.querySelector('.products-container')

const searchProduct = () => {
    if (window.location.href.includes('main.html')) {
        const allProducts = document.querySelectorAll('.product')
        const searchTerm = inputSearch.value.toLowerCase().trim()
        allProducts.forEach((product) => {
            const name = product.querySelector('.product-name').textContent.toLowerCase()
            const index = product.querySelector('.product-index').textContent.toLowerCase()
            const filter = product.querySelector('.product-filter').textContent.toLowerCase()

            if (name.includes(searchTerm) || index.includes(searchTerm) || filter.includes(searchTerm)) {
                product.style.display = 'flex'
            } else {
                product.style.display = 'none'
            }
        })
    } else {
        const searchTerm = inputSearch.value.toLowerCase().trim()
        localStorage.setItem('searchTerm', searchTerm)
        window.location.href = './searchProduct.html'
    }


}
try {
    inputSearch.addEventListener('change', searchProduct)
} catch (error) {
    console.log(error.message)
}

