// Find the search input box
const search = document.querySelector('.search')

// Every time we change the text
search.addEventListener('input', (event) => {
  // log out what the value of the search was
  const title = event.target.value
  fetch(`/search?title=${title}`)
    .then(response => response.text())
    .then(body => {
      console.log('Got back a response', body)
    })
})