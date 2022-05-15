import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene()
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas as HTMLCanvasElement
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
renderer.render(scene, camera)
const controls = new OrbitControls(camera, renderer.domElement);
function addStar() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill(undefined).map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill(undefined).forEach(addStar);

const skyTexture = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1610505466122-b1d9482901ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80');
scene.background = skyTexture
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(20, 20, 10);
scene.add(pointLight, ambientLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper, gridHelper);
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();