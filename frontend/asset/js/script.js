import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

const app = document.querySelector("#canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#e5d0ff");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.y = 0.2;
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({
  canvas: app,
  antialias: true
});
renderer.setSize(500, 500);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8;

// Opcional
renderer.useLegacyLights = false;

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableDamping = true;
controls.autoRotateSpeed = 0.5;
controls.rotateSpeed = 0.5;
controls.minDistance = 2;
controls.maxDistance = 10;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  // roughness: 0.2,
  // metalness: 0.8
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const directionalLight = new THREE.DirectionalLight(0x5b48d9, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const environmentLight = new THREE.AmbientLight(0x404040);
scene.add(environmentLight);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera); 
}