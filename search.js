const inputSearch = document.querySelector('.search-product')

if (inputSearch) {
    inputSearch.addEventListener('change', (e) => {
        const searchTerm = e.target.value.trim()
        if (searchTerm) {
            localStorage.setItem('searchTerm', searchTerm)
            window.location.href = './searchProduct.html'
            e.target.value = ''
        }
    })
}