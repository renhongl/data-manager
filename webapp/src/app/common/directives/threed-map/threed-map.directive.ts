import { Directive, ElementRef, AfterViewInit, Output, EventEmitter, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
import OrbitControls from 'threejs-orbit-controls';
import { MTLLoader, OBJLoader } from 'mtl-obj-loader';

@Directive({
  selector: '[appThreedMap]'
})
export class ThreedMapDirective implements OnInit, AfterViewInit {

  camera: any;
  scene: any;
  renderer: any;
  controls: any;
  building: any;
  raycaster: any;
  mouse: any;
  objects = [];
  rollOverMesh: any;
  isShiftDown = false;
  plane: any;
  cubeGeo: any;

  @Input() animateFn: () => void;

  @Output() mapReady = new EventEmitter();

  constructor(private ele: ElementRef) {
  }

  ngOnInit(): void {
    this.renderMap();
  }

  ngAfterViewInit(): void {
    this.addRollOver();
    // this.addGrid();
    this.addPlane();

    this.loadBuilding();
    this.mapReady.emit({
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
    });
  }

  addGrid() {
    const gridHelper = new THREE.GridHelper(1000, 20);
    this.scene.add(gridHelper);
  }

  addRollOver() {
    const rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    const rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    const rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    this.scene.add(rollOverMesh);
    this.rollOverMesh = rollOverMesh;
  }

  loadBuilding(path: string = 'assets/models/247_House 15_obj.obj') {
    const objLoader = new OBJLoader();
    objLoader.load(path, (object) => {
      object.scale.set(5, 5, 5);
      this.scene.add(object);
      this.building = object;
      this.objects.push(object);
    });
  }

  renderMap(): void {
    const { scene, camera, renderer, controls, raycaster, mouse } = this.init();
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;
    this.raycaster = raycaster;
    this.mouse = mouse;
    this.animate();

  }

  addLight(scene) {
    const ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffd254);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);
  }

  addControl(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    return controls;
  }

  addCamera(width, height) {
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  addRenderer(container, width, height) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', (e) => this.onDocumentMouseMove(e, width, height, container), false);
    document.addEventListener('mousedown', (e) => this.onDocumentMouseDown(e, width, height, container), false);
    document.addEventListener( 'keydown', (e) => this.onDocumentKeyDown(e), false );
    document.addEventListener( 'keyup', (e) => this.onDocumentKeyUp(e), false );
    return renderer;
  }

  addPlane() {
    const geometry = new THREE.PlaneBufferGeometry(10000, 10000);
    geometry.rotateX(- Math.PI / 2);
    const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: true, color: 0x383838 }));
    this.scene.add(plane);
    this.objects.push(plane);
    this.plane = plane;
    const cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    this.cubeGeo = cubeGeo;
  }

  addScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    return scene;
  }

  addRay() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    return {
      raycaster,
      mouse,
    };
  }

  init() {
    const container = this.ele.nativeElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const scene = this.addScene();
    const renderer = this.addRenderer(container, width, height);
    const camera = this.addCamera(width, height);
    const controls = this.addControl(camera, renderer);
    const { raycaster, mouse } = this.addRay();
    this.addLight(scene);

    return {
      scene,
      camera,
      renderer,
      controls,
      raycaster,
      mouse,
    };
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    if (this.animateFn) {
      this.animateFn();
    }
    this.renderer.render(this.scene, this.camera);
  }

  onDocumentMouseDown(event, width, height, container) {
    event.preventDefault();
    this.mouse.set(((event.clientX - container.offsetLeft) / width) * 2 - 1, - ((event.clientY - container.offsetTop) / height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      // delete cube
      if (this.isShiftDown) {
        if (intersect.object !== this.plane) {
          this.scene.remove(intersect.object);
          this.objects.splice(this.objects.indexOf(intersect.object), 1);
        }
        // create cube
      } else {
        const voxel = new THREE.Mesh(this.cubeGeo);
        voxel.position.copy(intersect.point).add(intersect.face.normal);
        voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        this.scene.add(voxel);
        this.objects.push(voxel);
      }
    }
  }

  onDocumentMouseMove(event, width, height, container) {
    event.preventDefault();
    this.mouse.set(((event.clientX - container.offsetLeft) / width) * 2 - 1, - ((event.clientY - container.offsetTop) / height) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      this.rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
      this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }
  }

  onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 16: this.isShiftDown = true; break;
    }
  }

  onDocumentKeyUp( event ) {
    switch ( event.keyCode ) {
      case 16: this.isShiftDown = false; break;
    }
  }

}
