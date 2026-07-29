import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Language } from "../types";
import { Boxes, RotateCw, Sun, Moon, Eye, Info, Sparkles, CheckCircle } from "lucide-react";

interface ThreeDShowcaseProps {
  language: Language;
}

export const ThreeDShowcase: React.FC<ThreeDShowcaseProps> = ({ language }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<"plant" | "tractor" | "sensor" | "leaf" | "fertilizer">("plant");
  const [autoRotate, setAutoRotate] = useState(true);
  const [lighting, setLighting] = useState<"day" | "sunset" | "night">("day");
  const [arMode, setArMode] = useState(false);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentObjectGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 450;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0.8, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const dirLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    // 5. Floor pedestal
    const pedestalGeo = new THREE.CylinderGeometry(2.5, 2.8, 0.3, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.4,
      metalness: 0.2,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.15;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Grid ring accent
    const ringGeo = new THREE.RingGeometry(2.4, 2.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    // Container Object Group
    const objectGroup = new THREE.Group();
    scene.add(objectGroup);
    currentObjectGroupRef.current = objectGroup;

    // Build the initial model
    buildModel(activeModel, objectGroup);

    // 6. Mouse Interaction for 3D rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !objectGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      objectGroup.rotation.y += deltaX * 0.01;
      objectGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && objectGroup) {
        objectGroup.rotation.y += 0.008;
      }

      // Wind sway effect for plants
      if (activeModel === "plant" && objectGroup) {
        objectGroup.children.forEach((child, i) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.z = Math.sin(elapsedTime * 2 + i) * 0.05;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [activeModel, autoRotate]);

  // Model Builder function using Three.js procedural geometries
  const buildModel = (modelType: string, group: THREE.Group) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    if (modelType === "plant") {
      // 🌾 3D Healthy Paddy Crop Stalks
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3 });
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.2, side: THREE.DoubleSide });
      const grainMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });

      for (let i = 0; i < 5; i++) {
        const stalk = new THREE.Group();
        const angle = (i / 5) * Math.PI * 2;
        stalk.position.set(Math.cos(angle) * 0.4, 0, Math.sin(angle) * 0.4);

        // Main stem
        const stemGeo = new THREE.CylinderGeometry(0.04, 0.06, 2.2, 8);
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 1.1;
        stalk.add(stem);

        // Leaves
        for (let l = 0; l < 4; l++) {
          const leafGeo = new THREE.ConeGeometry(0.15, 1.2, 4);
          const leaf = new THREE.Mesh(leafGeo, leafMat);
          leaf.position.set(0, 0.6 + l * 0.3, 0);
          leaf.rotation.z = (l % 2 === 0 ? 1 : -1) * 0.6;
          leaf.rotation.y = l * 1.2;
          stalk.add(leaf);
        }

        // Golden Grain Head
        for (let g = 0; g < 12; g++) {
          const grainGeo = new THREE.SphereGeometry(0.06, 8, 8);
          grainGeo.scale(1, 2, 1);
          const grain = new THREE.Mesh(grainGeo, grainMat);
          grain.position.set((Math.random() - 0.5) * 0.15, 2.1 + g * 0.08, (Math.random() - 0.5) * 0.15);
          stalk.add(grain);
        }

        group.add(stalk);
      }
    } else if (modelType === "tractor") {
      // 🚜 3D Smart Tractor
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.4 });
      const engineMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.8 });
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xfcb83b, metalness: 0.6 });

      // Tractor body
      const mainBodyGeo = new THREE.BoxGeometry(1.6, 1.0, 2.2);
      const mainBody = new THREE.Mesh(mainBodyGeo, bodyMat);
      mainBody.position.set(0, 0.8, 0);
      group.add(mainBody);

      // Cab Hood
      const hoodGeo = new THREE.BoxGeometry(1.4, 0.9, 1.2);
      const hood = new THREE.Mesh(hoodGeo, bodyMat);
      hood.position.set(0, 1.4, -0.4);
      group.add(hood);

      // Engine Front
      const engineGeo = new THREE.BoxGeometry(1.3, 0.7, 0.8);
      const engine = new THREE.Mesh(engineGeo, engineMat);
      engine.position.set(0, 0.7, 0.9);
      group.add(engine);

      // Big Rear Wheels
      const rearWheelGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.4, 24);
      rearWheelGeo.rotateZ(Math.PI / 2);

      const rwLeft = new THREE.Mesh(rearWheelGeo, wheelMat);
      rwLeft.position.set(0.95, 0.7, -0.6);
      group.add(rwLeft);

      const rwRight = new THREE.Mesh(rearWheelGeo, wheelMat);
      rwRight.position.set(-0.95, 0.7, -0.6);
      group.add(rwRight);

      // Small Front Wheels
      const frontWheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 20);
      frontWheelGeo.rotateZ(Math.PI / 2);

      const fwLeft = new THREE.Mesh(frontWheelGeo, wheelMat);
      fwLeft.position.set(0.85, 0.4, 0.8);
      group.add(fwLeft);

      const fwRight = new THREE.Mesh(frontWheelGeo, wheelMat);
      fwRight.position.set(-0.85, 0.4, 0.8);
      group.add(fwRight);

      // Headlights
      const lightGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const hl1 = new THREE.Mesh(lightGeo, lightMat);
      hl1.position.set(0.4, 0.8, 1.3);
      group.add(hl1);

      const hl2 = new THREE.Mesh(lightGeo, lightMat);
      hl2.position.set(-0.4, 0.8, 1.3);
      group.add(hl2);
    } else if (modelType === "sensor") {
      // 💧 3D Drip & Soil Sensor Spike
      const spikeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
      const solarMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.9 });
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });

      // Sensor Ground Spike
      const spikeGeo = new THREE.CylinderGeometry(0.08, 0.02, 2.2, 16);
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      spike.position.y = 1.0;
      group.add(spike);

      // Top Control Head
      const headGeo = new THREE.BoxGeometry(0.8, 0.6, 0.6);
      const head = new THREE.Mesh(headGeo, spikeMat);
      head.position.y = 2.0;
      group.add(head);

      // Solar Panel Top
      const solarGeo = new THREE.BoxGeometry(0.7, 0.05, 0.5);
      const solar = new THREE.Mesh(solarGeo, solarMat);
      solar.position.set(0, 2.32, 0);
      group.add(solar);

      // LED Light
      const ledGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0, 2.0, 0.32);
      group.add(led);

      // Drip pipe ring
      const pipeGeo = new THREE.TorusGeometry(1.2, 0.06, 16, 32);
      const pipeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
      const pipe = new THREE.Mesh(pipeGeo, pipeMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.y = 0.2;
      group.add(pipe);
    } else if (modelType === "leaf") {
      // 🍃 3D Infected Leaf Inspector with Rot Hotspots
      const leafGeo = new THREE.PlaneGeometry(1.8, 2.8, 16, 16);
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        side: THREE.DoubleSide,
        roughness: 0.4,
      });

      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.rotation.x = -Math.PI / 6;
      leafMesh.position.y = 1.2;
      group.add(leafMesh);

      // Fungal Disease Spot Hotspots
      const spotMat = new THREE.MeshBasicMaterial({ color: 0xb45309 });
      for (let s = 0; s < 6; s++) {
        const spotGeo = new THREE.CircleGeometry(0.12 + Math.random() * 0.1, 16);
        const spot = new THREE.Mesh(spotGeo, spotMat);
        spot.position.set((Math.random() - 0.5) * 1.0, 0.8 + (Math.random() - 0.5) * 1.5, 0.02);
        group.add(spot);
      }
    } else if (modelType === "fertilizer") {
      // 📦 3D Organic Fertilizer Sack
      const sackGeo = new THREE.BoxGeometry(1.4, 2.0, 0.8);
      const sackMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });

      const sack = new THREE.Mesh(sackGeo, sackMat);
      sack.position.y = 1.0;
      group.add(sack);

      // Gold Label Band
      const labelGeo = new THREE.BoxGeometry(1.42, 0.6, 0.82);
      const labelMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
      const label = new THREE.Mesh(labelGeo, labelMat);
      label.position.y = 1.0;
      group.add(label);
    }
  };

  const modelInfo = {
    plant: {
      title: "🌾 High-Yield Hybrid Crop Plant",
      titleTe: "🌾 అధిక దిగుబడి వచ్చే హైబ్రిడ్ పంట మొక్క",
      desc: "3D visualization of healthy Paddy/Chilli stalk with optimized node spacing and drought resistance.",
      descTe: "నాణ్యమైన పంట ఆకులు, వేర్లు మరియు తెగులు నిరోధకత కలిగి ఉన్న మొక్క యొక్క 3D ప్రదర్శన.",
    },
    tractor: {
      title: "🚜 Smart Agriculture Tractor",
      titleTe: "🚜 స్మార్ట్ వ్యవసాయ ట్రాక్టర్",
      desc: "Multi-utility 45 HP farm tractor compatible with rotavator, seed drill, and boom sprayers.",
      descTe: "దుక్కి దున్నుటకు, నాటు వేయుటకు మరియు పిచికారీ చేయడానికి అనువైన ఆధునిక ట్రాక్టర్.",
    },
    sensor: {
      title: "💧 IoT Soil Moisture & Drip Node",
      titleTe: "💧 స్మార్ట్ డ్రిప్ & మట్టి తేమ సెన్సార్",
      desc: "Solar-powered real-time soil moisture monitoring node that automates drip irrigation valves.",
      descTe: "సూర్యరశ్మితో పనిచేస్తూ మట్టిలోని తేమను సేకరించి మోటార్‌ను ఆటోమేటిక్‌గా ఆన్ చేసే సెన్సార్.",
    },
    leaf: {
      title: "🍃 Infected Leaf 3D Inspector",
      titleTe: "🍃 ఆకు వ్యాధి 3D తనిఖీ వ్యవస్థ",
      desc: "3D leaf surface inspector mapping fungal leaf spot necrotic lesions and pest damage zones.",
      descTe: "ఆకులపై నల్లటి మచ్చలు, ఫంగస్ రంధ్రాలను పరిశోధించే 3D విజువలైజర్.",
    },
    fertilizer: {
      title: "📦 Bio-Organic Fertilizer Sack",
      titleTe: "📦 సేంద్రీయ విత్తనాలు & జీవ ఎరువుల సంచి",
      desc: "100% Organic Vermicompost & Bio-fertilizer pack enriched with Azospirillum & Neem Cake.",
      descTe: "మట్టి సారాన్ని పెంచే 100% సేంద్రీయ వర్మీకంపోస్ట్ మరియు వేప పిండి మిశ్రమం.",
    },
  };

  const currentInfo = modelInfo[activeModel];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 text-slate-900">
      {/* Title Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-xs flex items-center justify-center">
            <Boxes className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === "te" ? "📦 3D / AR ఉత్పత్తుల ప్రదర్శన (Product Showcase)" : "📦 3D / AR Interactive Product & Crop Showcase"}
            </h1>
            <p className="text-xs text-slate-500">
              {language === "te"
                ? "360-డిగ్రీల కోణంలో పంటలు, ట్రాక్టర్లు, డ్రిప్ సెన్సార్లను పరిశీలించే 3D విజువలైజర్."
                : "Interactive 360° WebGL 3D models of crops, tractors, drip moisture sensors, and seed products."}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              autoRotate ? "bg-emerald-700 text-white border-emerald-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{autoRotate ? "Auto-Rotate ON" : "Auto-Rotate OFF"}</span>
          </button>

          <button
            onClick={() => setArMode(!arMode)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              arMode ? "bg-purple-600 text-white border-purple-600" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{arMode ? "AR Mode Active" : "AR View"}</span>
          </button>
        </div>
      </div>

      {/* Model Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {[
          { id: "plant", label: language === "te" ? "🌾 పంట మొక్క" : "🌾 Crop Plant" },
          { id: "tractor", label: language === "te" ? "🚜 ట్రాక్టర్" : "🚜 Smart Tractor" },
          { id: "sensor", label: language === "te" ? "💧 డ్రిప్ సెన్సార్" : "💧 Drip Sensor" },
          { id: "leaf", label: language === "te" ? "🍃 ఆకు 3D తనిఖీ" : "🍃 Leaf Inspector" },
          { id: "fertilizer", label: language === "te" ? "📦 ఎరువుల సంచి" : "📦 Bio Fertilizer" },
        ].map((m) => {
          const isSelected = activeModel === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModel(m.id as any)}
              className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                isSelected
                  ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                  : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
              }`}
            >
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Canvas Stage */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xs overflow-hidden h-[calc(100vh-320px)] min-h-[380px] max-h-[580px]">
        {/* AR Camera Overlay Simulation Background */}
        {arMode && (
          <div className="absolute inset-0 bg-emerald-950/40 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        )}

        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Instruction Badge */}
        <div className="absolute top-6 left-6 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-full text-[10px] text-amber-300 font-bold flex items-center space-x-1.5 shadow-md">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{language === "te" ? "3D మోడల్‌ను తిప్పడానికి మౌస్‌తో తిప్పండి (Click & Drag to Rotate)" : "Interactive 3D Stage (Click & Drag to Rotate 360°)"}</span>
        </div>

        {/* Model Spec Card at Bottom */}
        <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 border border-slate-700 p-4 rounded-xl shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <h3 className="font-bold text-amber-300 text-sm">
              {language === "te" ? currentInfo.titleTe : currentInfo.title}
            </h3>
            <p className="text-slate-300 mt-0.5 leading-relaxed">
              {language === "te" ? currentInfo.descTe : currentInfo.desc}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold rounded-lg flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>AgriSaathi Verified</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
