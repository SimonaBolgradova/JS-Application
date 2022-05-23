async function getInfo() {
    const value = document.getElementById('stopId').value;
    const url = 'http://localhost:3030/jsonstore/bus/businfo/'+value;

    const stopName = document.getElementById('stopName');
    try{
        const ulElement = document.getElementById('buses');
        ulElement.innerHTML=' ';
        const response = await fetch(url);
        const data = await response.json();
        stopName.textContent = data.name;
        
        Object.entries(data.buses).forEach(b=>{
            let li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`
            ulElement.appendChild(li);
        })
    }catch(err){
         stopName.textContent = "Error";
    }
}
