const backButton = document.querySelectorAll('.button-back')
backButton.forEach(button => {
    button.addEventListener('click', function () {
    window.history.back()
})
})