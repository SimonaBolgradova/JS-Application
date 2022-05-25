function attachEvents() {
    
}

attachEvents();

async function getMessages(){
    const response = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await response.json();

    document.getElementById("messages").value= Object.values(data).map(v=>`${v.author}: ${v.content}`);

}
async function postMessage (message){
    const response = await fetch ("http://localhost:3030/jsonstore/messenger",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(message)
    });
    const data = await response.json();

    console.log(data);
}