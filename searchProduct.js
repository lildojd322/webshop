const initializeSearchPage = () => {

    if (window.location.href.includes('searchProduct.html')) {
        const mainContainerProducts = document.querySelector('.products-container')
        const searchTerm = localStorage.getItem('searchTerm') || ''

        inputSearch.value = searchTerm
        mainContainerProducts.innerHTML = ''
        const products = JSON.parse(localStorage.getItem('products')) || []

        if (products.length === 0) {
            mainContainerProducts.innerHTML = '<p>Товары не найдены</p>'
            return
        }

        const filteredProducts = products.filter(product => {
            const name = product.name?.toLowerCase() || ''
            const index = product.index?.toLowerCase() || ''
            const filter = product.filter?.toLowerCase() || ''
            return name.includes(searchTerm) || index.includes(searchTerm) || filter.includes(searchTerm)
        })

        if (filteredProducts.length === 0) {
            mainContainerProducts.innerHTML = '<p>Товары не найдены</p>'
            return
        }

        filteredProducts.forEach((product) => {

            const productElement = document.createElement('div')
            productElement.classList.add('product')
            productElement.addEventListener('click', (event) => {
                if (!event.target.classList.contains('buy-product')) {
                    localStorage.setItem('selectedProduct', JSON.stringify(product))
                    window.location.href = './innerProduct.html'
                }


            })
            productElement.innerHTML = `
                    <img src="${product.imageBase64}" width="140px" height="150px"
                         class="product-icon" alt="${product.name}">
                    <div class="product-all-info">
                        <div class="product-price">${product.price} ₽</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-index">${product.index}</div>      
                    </div>
                    <div class="product-filter">${product.filter}</div>  
                    <button class="buy-product">в корзину</button>
                `
            mainContainerProducts.appendChild(productElement)
        })
    }
}
if (window.location.href.includes('searchProduct.html')) {
    document.addEventListener('DOMContentLoaded', initializeSearchPage)
}
inputSearch.addEventListener('change', initializeSearchPage)