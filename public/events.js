// write a function that gets the kitten and sets it
let score = document.querySelector('.score')
let commentBox = document.querySelector('.comments');
let loader = document.querySelector('.loader');
let input = document.getElementById('user-comment');
let errorDiv = document.querySelector('.error');
let catHolder = document.querySelector('.cat-pic');

function clearInput() {
    input.value = '';
}

const getKitten = () => {
    // edit the loading thing
    loader.innerHTML = "Loading..."


    fetch('/kitten/image')
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(res => {
            catHolder.setAttribute('src', res.src);
            score.innerHTML = res.score;
            commentBox.innerHTML = '';
            loader.innerHTML = '';
            clearInput();
        })
        .catch(err => {
            err.json()
            .then(parsedErr => {
                errorDiv.innerHTML = parsedErr.message;
                loader.innerHTML = '';
            })

        })
};

const vote = (event) => {
    // patch request from server kitten/upvote
    fetch(`/kitten/${event.target.id}`, {method: 'PATCH'})
        .then(res => {
            if (!res.ok){
                throw res;
            }
            return res.json();
        })
        .then(res => {
            score.innerHTML = res.score
        })
        .catch(err =>  {
            errorDiv.innerHTML = 'Error: Voting failed.'
        })
}

let form = document.querySelector('.comment-form');

const renderComments = arr => {
    commentBox.innerHTML = '';
    arr.comments.forEach((string,id) => {
        let newDiv = document.createElement('div');
        let textSpan =document.createElement('span');
        textSpan.innerHTML = string;
        newDiv.appendChild(textSpan);
        newDiv.setAttribute('class', 'comment-str');
        commentBox.appendChild(newDiv);
        let buttonDiv = document.createElement('button');
        buttonDiv.setAttribute('id', `delete-${id}`);
        buttonDiv.setAttribute('class', `delete-button`);
        buttonDiv.innerHTML = '❌';
        newDiv.appendChild(buttonDiv);
    })
}

const submitComment = (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    let newComment = formData.get('user-comment');
    // console.log(newComment)
    let data = JSON.stringify({comment: newComment});
    let options = {
        method: 'POST',
        body: data,
        headers: {
			"Content-type":"application/json"
		}
    }
    clearInput();
    fetch('/kitten/comments', options)
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(renderComments)
        .catch(err =>errorDiv.innerHTML = 'Error: Comment failed.')
}

const deleteHandler = event => {
    if (event.target.getAttribute('class')!=='delete-button') return;
    let id = event.target.id.slice(7);
    fetch(`kitten/comments/${id}`,  { method: "DELETE" })
    .then(res => {
        if (!res.ok) {
            throw res;
        }
        return res.json();
    })
    .then(renderComments)
    .catch(err =>errorDiv.innerHTML = 'Error: Delete comment failed.')
}

form.addEventListener('submit', submitComment)

let upvoteButton = document.getElementById('upvote');
upvoteButton.addEventListener('click', vote)

let downvoteButton = document.getElementById('downvote');
downvoteButton.addEventListener('click', vote)


document.addEventListener('DOMContentLoaded', getKitten)

// let picButton= document.getElementById('new-pic')

// picButton.addEventListener('click', getKitten)
catHolder.addEventListener('click', getKitten)

commentBox.addEventListener('click', deleteHandler)
