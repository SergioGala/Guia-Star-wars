import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch,
  Layout,
  Route,
  Heart,
  Database,
  Layers,
  Image,
  Settings,
  Palette,
  CheckSquare,
  ChevronLeft,
  ChevronDown
} from 'lucide-react';

import lightsaberOn from '../assets/lightsaber-on.mp3';
import lightsaberOff from '../assets/lightsaber-off.mp3';

// Colores para las secciones
const sectionColors = {
  setup: "#2196f3",      // Azul - Configuración
  components: "#4CAF50", // Verde - Componentes
  routing: "#9c27b0",    // Púrpura - Rutas
  features: "#ff9800",   // Naranja - Características
  data: "#e91e63",       // Rosa - Datos
  views: "#00bcd4",      // Cyan - Vistas
  assets: "#cddc39",     // Lima - Recursos
  improvements: "#ff5722",// Rojo anaranjado - Mejoras
  styles: "#673ab7",     // Violeta - Estilos
  testing: "#FFE81F"     // Amarillo Star Wars - Testing
};

// Animación
const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px var(--section-color), 0 0 20px var(--section-color), 0 0 30px var(--section-color); }
  50% { text-shadow: 0 0 20px var(--section-color), 0 0 30px var(--section-color), 0 0 40px var(--section-color); }
`;
// Styled Components
const Container = styled(motion.div)`
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
  color: #FFE81F;
  text-shadow: 0 0 10px rgba(255, 232, 31, 0.5);
`;

const SectionCard = styled(motion.div)`
  --section-color: ${props => sectionColors[props.$type] || '#FFE81F'};
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  padding: ${props => props.$isExpanded ? '2rem' : '1.5rem'};
  margin: 1rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--section-color);
  box-shadow: 0 0 10px var(--section-color);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.$isExpanded ? 
      `linear-gradient(45deg, 
        rgba(0,0,0,0.9), 
        rgba(${props.$rgb}, 0.1)
      )` : 'transparent'};
    border-radius: inherit;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateX(10px);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const SectionNumber = styled.span`
  font-size: 2em;
  font-weight: bold;
  color: var(--section-color);
  text-shadow: 0 0 10px var(--section-color);
  animation: ${glow} 2s infinite;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  color: var(--section-color);
  flex-grow: 1;
`;

const IconWrapper = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--section-color);
  
  svg {
    filter: drop-shadow(0 0 5px var(--section-color));
  }
`;

const SectionContent = styled(motion.div)`
  margin-top: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '⚡';
    color: var(--section-color);
  }
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

  &:hover {
    background: rgba(255, 232, 31, 0.1);
    box-shadow: 0 0 20px rgba(255, 232, 31, 0.2);
    transform: translateX(-5px);
  }
