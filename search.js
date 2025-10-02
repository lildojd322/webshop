const inputSearc = document.querySelector('.search-product')


const searchProduct = () => {
    const allProducts = document.querySelectorAll('.product')
    const searchTerm = inputSearc.value.toLowerCase().trim()
    allProducts.forEach((product) => {
        const name = product.querySelector('.product-name').textContent.toLowerCase()
        const index = product.querySelector('.product-index').textContent.toLowerCase()
        if (name.includes(searchTerm) || index.includes(searchTerm)) {
            product.style.display = 'flex'
        } else {
            product.style.display = 'none'
        }
    })
}

inputSearc.addEventListener('input', searchProduct)