const backgroundImg = [
    "url(\"/img/wallpaperbetter3.jpg\")","url(\"/img/wallpaperbetter2.jpg\")"
]

const imgBox = document.querySelector(".imgBox");
const backgroundValue = Math.floor(Math.random() * backgroundImg.length);
const url = backgroundImg[backgroundValue];

imgBox.style.backgroundImage = url;
console.log(url);
