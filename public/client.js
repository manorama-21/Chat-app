const socket =io()
 let name;
 let textarea = document.querySelector('#textarea')
 let messageArea = document.querySelector('.message__area')

 do{
    name = prompt('Please enter your name: ')
 } while(!name)

 textarea.addEventListener('keyup',(e) => {
    if(e.key ==='Enter'){
        sendMessage(e.target.value)
    }
 })

 function sendMessage(message){
    let msg = {
        user:name,
        message: message.trim()
    }
    // Append

    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()
    
    // send to server
    socket.emit('message',msg
    )
 }

 function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'massage')
    
    let markup =`
    <h3>${msg.user}</h3>
    <p>${msg.message}</p>
    `
   
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

 }

//  receive message

socket.on('message',(msg)=>{
   appendMessage(msg, 'incoming')
   scrollToBottom()
})

// scroll to bottom

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}