import axios from 'axios';
import {fetchBreeds ,fetchCatByBreed} from './js/cat-api.js';
import Notiflix, { Notify } from 'notiflix';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key']= 'live_bhjUdxcI1QxvsIsUnHuPTh3P4g76Z6r6nZuDeDnfWC1wVk8FdvGeWzjb3kQIDaAh'

const refs ={
    select : document.querySelector('.breed-select'),
    catInfo : document.querySelector('.cat-info'),
    loader : document.querySelector('.loader'),
    errorMsg :document.querySelector('.error')
}

const select = new SlimSelect({
    select: '.breed-select',
})

let firstChange = true;

fetchBreeds()
.then(markupOptions)
.catch(errorMsg)

refs.select.addEventListener('change', onChangeInfo)

function markupOptions (data) {
    const options = data.map(breed => ({
        text: breed.name,
        value: breed.id
}))
select.setData(options)
loaderMsg()
}

function onChangeInfo() {
    if (!firstChange) {
        InfoPage();
    }else{
        firstChange = false;
    }
};

function InfoPage() {
    const breedId = refs.select.value
console.log(breedId)
    loaderMsg()

    fetchCatByBreed(breedId)
    .then(markupCatInfo)
    .catch(errorMsg);
    console.log(breedId)
}

function markupCatInfo(catData) {
    loaderMsg()
    refs.catInfo.innerHTML = markingCatInfo(catData);
}

function markingCatInfo (data){
    return `
    <img src="${data.url}" alt="${data.breeds[0].name}">
    <div class="box-info">
    <h2 class="cat-title">${data.breeds[0].name}</h2>
    <p class="text-des">${data.breeds[0].description}</p>
    <p >
    <span class="text-tem">Temperament:</span> ${data.breeds[0].temperament}
    </p>
    </div> 
`
}

function errorMsg() {
    Notify.failure(refs.errorMsg.textContent)
    refs.loader.classList.add('hidden')
    refs.select.classList.add('hidden')
    refs.catInfo.classList.add('hidden')
}

function loaderMsg(){
    refs.loader.classList.toggle('hidden')
    refs.select.classList.remove('hidden')
    refs.catInfo.classList.toggle('hidden')
}


