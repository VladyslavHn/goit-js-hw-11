import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const list = document.querySelector('.pictures-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getImg().then(data => {
            render(data.hits);
        })
        .catch(error => {
            console.error('Помилка отримання зображень:', error);
        });
    
    
})

function getImg() {
        const searchImg = e.target.elements.input.value;
        const API_KEY = '42193842-675e74ed987999787d4b57f5e';
        const URL = 'https://pixabay.com/api/';
        const PARAMS = new URLSearchParams({
            key: API_KEY,
            q: searchImg,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        })
        return fetch(`${URL}?${PARAMS}`).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}
    

function render(imgs) {
    const markup = imgs.map((img) => {
        return `<li class="gallery-item">
                    <a class="gallery-link" href="${img.largeImageURL}">
                        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
                    </a>
                </li>`.join('');
        list.innerHTML = markup;
    })
}

new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
})






    // setTimeout(() => {
    //     getSearch(img)
    //         .then(data => {
    //             if ((parseInt(data.totalHits) === 0)) {
    //                 iziToast.error({
    //                     message: 'Sorry, there are no images matching your search query. Please try again!',
    //                     position: 'topRight',
    //                     backgroundColor: '#red',
    //                     messageColor: '#white',
    //                 })
    //             }
    //         }
    //     )
    // }, 1000)


//     function getImg(search) {
//         const API_KEY = '42193842-675e74ed987999787d4b57f5e';
//         const URL = 'https://pixabay.com/api/?key='
//         const PARAMS = new URLSearchParams({
//             key: API_KEY,
//             q: search,
//             image_type: photo,
//             orientation: horizontal,
//             safesearch: true,
//         })
//     }
// });

