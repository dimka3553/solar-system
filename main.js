import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { TorusGeometry } from "three";

// Setup

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("bg.png");
scene.background = spaceTexture;

// Textures

const sunTexture = new THREE.TextureLoader().load("sun.jpg");
const mercuryTexture = new THREE.TextureLoader().load("mercury.jpg");
const venusTexture = new THREE.TextureLoader().load("venus.jpg");
const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const marsTexture = new THREE.TextureLoader().load("mars.webp");
const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");
const saturnTexture = new THREE.TextureLoader().load("saturn.png");
const ringTextureOne = new THREE.TextureLoader().load("rings1.png");
const ringTextureTwo = new THREE.TextureLoader().load("rings2.png");
const ringTextureThree = new THREE.TextureLoader().load("rings3.png");
const uranusTexture = new THREE.TextureLoader().load("uranus.webp");
const neptuneTexture = new THREE.TextureLoader().load("neptune.jpg");
const plutoTexture = new THREE.TextureLoader().load("pluto.webp");

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(6, 60, 60),
  new THREE.MeshStandardMaterial({ map: sunTexture })
);
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 60, 60),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
);
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 60, 60),
  new THREE.MeshStandardMaterial({ map: venusTexture })
);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 60, 60),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 60, 60),
  new THREE.MeshStandardMaterial({ map: marsTexture })
);

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5, 60, 60),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
);

let saturn;
let rings = [];

let createSaturn = function () {
  let geometry = new THREE.SphereGeometry(4, 30, 30);
  let material = new THREE.MeshBasicMaterial({ map: saturnTexture });

  saturn = new THREE.Mesh(geometry, material);
  scene.add(saturn);

  geometry = new THREE.TorusGeometry(5.1, 0.7, 2, 100);
  material = new THREE.MeshBasicMaterial({
    map: ringTextureOne,
    transparent: true,
  });
  let ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  geometry = new THREE.TorusGeometry(6.9, 0.7, 2, 100);
  material = new THREE.MeshBasicMaterial({
    map: ringTextureTwo,
    transparent: true,
  });
  ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  geometry = new THREE.TorusGeometry(8.5, 0.7, 2, 100);
  material = new THREE.MeshBasicMaterial({
    map: ringTextureThree,
    transparent: true,
  });
  ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  saturn.rotation.x = 0;

  rings.forEach((ring) => {
    ring.rotation.x = -1.7;
    ring.rotation.y = -0.0;
    saturn.add(ring);
  });
};

createSaturn();

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 60, 60),
  new THREE.MeshStandardMaterial({ map: uranusTexture })
);

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 60, 60),
  new THREE.MeshStandardMaterial({ map: neptuneTexture })
);

const pluto = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 60, 60),
  new THREE.MeshStandardMaterial({ map: plutoTexture })
);

scene.add(
  sun,
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
  pluto
);

const cloudsTexture = new THREE.TextureLoader().load("clouds.png");

const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(3.01, 60, 60),
  new THREE.MeshBasicMaterial({ map: cloudsTexture, transparent: true })
);

scene.add(clouds);

sun.position.z = -8;
sun.position.x = 0;

mercury.position.z = -8;
mercury.position.x = 20;

venus.position.z = -8;
venus.position.x = 40;

earth.position.z = -8;
earth.position.x = 60;

clouds.position.z = -8;
clouds.position.x = 60;

mars.position.z = -8;
mars.position.x = 80;

jupiter.position.z = -8;
jupiter.position.x = 100;

saturn.position.z = -10;
saturn.position.x = 120;

uranus.position.z = -8;
uranus.position.x = 140;

neptune.position.z = -8;
neptune.position.x = 160;

pluto.position.z = -8;
pluto.position.x = 180;

// Scroll Animation

function moveCamera(t) {
  gsap.to(camera.position, { x: t * 20 - 4, duration: 0.5 });
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.005;
  mercury.rotation.y += 0.005;
  venus.rotation.y += 0.005;
  earth.rotation.y += 0.005;
  clouds.rotation.y += 0.008;
  mars.rotation.y += 0.005;
  jupiter.rotation.y += 0.005;
  saturn.rotation.y += 0.005;
  uranus.rotation.y += 0.005;
  neptune.rotation.y += 0.005;
  pluto.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

addEventListener("resize", (event) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

let buttons = document.querySelectorAll("button");
let slides = document.querySelectorAll(".slide");

let activeSlide = 0;

buttons[0].addEventListener("click", () => {
  left();
});

buttons[1].addEventListener("click", () => {
  right();
});

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "37") {
    left();
  } else if (e.keyCode == "39") {
    right();
  }
}

function right() {
  if (activeSlide < slides.length - 1) {
    slides[activeSlide].classList.remove("current");
    slides[activeSlide].classList.add("passed");
    slides[activeSlide + 1].classList.add("current");
    activeSlide += 1;
    moveCamera(activeSlide);
  }
}
function left() {
  if (activeSlide > 0) {
    slides[activeSlide].classList.remove("current");
    slides[activeSlide - 1].classList.remove("passed");
    slides[activeSlide - 1].classList.add("current");
    activeSlide -= 1;
    moveCamera(activeSlide);
  }
}
