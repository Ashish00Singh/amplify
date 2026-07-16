"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Herovideo.module.css";



const GRID_SIZE = 20;
const MOUSE_RADIUS = 0.25;
const STRENGTH = 0.1;
const RELAXATION = 0.925;
const DISPLACEMENT = 0.015;
const ABERRATION = 0.15;

interface HeroVideoProps {
  src?: string;
}

export default function HeroVideo({
  src = "./AMP-Banner-LP-compressed.mp4",
}: HeroVideoProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };

    let width = hero.offsetWidth;
    let height = hero.offsetHeight;
    let gridX = 0;
    let gridY = 0;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.classList.add(styles.heroCanvas);
    hero.appendChild(renderer.domElement);

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.generateMipmaps = false;
    video.style.opacity = "0";

    function createDataTexture(): THREE.DataTexture {
      const aspect = width / height;
      gridX = aspect >= 1 ? Math.round(GRID_SIZE * aspect) : GRID_SIZE;
      gridY = aspect >= 1 ? GRID_SIZE : Math.round(GRID_SIZE / aspect);

      const data = new Float32Array(gridX * gridY * 4);
      const texture = new THREE.DataTexture(
        data,
        gridX,
        gridY,
        THREE.RGBAFormat,
        THREE.FloatType
      );
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      texture.needsUpdate = true;
      return texture;
    }

    let dataTexture = createDataTexture();

    function getCoverScale(): [number, number] {
      const videoAspect = (video!.videoWidth || 16) / (video!.videoHeight || 9);
      const containerAspect = width / height;
      const scaleX =
        containerAspect < videoAspect ? videoAspect / containerAspect : 1;
      const scaleY =
        containerAspect > videoAspect ? containerAspect / videoAspect : 1;
      return [2 * scaleX, 2 * scaleY];
    }

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: videoTexture },
        uDataTexture: { value: dataTexture },
      },
      vertexShader: `
varying vec2 vUv;
void main(){
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
      fragmentShader: `
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
varying vec2 vUv;
void main(){
vec4 offset = texture2D(uDataTexture, vUv);
vec2 shift = ${DISPLACEMENT} * offset.rg;
vec2 split = shift * ${ABERRATION};

float r = texture2D(uTexture, vUv - shift + split).r;
float g = texture2D(uTexture, vUv - shift).g;
float b = texture2D(uTexture, vUv - shift - split).b;

gl_FragColor = vec4(r, g, b, 1.0);
}
`,
    });

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(...getCoverScale()),
      material
    );
    scene.add(mesh);

    const handleLoadedData = () => {
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(...getCoverScale());
    };
    video.addEventListener("loadeddata", handleLoadedData);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      mouse.vX = x - mouse.x;
      mouse.vY = y - mouse.y;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = x;
      mouse.y = y;
    };
    hero.addEventListener("mousemove", handleMouseMove);

    function updateDataTexture() {
      const data = dataTexture.image.data as Float32Array;

      for (let i = 0; i < data.length; i += 4) {
        data[i] *= RELAXATION;
        data[i + 1] *= RELAXATION;
      }

      const gridMouseX = gridX * mouse.x;
      const gridMouseY = gridY * (1 - mouse.y);
      const maxDist = GRID_SIZE * MOUSE_RADIUS;

      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
          const distancesSq = (gridMouseX - i) ** 2 + (gridMouseY - j) ** 2;
          if (distancesSq >= maxDist * maxDist) continue;

          const index = 4 * (i + gridX * j);
          const power = Math.min(10, maxDist / Math.sqrt(distancesSq));
          data[index] += STRENGTH * 100 * mouse.vX * power;
          data[index + 1] -= STRENGTH * 100 * mouse.vY * power;
        }
      }

      mouse.vX *= 0.9;
      mouse.vY *= 0.9;
      dataTexture.needsUpdate = true;
    }

    const handleResize = () => {
      width = hero.offsetWidth;
      height = hero.offsetHeight;

      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(...getCoverScale());

      dataTexture.dispose();
      dataTexture = createDataTexture();
      material.uniforms.uDataTexture.value = dataTexture;
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    renderer.setAnimationLoop(() => {
      updateDataTexture();
      renderer.render(scene, camera);
    });

    // Cleanup on unmount (important in React/Next — avoids leaked
    // WebGL contexts, listeners, and animation loops on navigation).
    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", handleResize);
      hero.removeEventListener("mousemove", handleMouseMove);
      video.removeEventListener("loadeddata", handleLoadedData);

      mesh.geometry.dispose();
      material.dispose();
      videoTexture.dispose();
      dataTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === hero) {
        hero.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef as React.RefObject<HTMLElement>}>
      <video
        className={styles.heroVideo}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        src={src}
      />
    </section>
  );
}