// write a function that gets the kitten and sets it
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
            loader.innerHTML = "";
        })
        .catch(err => {
            err.json()
            .then(parsedErr => {
                alert(`something went wrong! Please try again! ${parsedErr.message}`);
            })

        })
};



let catHolder = document.querySelector('.cat-pic');
document.addEventListener('DOMContentLoaded', getKitten)

let picButton= document.getElementById('new-pic')

picButton.addEventListener('click', getKitten)
