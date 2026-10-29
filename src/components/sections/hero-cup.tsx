"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
/** Isolated WebGL enhancement. A photo remains visible if WebGL is unavailable. */
export default function HeroCup() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const media = matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (!media.matches) return;
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 1, 5);
      camera.lookAt(0, 0, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const key = new THREE.DirectionalLight(0xc69c6d, 2);
      key.position.set(5, 5, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 1);
      fill.position.set(-5, -2, -5);
      scene.add(fill);
      const cup = new THREE.Group();
      const ceramic = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.1,
        metalness: 0.5,
      });
      cup.add(new THREE.Mesh(new THREE.CylinderGeometry(1, 0.8, 2, 32), ceramic));
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 16, 32, Math.PI), ceramic);
      handle.position.x = 0.9;
      handle.rotation.z = Math.PI / 2;
      cup.add(handle);
      const coffee = new THREE.Mesh(
        new THREE.CircleGeometry(0.95, 32),
        new THREE.MeshStandardMaterial({ color: 0x3b2f2f, roughness: 0.3 })
      );
      coffee.rotation.x = -Math.PI / 2;
      coffee.position.y = 1.01;
      cup.add(coffee);
      scene.add(cup);
      const steam = new THREE.Group();
      const steamGeometry = new THREE.SphereGeometry(0.035, 8, 8);
      const steamMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      });
      for (let i = 0; i < 50; i++) {
        const p = new THREE.Mesh(steamGeometry, steamMaterial);
        p.position.set(
          (Math.random() - 0.5) * 0.5,
          1 + Math.random() * 2,
          (Math.random() - 0.5) * 0.5
        );
        p.userData = { speed: 0.01 + Math.random() * 0.02, offset: Math.random() * Math.PI * 2 };
        steam.add(p);
      }
      cup.add(steam);
      let x = 0,
        y = 0,
        frame = 0,
        visible = true,
        lastTime = 0;
      const move = (e: PointerEvent) => {
        x = (e.clientX / innerWidth - 0.5) * 2;
        y = (e.clientY / innerHeight - 0.5) * 2;
      };
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      const draw = (time: number) => {
        frame = 0;
        if (!visible || document.hidden) return;
        const delta = Math.min((time - (lastTime || time)) / 16.67, 2);
        lastTime = time;
        cup.rotation.y += 0.005 * delta;
        cup.rotation.x = THREE.MathUtils.lerp(cup.rotation.x, y * 0.2, 0.05);
        cup.rotation.z = THREE.MathUtils.lerp(cup.rotation.z, -x * 0.2, 0.05);
        steam.children.forEach((p) => {
          p.position.y += p.userData.speed * delta;
          p.position.x += Math.sin(time * 0.001 + p.userData.offset) * 0.005 * delta;
          if (p.position.y > 3) p.position.y = 1;
        });
        renderer.render(scene, camera);
        frame = requestAnimationFrame(draw);
      };
      const restart = () => {
        if (visible && !document.hidden && !frame) {
          lastTime = 0;
          frame = requestAnimationFrame(draw);
        }
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        restart();
      });
      observer.observe(element);
      const dimensions = new ResizeObserver(resize);
      dimensions.observe(element);
      window.addEventListener("pointermove", move);
      document.addEventListener("visibilitychange", restart);
      resize();
      restart();
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        dimensions.disconnect();
        window.removeEventListener("pointermove", move);
        document.removeEventListener("visibilitychange", restart);
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
            materials.forEach((m) => m.dispose());
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      media.removeEventListener("change", setup);
      cleanup();
    };
  }, []);
  return <div ref={host} className="midnight-cup" aria-hidden="true" />;
}
