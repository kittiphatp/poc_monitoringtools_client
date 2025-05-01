const selectedNode = document.querySelector('#node')
const btnAlert = document.querySelector('#btnAlert') 
const btnResolve = document.querySelector('#btnResolve')
let textareaOutput = document.querySelector('#output')

const fetchSend = async (url, id) => {
    try{
        const url_fetch = url + '/' + id
        console.log(url_fetch)
        const response = await fetch(`${url_fetch}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                Access-Control-Allow-Headers':    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            }
        })
        const result = await response.json()
        console.log(result)
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
    const result = await fetchSend("https://poc-monitoringtools-fs-server.vercel.app/api/alerts", nodeId)
    let resultTxt = JSON.stringify(result, null, 2)

    if (textareaOutput) {
        textareaOutput.innerHTML = `${resultTxt}`;
        textareaOutput.classList.remove('textareaResolve')
        textareaOutput.classList.add('textareaAlert')
    }
})

btnResolve?.addEventListener('click', async () => {
    const result = await fetchSend("https://poc-monitoringtools-fs-server.vercel.app/api/resolves", nodeId)
    let resultTxt = JSON.stringify(result, null, 2)
    
    if (textareaOutput) {
        textareaOutput.innerHTML = `${resultTxt}`;
        textareaOutput.classList.remove('textareaAlert')
        textareaOutput.classList.add('textareaResolve')
    }  
})
