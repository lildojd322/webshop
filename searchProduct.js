const initializeSearchPage = () => {
    const inputSearch = document.querySelector('.search-product')
    const mainContainerProducts = document.querySelector('.products-container')

    fetch('http://localhost:3000/products')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки товаров')
            return response.json()
        })
        .then(products => {
            const searchTerm = (localStorage.getItem('searchTerm') || '').toLowerCase()
            inputSearch.value = searchTerm

            mainContainerProducts.innerHTML = ''
            if (products.length === 0) {
                mainContainerProducts.innerHTML = '<p>Товаров нет</p>'
                return
            }

            const filteredProducts = products.filter(product => {
                const name = product.name?.toLowerCase() || ''
                const index = product.index?.toLowerCase() || ''
                return name.includes(searchTerm) || index.includes(searchTerm)
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
        })
        .catch(error => {
            console.error('Ошибка:', error)
            mainContainerProducts.innerHTML = `<p>Ошибка загрузки товаров</p>`
        })
}

const handleSearchOnPage = (e) => {
    const searchTerm = e.target.value.trim()
    localStorage.setItem('searchTerm', searchTerm)
    initializeSearchPage()
}

if (window.location.href.includes('searchProduct.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const inputSearch = document.querySelector('.search-product')
        initializeSearchPage()
        if (inputSearch) {
            inputSearch.addEventListener('change', handleSearchOnPage)
        }
    })
}