`;
const indexData = [
  {
    id: 'setup',
    number: '01',
    title: 'CONFIGURACIÓN INICIAL',
    icon:  GitBranch,
    rgb: '33,150,243',
    tasks: [
      "Clonar boilerplate react-hello-webapp",
      "Instalar dependencias necesarias",
      "Limpiar el proyecto de código ejemplo",
      "Organizar estructura de carpetas",
      "Configurar archivos base"
    ]
  },
  {
    id: 'components',
    number: '02',
    title: 'COMPONENTES BASE',
    icon: Layout,
    rgb: '76,175,80',
    tasks: [
      "Crear Navbar con navegación básica",
      "Desarrollar Card base para personajes",
      "Desarrollar Card base para vehículos",
      "Desarrollar Card base para planetas",
      "Crear estructura base para vistas detalladas"
    ]
  },
  {
    id: 'routing',
    number: '03',
    title: 'RUTAS',
    icon: Route,
    rgb: '156,39,176',
    tasks: [
      "Configurar React Router",
      "Definir rutas principales (home, detalles, favoritos)",
      "Implementar navegación básica",
      "Crear componente Layout",
      "Asegurar funcionamiento de rutas dinámicas"
    ]
  },
  {
    id: 'features',
    number: '04',
    title: 'SISTEMA DE FAVORITOS',
    icon: Heart,
    rgb: '255,152,0',
    tasks: [
      "Crear Context para favoritos",
      "Implementar funciones add/remove favoritos",
      "Añadir contador de favoritos en Navbar",
      "Crear vista de favoritos",
      "Implementar persistencia local"
    ]
  },
  {
    id: 'data',
    number: '05',
    title: 'FETCH DE DATOS',
    icon: Database,
    rgb: '233,30,99',
    tasks: [
      "Implementar fetch para personajes",
      "Implementar fetch para vehículos",
      "Implementar fetch para planetas",
      "Manejar estados de carga",
      "Implementar manejo de errores"
    ]
  },
  {
    id: 'views',
    number: '06',
    title: 'VISTAS PRINCIPALES',
    icon: Layers,
    rgb: '0,188,212',
    tasks: [
      "Crear Home con listados",
      "Desarrollar vista detalle de personaje",
      "Desarrollar vista detalle de vehículo",
      "Desarrollar vista detalle de planeta",
      "Implementar vista de favoritos"
    ]
  },
  {
    id: 'assets',
    number: '07',
    title: 'IMÁGENES',
    icon: Image,
    rgb: '205,220,57',
    tasks: [
      "Configurar URLs de starwars-visualguide",
      "Implementar manejo de errores de carga",
      "Añadir imágenes por defecto",
      "Optimizar carga de imágenes",
      "Manejar casos de imágenes no disponibles"
    ]
  },
  {
    id: 'improvements',
    number: '08',
    title: 'MEJORAS OPCIONALES',
    icon: Settings,
    rgb: '255,87,34',
    tasks: [
      "Implementar localStorage para favoritos",
      "Añadir búsqueda de elementos",
      "Implementar paginación",
      "Agregar loading states",
      "Mejorar manejo de errores"
    ]
  },
  {
    id: 'styles',
    number: '09',
    title: 'ESTILOS',
    icon: Palette,
    rgb: '103,58,183',
    tasks: [
      "Aplicar estilos con Bootstrap",
      "Ajustar diseño de cards",
      "Mejorar estilos de botones",
      "Implementar diseño responsive",
      "Pulir detalles visuales"
    ]
  },
  {
    id: 'testing',
    number: '10',
    title: 'TESTING Y DEPURACIÓN',
    icon: CheckSquare,
    rgb: '255,232,31',
    tasks: [
      "Revisar consola por errores",
      "Probar navegación completa",
      "Verificar funcionamiento de favoritos",
      "Comprobar responsive design",
      "Realizar pruebas finales"
    ]
  }
];
const IndexGuide = ({ onBack }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const lightsaberOnSound = useRef(new Audio(lightsaberOn));
  const lightsaberOffSound = useRef(new Audio(lightsaberOff));

  const handleSectionClick = (sectionId) => {
    if (expandedSection === sectionId) {
      lightsaberOffSound.current.currentTime = 0;
      lightsaberOffSound.current.play();
      setExpandedSection(null);
    } else {
      lightsaberOnSound.current.currentTime = 0;
      lightsaberOnSound.current.play();
      setExpandedSection(sectionId);
    }
  };

  return (
    <Container
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
        Índice de Desarrollo
      </Title>

      {indexData.map((section) => (
        <SectionCard
        key={section.id}
        $type={section.id}
        $isExpanded={expandedSection === section.id}
        $rgb={section.rgb}
        onClick={() => handleSectionClick(section.id)}
        whileHover={{ x: 10 }}
      >
        <SectionHeader>
          <SectionNumber>{section.number}</SectionNumber>
          {expandedSection === section.id ? (
            <SectionTitle>{section.title}</SectionTitle>
          ) : (
            <SectionTitle>PASO {section.number}</SectionTitle>
          )}
          <IconWrapper
            animate={{ 
              rotate: expandedSection === section.id ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <section.icon size={24} />
          </IconWrapper>
          <ChevronDown
            size={24}
            style={{
              transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s ease'
            }}
          />
        </SectionHeader>
      
        <AnimatePresence>
          {expandedSection === section.id && (
            <SectionContent
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskList>
                {section.tasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {task}
                  </TaskItem>
                ))}
              </TaskList>
            </SectionContent>
          )}
        </AnimatePresence>
      </SectionCard>
      ))}

      <BackButton
        onClick={onBack}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ChevronLeft size={20} />
        Volver al Inicio
      </BackButton>
    </Container>
  );
};

// PropTypes
IndexGuide.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default IndexGuide;