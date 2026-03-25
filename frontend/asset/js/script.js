import * as THREE from "three";

const app = document.querySelector("#canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: app,
  antialias: true,
  alpha: true
});
renderer.setSize(500, 500);
renderer.setAnimationLoop(animate);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight(0xff0055, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const environmentLight = new THREE.AmbientLight(0x404040);
scene.add(environmentLight);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera); 
}