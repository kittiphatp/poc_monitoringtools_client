const selectedNode = document.querySelector('#node')
const btnAlert = document.querySelector('#btnAlert') 
const btnResolve = document.querySelector('#btnResolve')
let textareaOutput = document.querySelector('#output')

const fetchSend = async (url, id) => {
    try{
        const response = await fetch(`${url}/${id}`, {method: 'POST', mode: 'no-cors' })
        const result = await response.json()
        return result
    } catch(err){
        return err
    }
}

let nodeId = 0
selectedNode.addEventListener('change', (e) => {
    nodeId = Number(e.target.value)
    textareaOutput.innerHTML = ''
    textareaOutput.classList.remove('textareaAlert')
    textareaOutput.classList.remove('textareaResolve')
})

const requestOptions = {method: "POST", mode: 'no-cors'};

btnAlert.addEventListener('click', () => {
    fetch(`https://poc-monitoringtools-fs-server.vercel.app/api/alerts/${nodeId}`, requestOptions)
      .then(txt => {
        if (textareaOutput) {
            textareaOutput.innerHTML = `Sent an alert`;
            textareaOutput.classList.remove('textareaResolve')
            textareaOutput.classList.add('textareaAlert')
        }
      })           
      .catch((error) => console.error('There is some error: ', error));  
})

btnResolve.addEventListener('click', async () => {
    const result = await fetchSend('https://poc-monitoringtools-fs-server.vercel.app/api/resolves', nodeId)
    if (textareaOutput) {
        textareaOutput.innerHTML = `Sent a resolve`;
        textareaOutput.classList.remove('textareaAlert')
        textareaOutput.classList.add('textareaResolve')
    }  
})
