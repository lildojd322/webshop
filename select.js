const selectElement = document.querySelector('select')

const firstRangeInput = document.getElementById('first-input')
const secondRangeInput = document.getElementById('second-input')
const rangeButton = document.querySelector('.range-button')

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

const changePriceRange = () => {
    const minPrice = +(firstRangeInput.value)
    const maxPrice = +(secondRangeInput.value)
    const allProducts = document.querySelectorAll('.product')
    
    if (minPrice >= 0 && maxPrice > 0 && minPrice <= maxPrice) {
        allProducts.forEach((product) => {
            let productPrice = parseFloat(product.querySelector('.product-price').textContent)
            const productCategory = product.querySelector('.product-filter').textContent.toLowerCase().trim()
            const selectedCategory = selectElement.value.toLowerCase().trim()
            
            if (productPrice >= minPrice && productPrice <= maxPrice && 
                (productCategory === selectedCategory || selectedCategory === 'все товары')) {
                product.style.display = 'flex'
            } else {
                product.style.display = 'none'
            }
        })
    }
}
document.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
        changePriceRange()
    }
})

rangeButton.addEventListener('click', changePriceRange)
selectElement.addEventListener('change', filterChange)