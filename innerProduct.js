document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'))
    if (!product) {
        const errorMessage = 'Ошибка! Товара не найден или его не существует'
        document.body.innerHTML = '<p>Товар не найден!</p>'
        throw new Error(errorMessage)
    }
    document.title = product.name
    const productElement = document.createElement('div')
    productElement.classList.add('productInnerInfo')
    productElement.innerHTML = `
            <img  src="${product.imageBase64}" width="140px" height="150px"
                 class="product-icon" alt="${product.name}">
            <div class="product-all-info">
            <div class="product-price">${product.price} ₽</div>
                <div class="product-name">${product.name}</div>
                <div class="product-index">${product.index}</div>      
            </div>
              <div class="product-filter">${product.filter}</div>  
            <button class="buy-product">в корзину</button>
        `
    document.body.appendChild(productElement)

})





