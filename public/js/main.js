const selectedNode = document.querySelector('#node')
const btnAlert = document.querySelector('#btnAlert') 
const btnResolve = document.querySelector('#btnResolve')
let textareaOutput = document.querySelector('#output')

const fetchSend = async (url, id) => {
    try{
        const response = await fetch(`${url}/${id}`, {method: 'POST'})
        const result = await response.json()
        return result
    } catch(err){
        return err
    }
}

let nodeId = 0

selectedNode?.addEventListener('change', (e) => {
    nodeId = Number(e.target.value)
})

btnAlert?.addEventListener('click', async () => {
    const result = await fetchSend('poc-monitoringtools-fs-server.vercel.app/api/alerts', nodeId)
    let resultTxt = JSON.stringify(result, null, 2)

    if (textareaOutput) {
        textareaOutput.innerHTML = `${resultTxt}`;
        textareaOutput.classList.remove('textareaResolve')
        textareaOutput.classList.add('textareaAlert')
    }
})

btnResolve?.addEventListener('click', async () => {
    const result = await fetchSend('poc-monitoringtools-fs-server.vercel.app/api/resolves', nodeId)
    let resultTxt = JSON.stringify(result, null, 2)
    
    if (textareaOutput) {
        textareaOutput.innerHTML = `${resultTxt}`;
        textareaOutput.classList.remove('textareaAlert')
        textareaOutput.classList.add('textareaResolve')
    }  
})
