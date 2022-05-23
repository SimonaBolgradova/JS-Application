function attachEvents() {

    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}
attachEvents();

async function getPosts() {
    const post = `http://localhost:3030/jsonstore/blog/posts`;
    const response = await fetch(post);
    const data = await response.json();

    const select = document.getElementById('posts');
    Object.values(data).map(createOption).forEach(o => {
        select.appendChild(o)
    });
};

function createOption(post) {
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;

    return result;
}

function displayPost() {
    const postId = document.getElementById('posts').value;
    getCommentsByPostId(postId);
}

async function getCommentsByPostId(postId) {
    const postComments = document.querySelector('#post-comments');
    postComments.innerHTML = '';

    const postURL = `http://localhost:3030/jsonstore/blog/posts` + postId;
    const commentsURL = `http://localhost:3030/jsonstore/blog/comments`;

    const [postResponse, commentsResponse] = await Promise.all([
        fetch(postURL),
        fetch(commentsURL)
    ])
    const postData = await postResponse.json();

    document.getElementById('post-title').textContent = postData.title;
    document.querySelector('post-body').textContent = postData.body;

    const commentsData = await commentsResponse.json();
    const comments = Object.values(commentsData).filter(c => c.postId == postId);
    
    comments.map(createComment).forEach(c => {
        postComments.appendChild(c)
    });

    function createComment(comment) {
        const result = document.createElement('li');
        result.textContent = comment.text;
        result.id = comment.id;
        return result;
    }
}



