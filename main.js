import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.BoxGeometry(8,8,8);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: false});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)
const ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient)

const controls = new OrbitControls(camera, renderer.domElement);

function addstar(){
  const geometry = new THREE.SphereGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addstar)

const spacetexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spacetexture;

const sponge = new THREE.TextureLoader().load('cube.png');

const spongecube = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: sponge})
)
scene.add(spongecube)

spongecube.position.y += 10;

const fauna = new THREE.TextureLoader().load('earth.png');
const fsquare = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: fauna})
)
scene.add(fsquare);
fsquare.position.x += 10;
const round = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map: fauna})
)
scene.add(round)
round.position.x -= 10;
function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  round.rotation.y += 0.01
}

animate();