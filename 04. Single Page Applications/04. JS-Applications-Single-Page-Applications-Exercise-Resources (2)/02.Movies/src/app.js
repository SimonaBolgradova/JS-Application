//improve HTML structure
// create app.js module
// create router.js containing hide and display of view
// placeholders for all views
// implement views
// - create request logic
// - DOM manipulation logic
// [] catalog
// [] login
// [] register
// [] create
// [] details
// [] like
// [] edit
// [] delete

import {showView} from './util.js';
import {loginPage}from './login.js';
import {registerPage} from './register';
import {createPage} from './create';

const routes = {
    '/':homePage,
    '/login':loginPage,
    '/logout':logoutPage,
    '/register':registerPage,
    '/create':createPage,
};

document.querySelector('nav').addEventListener('click',onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click',onNavigate)
function onNavigate(event){
    if(event.target.tagName =="A"){
        event.preventDefault();
        const url = new URL(event.target.href);

        const view = routes[url.pathname];
        if(typeof view == 'function'){
            view();
        }
    }
}

function logout(){
    alert('logged out')
}
homePage();


