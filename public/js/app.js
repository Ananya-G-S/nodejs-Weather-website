const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
const message3=document.querySelector('#message-3')
const message4=document.querySelector('#message-4')

weatherform.addEventListener('submit',(event)=>
{
    event.preventDefault()
    const location=search.value
    message1.textContent='Loading...'
    message2.textContent=''
    message3.textContent=''
    message4.textContent=''
    fetch('/weather?address='+location).then((response)=>
    {
        response.json().then((data)=>{
        if(data.error)
        {
            message1.textContent=data.error
            message2.textContent=''
            message3.textContent=''
            message4.textContent=''
        }
        else
        {
            message1.textContent=data.location
            message2.textContent="Weather description: "+data.weather_description
            message3.textContent="Temperature: "+data.Temperature
            message4.textContent="Humidity: "+data.Humidity

        }
        
    })
    })
})