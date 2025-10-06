const selectElement = document.querySelector('select')


const filterChange = () => {
    const allProducts = document.querySelectorAll('.product')
    allProducts.forEach((product) => {
        product.style.display = 'flex'
        if (product.querySelector('.product-filter').textContent.toLowerCase().trim() === selectElement.value.toLowerCase().trim()) {
            product.style.display = 'flex'
        } else if (selectElement.value.toLowerCase().trim() === 'все товары') {
            product.style.display = 'flex'
        } else {
            product.style.display = 'none'

        }
    })

}

selectElement.addEventListener('change', filterChange)