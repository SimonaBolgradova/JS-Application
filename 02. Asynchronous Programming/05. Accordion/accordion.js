async function solution() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const res = await fetch(url);
    const data = await res.json();
     
    console.log(data)
    data.forEach(el => {
        let div = e('div','',['class','accordion']);
        let divHead = e('div', '',['class','head'])
        let span = e('span',el.title);

        divHead.appendChild(span);
        div.appendChild(divHead);
        document.querySelector('main').appendChild(div);

    });
    function e(type,content,attributes =[]){
        const element = document.createElement(type);
        if(content){
            element.textContent = content;
        }
        if(attributes.length>0){
            for(let i =0;i<attributes.length;i+=2){
                element.setAttribute(attributes[i],attributes[i+1])
            }
        }
        return element;
    }
}
solution();
