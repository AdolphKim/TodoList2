const text = [
    {
        quote : "다시 돌아갈 힘을 남겨두지말고 모든걸 걸어라",
        author : "멘탈훈련소"
    },
    {
        quote : "하면된다.  타고나는것이아니다.",
        author : "멘탈훈련소"
    },
    {
        quote : "보여주고싶다면 그냥 결과로 보여주세요.",
        author : "동기부여학과"
    }
]

const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const randomValue = Math.floor(Math.random() * text.length);

const thisQuote = text[randomValue].quote;
const thisAuthor = text[randomValue].author;

quote.innerText = thisQuote;
author.innerText = thisAuthor;