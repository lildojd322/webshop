const selectElement = document.querySelector('select')
const firstRangeInput = document.getElementById('first-input')
const secondRangeInput = document.getElementById('second-input')
const rangeButton = document.querySelector('.range-button')


const changePriceRangeAndFilter = () => {
    const minPrice = +(firstRangeInput.value)
    const maxPrice = +(secondRangeInput.value)
    const allProducts = document.querySelectorAll('.product')
    const selectedCategory = selectElement.value.toLowerCase().trim()
    allProducts.forEach((product) => {
        const productCategory = product.querySelector('.product-filter').textContent.toLowerCase().trim()
        const productPrice = parseFloat(product.querySelector('.product-price').textContent)
        let categoryMatch
        if (selectedCategory === 'все товары') {
            categoryMatch = true
        } else {
            categoryMatch = productCategory === selectedCategory
        }
        let priceMatch
        if (minPrice >= 0 && maxPrice > 0 && minPrice <= maxPrice) {
            if (productPrice >= minPrice && productPrice <= maxPrice) {
                priceMatch = true;
            } else {
                priceMatch = false;
            }
        } else {
            priceMatch = true;
        }
        if (categoryMatch && priceMatch) {
            product.style.display = 'flex'
        } else {
            product.style.display = 'none'
        }
    })
}

rangeButton.addEventListener('click', changePriceRangeAndFilter)
selectElement.addEventListener('change', changePriceRangeAndFilter)