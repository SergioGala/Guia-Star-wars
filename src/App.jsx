import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Power } from 'lucide-react';
import StarWarsIntro from './components/StarWarsIntro';
import IndexGuide from './components/IndexGuide';

const hologramFlicker = keyframes`
  0% { opacity: 0.8; transform: scale(1); filter: brightness(1); }
  50% { opacity: 1; transform: scale(1.02); filter: brightness(1.2); }
  51% { opacity: 0.9; }
  100% { opacity: 0.8; transform: scale(1); filter: brightness(1); }
`;

const VolumeControl = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #FFE81F;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 10px;
  display: ${props => props.$isVisible ? 'block' : 'none'};
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background: #FFE81F;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #FFE81F;
    cursor: pointer;
    box-shadow: 0 0 10px #FFE81F;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #FFE81F;
    cursor: pointer;
    box-shadow: 0 0 10px #FFE81F;
  }
`;

const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 232, 31, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 232, 31, 0.8); }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
`;

const BackgroundEffect = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at top right, rgba(74, 254, 254, 0.1), transparent 50%),
    radial-gradient(circle at bottom left, rgba(255, 232, 31, 0.1), transparent 50%);
  opacity: 0.5;
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 232, 31, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 232, 31, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: top;
  opacity: 0.2;
`;

const MainTitle = styled(motion.div)`
  font-size: 7em;
  font-weight: 900;
  color: #FFE81F;
  text-transform: uppercase;
  position: relative;
  text-align: center;
  letter-spacing: 0.15em;
  line-height: 1;
  text-shadow: 
    0 0 10px rgba(255, 232, 31, 0.3),
    0 0 20px rgba(255, 232, 31, 0.3),
    0 0 30px rgba(255, 232, 31, 0.3);
  cursor: pointer;
  
  span {
    display: block;
    font-size: 0.2em;
    letter-spacing: 0.5em;
    margin-top: 2em;
    font-weight: 400;
    color: #FFE81F;
    text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
  }

  &:hover {
    text-shadow: 
      0 0 20px rgba(255, 232, 31, 0.5),
      0 0 40px rgba(255, 232, 31, 0.5),
      0 0 60px rgba(255, 232, 31, 0.5);
  }
`;

const IndexButton = styled(motion.div)`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #FFE81F;
  color: #FFE81F;
  padding: 1.5rem 4rem;
  font-size: 2em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 232, 31, 0.2);

  &:hover {
    background: rgba(255, 232, 31, 0.1);
    box-shadow: 
      0 0 30px rgba(255, 232, 31, 0.3),
      0 0 50px rgba(255, 232, 31, 0.2),
      inset 0 0 20px rgba(255, 232, 31, 0.2);
    transform: translate(-50%, -50%) scale(1.05);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.98);
  }
`;

const Controls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 1rem;
  z-index: 1000;
`;

const ControlButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid #FFE81F;
  color: #FFE81F;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 232, 31, 0.1);
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 232, 31, 0.3);
  }
`;
function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const audioRef = useRef(new Audio('/src/assets/starwars-theme.mp3'));
  const [showVolumeControl, setShowVolumeControl] = useState(false);
const [volume, setVolume] = useState(1);


  useEffect(() => {
    if (isPoweredOn) {
      const powerUpSequence = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentView('home');
      };
      powerUpSequence();
    }
  }, [isPoweredOn]);

  useEffect(() => {
    // Configurar el audio
    audioRef.current.loop = true;
    
    // Cleanup cuando el componente se desmonte
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  if (!isPoweredOn) {
    return (
      <Container>
        <BackgroundEffect />
        <GridOverlay />
        <ControlButton
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          onClick={() => setIsPoweredOn(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Power size={24} />
        </ControlButton>
      </Container>
    );
  }

  return (
    <Container>
      <BackgroundEffect />
      <GridOverlay />

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <MainTitle onClick={() => handleNavigation('methodology')}>
                STAR WARS
                <span>¿Por qué usar una metodología?</span>
              </MainTitle>
            </motion.div>

            <IndexButton
              onClick={() => handleNavigation('index')}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.3 }}
            >
              Índice de la fuerza
            </IndexButton>
          </>
        )}

        {currentView === 'methodology' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <StarWarsIntro onBack={() => handleNavigation('home')} />
          </motion.div>
        )}

        {currentView === 'index' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <IndexGuide onBack={() => handleNavigation('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <Controls>
  <div style={{ position: 'relative' }} className="volume-control">
    <ControlButton
      onClick={toggleMusic}
      onMouseEnter={() => setShowVolumeControl(true)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMusicPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </ControlButton>
    
    <VolumeControl 
      $isVisible={showVolumeControl}
      onMouseLeave={() => setShowVolumeControl(false)}
    >
      <VolumeSlider 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={volume}
        onChange={handleVolumeChange}
      />
    </VolumeControl>
  </div>

  <ControlButton
    onClick={() => setIsPoweredOn(false)}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Power size={24} />
  </ControlButton>
</Controls>
    </Container>
  );
}

export default App;