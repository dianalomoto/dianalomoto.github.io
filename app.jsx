import React, { useState, useRef, useEffect } from 'react';
import { Volume2, RotateCcw, Star } from 'lucide-react';

export default function LetraSTrazo() {
  const [currentLetter, setCurrentLetter] = useState('S');
  const [progress, setProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tracedPoints, setTracedPoints] = useState([]);
  const canvasRef = useRef(null);
  const drawingCanvasRef = useRef(null);

  // Definir los puntos de la letra S mayúscula (forma mejorada)
  const letterPoints = {
    S: [
      // Inicio en la parte superior derecha
      {x: 300, y: 90},
      // Curva superior (hacia la izquierda)
      {x: 280, y: 85}, {x: 260, y: 82}, {x: 240, y: 80}, {x: 220, y: 80},
      {x: 200, y: 80}, {x: 180, y: 82}, {x: 160, y: 87}, {x: 145, y: 95},
      {x: 135, y: 105}, {x: 128, y: 118}, {x: 125, y: 132},
      // Giro hacia el centro
      {x: 125, y: 145}, {x: 128, y: 158}, {x: 135, y: 170}, {x: 145, y: 180},
      {x: 158, y: 188}, {x: 172, y: 194}, {x: 188, y: 198}, {x: 204, y: 200},
      // Centro de la S
      {x: 220, y: 200}, {x: 236, y: 198}, {x: 250, y: 194}, {x: 262, y: 188},
      {x: 272, y: 180}, {x: 280, y: 170}, {x: 285, y: 158}, {x: 288, y: 145},
      // Giro hacia abajo
      {x: 288, y: 158}, {x: 285, y: 172}, {x: 280, y: 185}, {x: 272, y: 198},
      {x: 262, y: 210}, {x: 250, y: 220}, {x: 236, y: 228}, {x: 220, y: 234},
      // Curva inferior (hacia la izquierda)
      {x: 204, y: 238}, {x: 188, y: 240}, {x: 172, y: 240}, {x: 156, y: 238},
      {x: 142, y: 234}, {x: 130, y: 228}, {x: 120, y: 218}, {x: 112, y: 206}
    ],
    s: [
      // s minúscula - inicio arriba a la derecha
      {x: 270, y: 140},
      // Curva superior
      {x: 255, y: 136}, {x: 240, y: 134}, {x: 225, y: 133}, {x: 210, y: 133},
      {x: 195, y: 134}, {x: 182, y: 138}, {x: 172, y: 145}, {x: 164, y: 154},
      {x: 160, y: 165}, {x: 158, y: 176},
      // Giro al centro
      {x: 160, y: 186}, {x: 164, y: 196}, {x: 172, y: 204}, {x: 182, y: 210},
      {x: 195, y: 214}, {x: 210, y: 216},
      // Centro
      {x: 225, y: 216}, {x: 238, y: 214}, {x: 248, y: 210}, {x: 256, y: 204},
      {x: 262, y: 196}, {x: 266, y: 186}, {x: 268, y: 176},
      // Giro hacia abajo
      {x: 266, y: 186}, {x: 262, y: 197}, {x: 256, y: 207}, {x: 248, y: 216},
      {x: 238, y: 224}, {x: 225, y: 230},
      // Curva inferior
      {x: 210, y: 234}, {x: 195, y: 236}, {x: 180, y: 236}, {x: 166, y: 234},
      {x: 154, y: 230}, {x: 144, y: 224}, {x: 136, y: 216}
    ]
  };

  useEffect(() => {
    drawBackground();
  }, [currentLetter]);

  useEffect(() => {
    drawUserTrace();
  }, [tracedPoints]);

  const drawBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);

    const points = letterPoints[currentLetter];

    // Dibujar el contorno de la letra con puntos guía
    ctx.strokeStyle = '#e0e7ff';
    ctx.lineWidth = 50;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Dibujar la silueta de fondo
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // Dibujar puntos guía sobre la letra
    points.forEach((point, index) => {
      if (index % 2 === 0) { // Mostrar cada 2 puntos para no saturar
        // Punto externo (blanco)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Punto interno (color)
        ctx.fillStyle = '#a78bfa';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Dibujar flecha de inicio
    const startPoint = points[0];
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('►', startPoint.x, startPoint.y);
  };

  const drawUserTrace = () => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);

    if (tracedPoints.length < 2) return;

    // Dibujar el trazo del usuario
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(0.5, '#6366f1');
    gradient.addColorStop(1, '#3b82f6');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 45;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(139, 92, 246, 0.3)';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(tracedPoints[0].x, tracedPoints[0].y);
    for (let i = 1; i < tracedPoints.length; i++) {
      ctx.lineTo(tracedPoints[i].x, tracedPoints[i].y);
    }
    ctx.stroke();

    // Dibujar puntos decorativos en el trazo
    tracedPoints.forEach((point, index) => {
      if (index % 5 === 0) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  const getCanvasCoordinates = (e) => {
    const canvas = drawingCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    
    if (e.type.includes('touch')) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const calculateProgress = (traced) => {
    const points = letterPoints[currentLetter];
    let coveredPoints = 0;

    points.forEach(point => {
      const isCovered = traced.some(tp => {
        const distance = Math.sqrt(
          Math.pow(tp.x - point.x, 2) + Math.pow(tp.y - point.y, 2)
        );
        return distance < 30;
      });
      if (isCovered) coveredPoints++;
    });

    return (coveredPoints / points.length) * 100;
  };

  const handleStart = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCanvasCoordinates(e);
    setTracedPoints([coords]);
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const coords = getCanvasCoordinates(e);
    const newTracedPoints = [...tracedPoints, coords];
    setTracedPoints(newTracedPoints);

    const newProgress = calculateProgress(newTracedPoints);
    setProgress(newProgress);

    if (newProgress >= 85) {
      completeLevel();
    }
  };

  const handleEnd = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const completeLevel = () => {
    setIsDrawing(false);
    playSound();
    
    setTimeout(() => {
      if (currentLetter === 'S') {
        setCurrentLetter('s');
        setTracedPoints([]);
        setProgress(0);
      } else {
        setCurrentLetter('S');
        setTracedPoints([]);
        setProgress(0);
      }
    }, 1500);
  };

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Nota 1
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.frequency.value = 523.25; // Do
    gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    osc1.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.3);

    // Nota 2
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.value = 659.25; // Mi
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);
    osc2.start(audioContext.currentTime + 0.15);
    osc2.stop(audioContext.currentTime + 0.45);

    // Nota 3
    const osc3 = audioContext.createOscillator();
    const gain3 = audioContext.createGain();
    osc3.connect(gain3);
    gain3.connect(audioContext.destination);
    osc3.frequency.value = 783.99; // Sol
    gain3.gain.setValueAtTime(0.3, audioContext.currentTime + 0.3);
    gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    osc3.start(audioContext.currentTime + 0.3);
    osc3.stop(audioContext.currentTime + 0.8);
  };

  const resetGame = () => {
    setCurrentLetter('S');
    setTracedPoints([]);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-purple-200 flex flex-col relative overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-green-300 rounded-full opacity-50"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <Star className="text-yellow-400 fill-yellow-400 animate-spin" size={32} style={{animationDuration: '3s'}} />
          <h1 className="text-5xl font-bold text-purple-600 drop-shadow-lg">
            ¡Traza la Letra!
          </h1>
          <Star className="text-pink-400 fill-pink-400 animate-spin" size={32} style={{animationDuration: '3s'}} />
        </div>

        {/* Tablero estilo caballete */}
        <div className="relative">
          {/* Marco del caballete */}
          <div className="bg-gradient-to-b from-amber-600 to-amber-700 rounded-lg p-6 shadow-2xl">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-t-lg h-8 mb-2 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-6 bg-amber-700 rounded"></div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-inner relative">
              {/* Letra actual */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg font-bold text-3xl">
                Letra: {currentLetter}
              </div>

              {/* Canvas con la letra */}
              <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl overflow-hidden" style={{width: '400px', height: '400px'}}>
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="absolute top-0 left-0 w-full h-full"
                />
                <canvas
                  ref={drawingCanvasRef}
                  width={400}
                  height={400}
                  className="absolute top-0 left-0 w-full h-full cursor-pointer touch-none"
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}
                />
              </div>
            </div>
          </div>

          {/* Mariquita decorativa */}
          <div className="absolute -top-8 -left-8 text-4xl animate-bounce" style={{animationDuration: '2s'}}>
            🐞
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-lg font-bold text-purple-600">¡Muy bien!</span>
              <span className="text-2xl font-bold text-pink-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
              <div
                className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-6 rounded-full transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              >
                {progress > 10 && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-sm">
                    ⭐
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center gap-2 shadow-lg"
          >
            <RotateCcw size={24} />
            Reiniciar
          </button>
          <button
            onClick={playSound}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center gap-2 shadow-lg"
          >
            <Volume2 size={24} />
            Sonido
          </button>
        </div>

        <div className="mt-6 bg-yellow-100 border-4 border-yellow-300 rounded-2xl p-4 max-w-md shadow-lg">
          <p className="text-center text-gray-700 font-semibold text-lg">
            ✏️ Sigue los puntitos con tu dedo o mouse
          </p>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-6 relative z-10 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-xl mb-2 drop-shadow-lg">
            ✨ Desarrollado por Diana Alomoto ✨
          </p>
          <p className="text-purple-100 mb-2 font-semibold">
            Universidad Politécnica Estatal del Carchi
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <p className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              📱 <span className="font-semibold">099 005 2651</span>
            </p>
            <p className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              📧 <span className="font-semibold">diana.alomoto@upec.edu.ec</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
