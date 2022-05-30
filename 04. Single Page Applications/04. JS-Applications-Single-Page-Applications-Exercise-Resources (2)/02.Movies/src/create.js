import { showView } from "./util.js";

const section = document.querySelector('#create-');
const form = section.querySelector('form');
form.addEventListener('submit',onSubmit);

export function createPage(){
    showView(section)
}
async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData();

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

}
async function createMovie(title,description,img){
    const user = JSON.parse(localeStorage.getItem('user'));

    await fetch('http://localhost:3030/data/movies',{
        method:'post',
    headers:{
        'Content-Type':'application/json',
        'X-Authoriztion': user.accessToken
    },
    body:JSON.stringify({title,description,img})
    })
}