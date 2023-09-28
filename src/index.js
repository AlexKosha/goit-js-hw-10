import axios from 'axios';
import {fetchBreeds ,fetchCatByBreed} from './js/cat-api.js';
import Notiflix, { Notify } from 'notiflix';

axios.defaults.headers.common['x-api-key']= 'live_bhjUdxcI1QxvsIsUnHuPTh3P4g76Z6r6nZuDeDnfWC1wVk8FdvGeWzjb3kQIDaAh'

const refs ={
    select : document.querySelector('.breed-select'),
    catInfo : document.querySelector('.cat-info'),
    loader : document.querySelector('.loader'),
    errorMsg :document.querySelector('.error')
}

fetchBreeds()
.then(markupOprions)
.catch(errorMsg)

refs.select.addEventListener('change', onChangeInfo)
  
function errorMsg() {
    Notify.failure(refs.errorMsg.textContent)
    refs.catInfo.classList.add('hidden')
    refs.select.classList.add('hidden')
}

function markupOprions (data) {
    data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.select.appendChild(option)
})}

function onChangeInfo() {
    const breedId = refs.select.value

    loaderMsg()

    fetchCatByBreed(breedId)
    .then(markupCatInfo)
    .catch(errorMsg);

};

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

function loaderMsg() {
    refs.loader.classList.toggle('hidden')
    refs.catInfo.classList.toggle('hidden')
}