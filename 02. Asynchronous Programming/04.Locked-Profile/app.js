async function lockedProfile() {
    const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const profiles = await res.json();
    document.getElementById('main').replaceChildren();
     Object.values(profiles).forEach(p=>{
         
         let profile = e('div',{className: "profile"},
                            e('img',{src:'./iconProfile2.png',className:'userIcon'},''),
                            e('label',{},'Lock'),
                            e('input',{type:'radio',name:'user1Locked',value:'lock',checked: true},''),
                            e('label',{},'Unlocked'),
                            e('input',{type:'radio',name:'user1Locked',value:'unlock'},''),
                            e('hr',{},''),
                            e('label',{},'Username'),
                            e('input',{type:'text',name:'user1Email',value: p.username,disabled:true,readonly: true},''),
                            e('div',{id:'user1HiddenFields'}, 
                                e('hr',{},''),
                                e('label',{},'Email'),
                                e('input',{type:'email',name:'user1Email',value: p.email,disabled:true,readonly: true}),
                                e('label',{},'Age:'),
                                e('input',{type:'email',name:'user1Age',value: p.age,disabled:true,readonly: true},'')),
                            e('button',{onClick: Show},'Show more')
                           )
                    profile.querySelector('input[type=radio]').checked = true;
                    profile.querySelector('div').style.display = 'none';
                    document.getElementById('main').appendChild(profile);

                function Show(e){                    
                        const profile=e.target.parentNode;
                        const isLocked= profile.querySelector('input[type=radio]:checked').value=='lock'||profile.querySelector('input[type=radio]:checked').value=='null';
                        if(isLocked){
                            return;
                        }
                        let div = profile.querySelector('div');
                        let isVisible= div.style.display ==='block';
                        div.style.display = isVisible? 'none':'block';
                        e.target.textContent= !isVisible? 'Hide it':'Show more';
             }
     })

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
