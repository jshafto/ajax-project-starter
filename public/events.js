// write a function that gets the kitten and sets it
let score = document.querySelector('.score')

const getKitten = () => {
    // edit the loading thing
    let loader = document.querySelector('.loader')
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
            loader.innerHTML = "";
        })
        .catch(err => {
            err.json()
            .then(parsedErr => {
                alert(`Error: ${parsedErr.message}`);
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
            err.json()
            .then(parsedErr => {
                alert(`Error: ${parsedErr.message}`);
            })
        })
}

let upvoteButton = document.getElementById('upvote');
upvoteButton.addEventListener('click', vote)

let downvoteButton = document.getElementById('downvote');
downvoteButton.addEventListener('click', vote)

let catHolder = document.querySelector('.cat-pic');
document.addEventListener('DOMContentLoaded', getKitten)

let picButton= document.getElementById('new-pic')

picButton.addEventListener('click', getKitten)
