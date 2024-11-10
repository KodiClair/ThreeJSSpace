import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0,20,30);

renderer.render(scene,camera);

const earthTexture = new THREE.TextureLoader().load('./Media/earth_half_day_half_night.jpg');
const normalTexture = new THREE.TextureLoader().load('./Media/normal.png');

const geometry = new THREE.TorusGeometry(20);
const material = new THREE.MeshBasicMaterial( {color: 0xFFD700, wireframe: true} );
const torus1 = new THREE.Mesh(geometry, material);
const torus2 = new THREE.Mesh(geometry, material);
const torus3 = new THREE.Mesh(geometry, material);

scene.add(torus1);
scene.add(torus2);
scene.add(torus3);

torus2.rotateX(90);
torus3.rotateX(-90);
torus2.rotateY(90);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);

scene.add(earth);

const pointLight = new THREE.PointLight(0xFFFFFF, 10);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,5);

const controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 35;
controls.maxDistance = 350;

pointLight.position.set(5,15,5);

scene.add(pointLight, ambientLight);
// scene.add(lightHelper, gridHelper);

function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.25);
  const starMaterial = new THREE.MeshStandardMaterial({color:0xffffff, emissiveIntensity: 0xffffff});
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);


const ft = new THREE.TextureLoader().load("./Media/corona_ft.png");
const bk = new THREE.TextureLoader().load("./Media/corona_bk.png");
const up = new THREE.TextureLoader().load("./Media/corona_up.png");
const dn = new THREE.TextureLoader().load("./Media/corona_dn.png");
const rt = new THREE.TextureLoader().load("./Media/corona_rt.png");
const lf = new THREE.TextureLoader().load("./Media/corona_lf.png");


const skyboxft = new THREE.Mesh(
  new THREE.BoxGeometry(5000,5000),
  new THREE.MeshStandardMaterial({
    map: ft
  })
);

const skyboxbk = new THREE.Mesh(
  new THREE.BoxGeometry(5000,5000),
  new THREE.MeshStandardMaterial({
    map: bk
  })
);

const skyboxdn = new THREE.Mesh(
  new THREE.BoxGeometry(5000,5000),
  new THREE.MeshStandardMaterial({
    map: dn
  })
);

const skyboxlf = new THREE.Mesh(
  new THREE.BoxGeometry(5000,5000),
  new THREE.MeshStandardMaterial({
    map: lf
  })
);

const skyboxup = new THREE.Mesh(
  new THREE.BoxGeometry(5000,5000),
  new THREE.MeshStandardMaterial({
    map: up
  })
);

const skyboxrt = new THREE.Mesh(
  new THREE.BoxGeometry(5000,5000),
  new THREE.MeshStandardMaterial({
    map: rt
  })
);

skyboxft.position.set(0,0,2500);
skyboxbk.position.set(0,0,-2500);
skyboxdn.position.set(0,-2500,0);
skyboxdn.rotateX(-90*(1/180)*Math.PI);
skyboxup.position.set(0,2500,0);
skyboxup.rotateX(-90*(1/180)*Math.PI);
skyboxlf.position.set(-2500,0,0);
skyboxlf.rotateY(-90*(1/180)*Math.PI);
skyboxrt.position.set(2500,0,0);
skyboxrt.rotateY(-90*(1/180)*Math.PI);

scene.add(skyboxft, skyboxbk, skyboxdn, skyboxup, skyboxlf, skyboxrt);


function animate() {      //renders the scene
  earth.rotateX(0.0005);
  earth.rotateY(0.00001);
  earth.rotateZ(0.0005);

  torus1.rotateX(0.0015);
  torus1.rotateY(0.0005);
  // torus1.rotateZ(0.0015);

  torus2.rotateX(0.001);
  torus2.rotateY(0.0003);
  // torus2.rotateZ(0.001);

  torus3.rotateX(0.0005);
  torus3.rotateY(0.0015);
  // torus3.rotateZ(0.001);

  controls.update();

  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

animate();
