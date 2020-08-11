document.addEventListener('DOMContentLoaded', event => {
    let catHolder = document.querySelector('.cat-pic');
    fetch('/kitten/image')
        .then(res => res.json())
        .then(res => catHolder.setAttribute('src', res.src))

})
