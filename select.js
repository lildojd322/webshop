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
        const categoryMatch = selectedCategory === 'все товары' || productCategory === selectedCategory
        const priceMatch = (minPrice >= 0 && maxPrice > 0 && minPrice <= maxPrice)
            ? (productPrice >= minPrice && productPrice <= maxPrice)
            : true
        product.style.display = 'flex'
        product.style.display = (categoryMatch && priceMatch) ? 'flex' : 'none'
    })
}

rangeButton.addEventListener('click', changePriceRangeAndFilter)
selectElement.addEventListener('change', changePriceRangeAndFilter)