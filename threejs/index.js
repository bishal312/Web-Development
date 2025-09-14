import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  75, //fov
  aspectRatio,
  0.1, //near
  1000 //far
);

const canvas = document.getElementById("three");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader()
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("./earthmap1k.jpg")
});
// const mesh = new THREE.Mesh(geo,mat);
// scene.add(mesh);

const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa55aa);
scene.add(hemiLight);

// const wireMat = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   wireframe: true,
// });
// const wireMesh = new THREE.Mesh(geo,wireMat);
// scene.add(wireMesh);


function animate() {
  window.requestAnimationFrame(animate);
  // earthMesh.rotation.x += 0.01;
  // earthMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  // mesh.rotation.x += 0.01;
  // wireMesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
}

animate();