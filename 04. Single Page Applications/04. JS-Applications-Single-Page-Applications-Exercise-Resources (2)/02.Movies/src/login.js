import { homePage } from "./home.js";
import { showView } from "./util.js";

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit',onSubmit);

export function loginPage(){
    showView(section)
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
     
    login(email,password);
    homePage();
}
async function login(email,password){
    try{
        const res = await fetch('http://localhost:3030/users/login',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        if(!res.ok){
            const error = await res.json()
            throw new Error(error.message);
        }
        localeStorage.setItem('user',JSON.stringify(user));
    }catch(err){
        alert(err.message);
        throw err
    }
}
