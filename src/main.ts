import './style.css'

import * as THREE from 'three';

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
camera.position.z = 30;
renderer.render(scene, camera)