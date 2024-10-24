
import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

      // Сцена
      const scene = new THREE.Scene();

      // Камера
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 6); // Позиция камеры внутри параллелепипеда

      // Рендерер
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Геометрия параллелепипеда
      let width = 2, height = 3, depth = 2;
      const geometry = new THREE.BoxGeometry(width, height, depth);
      
      // Материалы для каждой стороны
      const materials = [
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide }), // Левая сторона
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide }), // Правая сторона
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide }), // Верхняя сторона (потолок)
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide }), // Нижняя сторона (пол)
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide }), // Передняя сторона (дверь)
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide })  // Задняя сторона
      ];

      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      // Геометрия и материал для табло
const infoBoardGeometry = new THREE.PlaneGeometry(0.7, 1.5);
const infoBoardMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }); // Изменить на THREE.FrontSide
const infoBoard = new THREE.Mesh(infoBoardGeometry, infoBoardMaterial);

// Устанавливаем позицию табло относительно параллелепипеда
infoBoard.position.set(0.999, 0.5, 0.25); // Поднимаем табло выше до y = 0.5
infoBoard.rotation.y = Math.PI / 2; // Поворачиваем табло, чтобы оно было параллельно стене

// Добавляем табло как дочерний элемент параллелепипеда
cube.add(infoBoard);

// Функция обновления размера лифта
function updateCubeSize() {
    const newWidth = parseFloat(document.getElementById('width').value);
    const newHeight = parseFloat(document.getElementById('height').value);
    const newDepth = parseFloat(document.getElementById('depth').value);

    // Удаляем старую геометрию и создаем новую
    cube.geometry.dispose();
    cube.geometry = new THREE.BoxGeometry(newWidth, newHeight, newDepth);

    // Обновляем позицию табло
    infoBoard.position.set(newWidth / 2 - 0.0001, newHeight / 5.5, 0.25); // Устанавливаем табло на нужную позицию
}

// Отображение первоначальных материалов лифта
function MakeStartLift(){
    loadTexture('./Lift/Стены/texture20.png', 0, "walls")
    loadTexture('./Lift/Стены/texture20.png', 1, "walls")
    loadTexture('./Lift/Стены/texture20.png', 5, "walls")
    loadTexture('./Lift/Потолок/texture21.png', 2, "ceiling")
    loadTexture('./Lift/Пол/texture8.png', 3, "floor")
    loadTexture('./Lift/Двери/texture19.png', 4, "door")
    loadTexture('./Lift/Табло/texture18.png', 0, "board")
}

MakeStartLift();


function loadTexture(imageUrl, index, target) {
    const textureLoader = new THREE.TextureLoader();

    // Загрузка текстуры из URL
    textureLoader.load(imageUrl, (texture) => {
        if (target === 'board') {
            // Применяем текстуру к табло
            infoBoard.material.map = texture;
            infoBoard.material.needsUpdate = true; // Обновляем материал табло
        } else {
            // Применяем текстуру к соответствующей стороне параллелепипеда
            materials[index].map = texture;
            materials[index].color.set(0xffffff); // Устанавливаем цвет в белый
            materials[index].needsUpdate = true; // Обновляем материал
        }
    }, undefined, (error) => {
        console.error('Ошибка загрузки текстуры:', error);
    });
}

/*
function loadTexture(imageUrl, index, target) {
    const textureLoader = new THREE.TextureLoader();

    // Загрузка текстуры из URL
    textureLoader.load(imageUrl, (texture) => {
    
        if (target === 'board') {
            // Применяем текстуру к табло
            infoBoard.material.map = texture;
            infoBoard.material.needsUpdate = true; // Обновляем материал табло
        } else if (target === 'walls' || target === 'floor') {
            // Применяем текстуру к соответствующей стороне параллелепипеда
            // Настройка повторения текстуры
            texture.wrapS = THREE.RepeatWrapping; // Повтор по горизонтали
            texture.wrapT = THREE.RepeatWrapping; // Повтор по вертикали
            texture.repeat.set(2, 2); // Количество повторений (можете изменить на нужное)
    
            materials[index].map = texture;
            materials[index].color.set(0xffffff); // Устанавливаем цвет в белый
            materials[index].needsUpdate = true; // Обновляем материал
        }
        else{
            materials[index].map = texture;
            materials[index].color.set(0xffffff); // Устанавливаем цвет в белый
            materials[index].needsUpdate = true; // Обновляем материал
        }
    }, undefined, (error) => {
        console.error('Ошибка загрузки текстуры:', error);
    });
    } */
    export { loadTexture };

      // Добавляем обработчики событий для ползунков
      document.getElementById('width').addEventListener('input', updateCubeSize);
      document.getElementById('height').addEventListener('input', updateCubeSize);
      document.getElementById('depth').addEventListener('input', updateCubeSize);

      // Управление камерой
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;

 
// Анимация
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Получаем направление на камеру
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // Нормаль левой стенки (если табло прикреплено к ней)
    const wallNormal = new THREE.Vector3(-1, 0, 0); // Нормаль для левой стенки

    // Вычисляем скалярное произведение между нормалью и направлением на камеру
    const dotProduct = wallNormal.dot(cameraDirection);

    // Устанавливаем порог для видимости (например, -0.1 для некоторой гибкости)
    const visibilityThreshold = 0.1;

    // Табло будет видно, если стенка обращена к камере
    infoBoard.visible = dotProduct < visibilityThreshold;

    renderer.render(scene, camera);
}
      animate();

      // Обработка изменения размеров окна
      window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
      });