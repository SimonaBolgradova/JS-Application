function solve(){
    const section = document.querySelector('.new-topic-border');
    const form = section.querySelector('form');
    form.addEventListener('submit',CreateTopic);
    
    document.querySelector('.answer > form').addEventListener('submit',CreateComment);
    document.querySelector('.cancel').addEventListener('click',CancelTopic);
    document.querySelector('li>a').addEventListener('click',function (ev){
        ev.preventDefault();
        document.querySelector('main').style.display = 'block';
        themeConetent.style.display = 'none';
    })
    document.querySelector('.topic-container').addEventListener('click',Redirect);

    
    const themeConetent = document.querySelector('.theme-content');
    themeConetent.style.display = 'none';

    

    async function CreateTopic(ev){
        ev.preventDefault();
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        const formData = new FormData(form);
        const title = formData.get('topicName');
        const username = formData.get('username');
        const content = formData.get('postText');
        if(title!==""&&username!==''&&content!==''){
            let data = {title,username,content,dateTime};
        const x =  await request('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
              });
              let topic = e('div',{id:x._id,className:'topic-name-wrapper'},e('div',{className:'topic-name'},e('a',{href:'#',className:'normal'},e('h2',{},title),e('div',{className:'columns'},e('div',{},e('p',{},'Date: ',e('time',{},dateTime)),e('div',{className:'nick-name'},e('p',{},'Username: ',e('span',{},username))))))))
                document.querySelector('.topic-container').appendChild(topic);
        }
        form.reset();
    }
    async function visualisePosts(){
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        const data = await res.json();
        console.log(Object.values(data))
        Object.values(data).forEach(x=>{
            let topic = e('div',{id:x._id,className:'topic-name-wrapper'},e('div',{className:'topic-name'},e('a',{href:'#',className:'normal'},e('h2',{},x.title),e('div',{className:'columns'},e('div',{},e('p',{},'Date: ',e('time',{},x.dateTime)),e('div',{className:'nick-name'},e('p',{},'Username: ',e('span',{},x.username))))))))
            document.querySelector('.topic-container').appendChild(topic);
        })
    }
    visualisePosts();



    async function Redirect(ev){
        ev.preventDefault();
        if(ev.target.tagName=='H2'){
            const post = ev.target.parentNode.parentNode.parentNode;
            document.querySelector('main').style.display = 'none';
            themeConetent.style.display = 'block';
            document.querySelector('.theme-name > h2').textContent = ev.target.textContent;
            const username = post.querySelector('.nick-name > p > span').textContent;
            const time = post.querySelector('.columns > div > p > time').textContent;
            const id = post.getAttribute('id');
            const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts/'+id);
            const data = await res.json();
            const postContent = data.content;
            let comment = e('div',{className:'comment'},e('div',{className:'header'},e('img',{src:'./static/profile.png',alt:'avatar'},''),e('p',{},e('span',{},username),' posted on ',e('time',{},time)),e('p',{className:'post-content'},postContent)));
            themeConetent.appendChild(comment);
        }
    }
    async function visualiseComments (){
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
        const data = await res.json();
        Object.values(data).forEach(x=>{
            let comment = e('div',{id:'user-comment'},e('div',{className:'topic-name-wrapper'},e('div',{className:'topic-name'},e('p',{},e('strong',{},x.username),' commented on ',e('time',{},x.dateTime)),e('div',{className:'post-content'},x.postText))));
            document.querySelector('.comment').appendChild(comment);
        })
    }
    visualiseComments();
    async function CreateComment(ev){
        ev.preventDefault();
        const formData = new FormData(form2);
        const postText = formData.get('postText');
        const username = formData.get('username');
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        let data = {postText,username,dateTime};
        if(postText!==''&& username!=''){
            const x =  await request('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
                  });
    
                  let comment = e('div',{id:'user-comment'},e('div',{className:'topic-name-wrapper'},e('div',{className:'topic-name'},e('p',{},e('strong',{},username),' commented on ',e('time',{},dateTime)),e('div',{className:'post-content'},postText))));
                  document.querySelector('.comment').appendChild(comment);
                  form2.reset();
        }           
    }
    
    function CancelTopic(){
        form.reset();
    }

    async function request(url, options) {
        const response = await fetch(url, options);
        if (response.ok != true) {
            const error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }
        const data = await response.json();
        return data;
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
solve()