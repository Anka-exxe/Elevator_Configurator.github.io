import { loadTexture } from './tree.js';

const images = {
    walls: [
        './Lift/Стены/texture4.png', 
        './Lift/Стены/texture6.png', 
        './Lift/Стены/texture10.png', 
        './Lift/Стены/texture20.png',
        './Lift/Стены/сталька2.png',
        './Lift/Стены/deco_16.png'
    ],
    ceiling: [
        './Lift/Потолок/texture13.png', 
        './Lift/Потолок/texture14.png', 
        './Lift/Потолок/texture15.png', 
        './Lift/Потолок/texture21.png'
    ],
    floor: [
        './Lift/Пол/texture5.png', 
        './Lift/Пол/texture7.png', 
        './Lift/Пол/texture12.png', 
        './Lift/Пол/texture8.png'
    ],
    board: [
        './Lift/Табло/texture16.png', 
        './Lift/Табло/texture17.png', 
        './Lift/Табло/texture18.png'
    ],
    door: [
        './Lift/Двери/texture11.png',
        './Lift/Двери/texture22.png', 
        './Lift/Двери/texture19.png',
    ]
};

window.showImages = function(element) { // Делает функцию доступной в глобальной области
    const content = document.getElementById('content');
    content.innerHTML = ''; // Очищаем предыдущие изображения
    images[element].forEach((image, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${element} image`;
        imgContainer.appendChild(img);
        content.appendChild(imgContainer);

        if (element === 'door'){
            img.addEventListener('click', () => {
                loadTexture(image, 4, element);
            });
        }
        else if(element === 'ceiling'){
            img.addEventListener('click', () => {
                loadTexture(image, 2, element);
            });
        }
        else if(element === 'walls'){
            img.addEventListener('click', () => {
                loadTexture(image, 0, element);
                loadTexture(image, 1, element);
                loadTexture(image, 5, element);
            });
        }
        else if(element === 'floor'){
            img.addEventListener('click', () => {
                loadTexture(image, 3, element);
            });
        }
        else if(element === 'board'){
            img.addEventListener('click', () => {
                loadTexture(image, 0, element);
            });
        }
    });
};