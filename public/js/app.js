const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript!'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent the default behaviour of the browser of refreshing the page
    
    const location = search.value

    messageOne.textContent = 'Loading forecast...'
    messageTwo.textContent = ''

        //localhost:PORT/
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
}) 
})