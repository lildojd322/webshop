const inputSearch = document.querySelector('.search-product')
const magnifier = document.querySelector('.search-magnifier')


const redirect = (input) => {
    const searchTerm = input.value.trim()
    if (input) {
        localStorage.setItem('searchTerm', searchTerm)
        window.location.href = './searchProduct.html'
        input.value = ''
    }
}

if (inputSearch) {
    magnifier.addEventListener('click', () => {
        redirect(inputSearch)
    } )
    document.addEventListener('keyup', event => {
        if (event.code === 'Enter') {
            redirect(inputSearch)
        }
    })



}