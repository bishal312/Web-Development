import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  75, //fov
  aspectRatio,
  0.1, //near
  1000 //far
);

const canvas = document.getElementById("three"); //main component to present animation
const renderer = new THREE.WebGLRenderer({ canvas }); //renderer
renderer.setSize(window.innerWidth, window.innerHeight); //seting size of device
renderer.setPixelRatio(window.devicePixelRatio); //better sharpness on high-dpi screens
camera.position.z = 5; //camera position to show animation far or near

const earthGroup = new THREE.Group(); //This is used to group two parts
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;

const controls = new OrbitControls(camera, renderer.domElement); //This allow to access orbitcoltrols
controls.enableDamping = true; // This allows us to control component
controls.dampingFactor = 0.03; //it delays and gives sense of wight to the controls

const loader = new THREE.TextureLoader(); //This is used to load texture in geometry
const geometry = new THREE.IcosahedronGeometry(1, 12); // setting geometry
const material = new THREE.MeshStandardMaterial({
  //This is material, Meallic-Roughness workflow
  map: loader.load("./earthmap1k.jpg"), //loading jpg image of earth
});

const lightsMat = new THREE.MeshPhongMaterial({
  map: loader.load("./earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
  transparent: true,
  // color: 0x00ff00
});

const earthMesh = new THREE.Mesh(geometry, material); // using geo and mat to create new earth mesh
earthGroup.add(earthMesh); // adding earth mesh in earth group
scene.add(earthGroup); // adding earthgroup in scene

const lightMesh = new THREE.Mesh(geometry, lightsMat);
lightMesh.scale.set(1.001, 1.001, 1.001); // pushing it slightly above surface
earthMesh.add(lightMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 3, 5); //direction set(x,y,z)
scene.add(directionalLight);

const atmosphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x3399ff,
  transparent: true,
  opacity: 0.2,
  side: THREE.BackSide,
});

// const atmosphere = new THREE.Mesh(
//   new THREE.SphereGeometry(1.05, 32, 32),
//   atmosphereMaterial
// );

// earthGroup.add(atmosphere);

function animate() {
  //this function is animating the components
  window.requestAnimationFrame(animate); //it request and update all changes every mili second
  earthGroup.rotation.y += 0.001; //rotates y
  renderer.render(scene, camera); // render again and again
}

animate(); //animate funcion

window.addEventListener("resize", () => {
  // this function to resize the aspect.
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
