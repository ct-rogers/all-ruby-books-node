// Find the search input box
const search = document.querySelector('.search')

const booksDiv = document.querySelector('.books')

// Every time we change the text
search.addEventListener('input', (event) => {
  // log out what the value of the search was
  const title = event.target.value
  fetch(`/search?title=${title}`)
    .then(response => response.text())
    .then(replacementHTML => {
      booksDiv.innerHTML = replacementHTML
    })
})