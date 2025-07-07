'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { Model } from './wallmart';

export default function Scene() {
  // const mountRef = useRef(null);

  // useEffect(()=>{
  //   const scene = new THREE.Scene();

  //   const camera =new THREE.perspectiveCamera(75,window.innerWidth/ window.innerHeight, 0.1, 1000);

  //   const renderer = new THREE.WebGLRenderer({
  //     antialias: true
  //   });
  //   renderer.setSize(
  //     mountRef.current.clientWidth,
  //     mountRef.current.clientHeight
  //   );

  //   mountRef.current.appendChild(renderer.domElement);

  //   const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  //   scene.add(ambientLight);

  //   const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  //   directionalLight.position.set(10, 10, 10);
  //   scene.add(directionalLight);

  //   const animate =function(){
  //     requestAnimationFrame(animate);
  //     if(model){

  //     }
  //     renderer.render(scene,camera);
  //   }
  // })
  return (
    <>
      <div className='h-screen w-full flex justify-center items-center bg-gradient-to-bl from-dark via-gray-50% to-slate-900 text-white'
      ><div className="h-9/12  min-w-6xl border-4 border-gray-500 hover:border-gray-300 transition-all duration-100 ease-in  ">
        <Canvas 
        camera={{position:[60,30,30],fav:90}}
        style={ { width: '100%', height: '100%'  } }
        >
          
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
             <Environment preset='sunset'/>
            <Model scale={0.5}  />
              <directionalLight position={[0, 20, 10]} intensity={0.75} />
          </Suspense>
          <OrbitControls enableDamping enableZoom={true} enableRotate={true}/>
        </Canvas>
        
      </div></div>

    </>

  );
}
