function attachEvents() {
    const input = document.querySelector('#location');
    document.querySelector('#submit').addEventListener('click',Get);

    async function Get(){
        try{
        const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
        const locations = await response.json();
        let current = locations.find(x=>x.name == input.value);
        
         const res = await fetch('http://localhost:3030/jsonstore/forecaster/today/'+current.code);
         const con = await res.json();

            let utf = {
                Sunny: String.fromCharCode(0x2600),
                "Partly sunny": String.fromCharCode(0x26C5),
                Overcast: String.fromCharCode(0x2601),
                Rain: String.fromCharCode(0x2614),
                Degrees: String.fromCharCode(176)
            }
            document.getElementById('forecast').style.display = 'block';
            let forecast = e('div',{className:"forecasts"},
            e('span',{className:"condition symbol"},utf[con.forecast.condition]),
            e('span',{className:'condition'},
            e('span',{className:'forecast-data'},con.name),
            e('span',{className:'forecasts-data'},`${con.forecast.low}${utf.Degrees}/${con.forecast.high}${utf.Degrees}`),
            e('span',{className:'forecast-data'},con.forecast.condition)));
            document.getElementById('current').appendChild(forecast);
            
         const threeDaysRes = await fetch('http://localhost:3030/jsonstore/forecaster/upcoming/'+current.code);
         const threeDays = await threeDaysRes.json();
         
         console.log(Object.values(threeDays)[0]);
         Object.values(threeDays)[0].forEach(d=>{
             console.log(d);
             let day = e('div',{className:'forecast-info'},
             e('span',{className:'upcoming'},
             e('span',{className:'symbol'},utf[d.condition]),
             e('span',{className:'forecast-data'},`${d.low}${utf.Degrees}/${d.high}${utf.Degrees}`),
             e('span',{className:'forecast-data'},d.condition)));
             console.log(day);
             document.querySelector('#upcoming').appendChild(day);
            })
        }catch(err){
            document.getElementById('forecast').style.display = 'block';
            document.getElementById('forecast').querySelector('#upcoming').remove();
            document.getElementById('forecast').querySelector('.label').textContent = 'Error'
            console.log(err)
        }
    }
    function e(type, attributes, ...content) {
        const result = document.createElement(type);
    
        for (let [attr, value] of Object.entries(attributes || {})) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attr] = value;
            }
        }
    
        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    
        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });
    
        return result;
    }
}

attachEvents();
