import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Añadir esta importación
import lightsaberOn from '../assets/lightsaber-on.mp3';
import lightsaberOff from '../assets/lightsaber-off.mp3';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target,
  Boxes,
  GitBranch,
  GitCommit,
  CheckCircle2,
  Info,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

// Colores de sable láser para cada punto
const lightsaberColors = {
  0: "#2196f3", // Azul - General a específico
  1: "#4CAF50", // Verde - Base sólida
  2: "#9c27b0", // Púrpura - Detección temprana
  3: "#ff9800", // Naranja - Flujo lógico
  4: "#FFE81F"  // Amarillo - Testing
};

// Animaciones base
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;


// Animaciones del sable láser
const LightsaberGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px var(--saber-color),
                0 0 10px var(--saber-color),
                0 0 20px var(--saber-color);
  }
  50% {
    box-shadow: 0 0 10px var(--saber-color),
                0 0 20px var(--saber-color),
                0 0 40px var(--saber-color);
  }
`;

const LightsaberIgnite = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
`;

// Estilos de componentes
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
  font-family: Arial, sans-serif;
`;

const StarField = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const Nebula = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 232, 31, 0.03) 0%,
    transparent 60%
  );
  animation: ${float} 15s ease-in-out infinite;
`;

const StarContainer = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: #FFE81F;
  border-radius: 50%;
  box-shadow: 0 0 4px #FFE81F;
`;


const Content = styled(motion.div)`
  position: relative;
  width: 90vw;
  max-width: 1200px;
  margin: 30px auto;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 232, 31, 0.3);
  border-radius: 20px;
  padding: 2rem;
  color: #FFE81F;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(255, 232, 31, 0.1);
  overflow-y: auto;
  max-height: 90vh;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 232, 31, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 232, 31, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 232, 31, 0.5);
    }
  }
`;

const Title = styled(motion.h1)`
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
`;

const MethodologyCard = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  padding: ${props => props.$isExpanded ? '2rem' : '1.5rem'};
  margin: 1rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  --saber-color: ${props => lightsaberColors[props.$index] || '#FFE81F'};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: 2px solid ${props => props.$isExpanded ? 'var(--saber-color)' : 'rgba(255, 232, 31, 0.2)'};
    border-radius: inherit;
    transition: all 0.3s ease;
    transform-origin: left;
    animation: ${props => props.$isExpanded ? LightsaberIgnite : 'none'} 0.5s ease forwards;
  }

  ${props => props.$isExpanded && css`
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      animation: ${LightsaberGlow} 2s infinite;
  `}

  &:hover {
    transform: translateX(10px);
    background: rgba(0, 0, 0, 0.8);
  }
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2em;
  position: relative;
  z-index: 1;
`;

const CardContent = styled(motion.div)`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 232, 31, 0.2);
  position: relative;
  z-index: 1;
`;

const ExplanationSection = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 232, 31, 0.03);
  border-radius: 10px;
  position: relative;
  z-index: 1;

  h4 {
    margin-bottom: 0.5rem;
    color: var(--saber-color);
    font-size: 1.1em;
    text-shadow: 0 0 5px var(--saber-color);
  }

  p {
    line-height: 1.6;
    opacity: 0.9;
  }
`;

const IconWrapper = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 232, 31, 0.1);
  box-shadow: 0 0 10px var(--saber-color);
  color: var(--saber-color);
`;

const BackButton = styled(motion.button)`
  margin-top: 2rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 2px solid #FFE81F;
  color: #FFE81F;
  padding: 15px 25px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 232, 31, 0.1);
    box-shadow: 0 0 20px rgba(255, 232, 31, 0.2);
    transform: translateX(-5px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const methodologyDetails = [
  {
    title: "Va de lo general a lo específico",
    explanation: "Este enfoque nos permite tener una visión clara del proyecto completo antes de adentrarnos en los detalles específicos.",
    example: "Por ejemplo: Primero definimos la estructura general de nuestra app de Star Wars (navegación, páginas principales) antes de programar componentes específicos como las tarjetas de personajes.",
    icon: Target
  },
  {
    title: "Construye una base sólida antes de añadir complejidad",
    explanation: "Aseguramos que las funcionalidades básicas estén sólidas antes de agregar características más avanzadas.",
    example: "Por ejemplo: Primero implementamos la visualización básica de personajes antes de añadir filtros, búsqueda o animaciones complejas.",
    icon: Boxes
  },
  {
    title: "Permite detectar problemas temprano",
    explanation: "Al construir paso a paso, podemos identificar y resolver problemas antes de que se vuelvan más complejos.",
    example: "Por ejemplo: Si hay un problema con la API de Star Wars, lo detectaremos al implementar el fetch básico, antes de construir toda la interfaz.",
    icon: GitBranch
  },
  {
    title: "Sigue un flujo lógico de desarrollo",
    explanation: "Cada paso se construye sobre el anterior, siguiendo una progresión natural y lógica.",
    example: "Por ejemplo: Primero configuramos las rutas, luego los componentes base, después el fetch de datos, y finalmente los favoritos.",
    icon: GitCommit
  },
  {
    title: "Facilita el testing y debugging",
    explanation: "Al desarrollar de manera incremental, es más fácil probar cada componente y encontrar errores.",
    example: "Por ejemplo: Podemos probar cada funcionalidad por separada: primero la navegación, luego el fetch de datos, después los favoritos, etc.",
    icon: CheckCircle2
  }
];

const SpaceWarsIntro = ({ onBack }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [stars, setStars] = useState([]);
  const [showGuide, setShowGuide] = useState(true);
  const containerRef = useRef(null);
  const lightsaberOnSound = useRef(new Audio(lightsaberOn));
  const lightsaberOffSound = useRef(new Audio(lightsaberOff));

  useEffect(() => {
    const newStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      depth: Math.random() * 3,
      twinkle: Math.random() > 0.7
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (index) => {
    if (expandedCard === index) {
      lightsaberOffSound.current.currentTime = 0;
      lightsaberOffSound.current.play();
      setExpandedCard(null);
    } else {
      lightsaberOnSound.current.currentTime = 0;
      lightsaberOnSound.current.play();
      setExpandedCard(index);
    }
  };

  return (
    <Container ref={containerRef}>
      <Nebula />
      <StarField>
        {stars.map((star) => (
          <StarContainer
            key={star.id}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              zIndex: star.depth,
            }}
            animate={star.twinkle ? {
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles size={star.size} color="#FFE81F" />
          </StarContainer>
        ))}
      </StarField>

      <Content
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          animate={{
            textShadow: [
              "0 0 10px rgba(255, 232, 31, 0.5)",
              "0 0 20px rgba(255, 232, 31, 0.8)",
              "0 0 10px rgba(255, 232, 31, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Metodología de Desarrollo
        </Title>

        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#FFE81F',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 232, 31, 0.3)',
              zIndex: 1000
            }}
          >
            <Info size={24} style={{ marginBottom: '0.5rem' }} />
            <p>Haz clic en cada punto para ver más detalles</p>
          </motion.div>
        )}

        {methodologyDetails.map((detail, index) => (
          <MethodologyCard
            key={index}
            $isExpanded={expandedCard === index}
            $index={index}
            onClick={() => handleCardClick(index)}
            whileHover={{ x: 10 }}
          >
            <CardHeader>
              <IconWrapper
                animate={{ rotate: expandedCard === index ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <detail.icon size={24} />
              </IconWrapper>
              <span>{detail.title}</span>
            </CardHeader>

            <AnimatePresence>
              {expandedCard === index && (
                <CardContent
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExplanationSection>
                    <h4>Explicación:</h4>
                    <p>{detail.explanation}</p>
                  </ExplanationSection>
                  
                  <ExplanationSection>
                    <h4>Ejemplo práctico:</h4>
                    <p>{detail.example}</p>
                  </ExplanationSection>
                </CardContent>
              )}
            </AnimatePresence>
          </MethodologyCard>
        ))}

        <BackButton
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ChevronLeft size={20} />
          Volver al Inicio
        </BackButton>
      </Content>
    </Container>
  );
};

SpaceWarsIntro.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default SpaceWarsIntro;