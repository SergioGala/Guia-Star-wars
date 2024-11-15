// src/data/guideData.js

export const guideData = [
    {
      step: 1,
      title: "CONFIGURACIÓN INICIAL",
      what: "Preparar el entorno de desarrollo",
      why: "Es fundamental tener una base sólida y organizada antes de empezar a codificar",
      includes: [
        "Clonar boilerplate: Para tener la estructura base",
        "Limpiar proyecto: Eliminar código ejemplo que no usaremos",
        "Organizar carpetas: components/, views/, store/"
      ],
      benefit: "Evita problemas de organización posteriores"
    },
    {
      step: 2,
      title: "COMPONENTES BASE",
      what: "Crear los componentes visuales básicos reutilizables",
      why: "Son los bloques de construcción que usaremos en toda la app",
      includes: [
        "Navbar: Para navegación",
        "Cards: Para mostrar personajes/vehículos/planetas",
        "Layout base: Estructura general de la app"
      ],
      benefit: "Tener componentes reutilizables ahorra tiempo después"
    },
    {
      step: 3,
      title: "RUTAS",
      what: "Configurar la navegación entre páginas",
      why: "Necesitamos poder movernos entre vistas antes de añadir funcionalidad",
      includes: [
        "Configurar React Router",
        "Definir rutas principales",
        "Conectar componentes con rutas"
      ],
      benefit: "Permite desarrollar y probar componentes en su contexto real"
    },
    {
      step: 4,
      title: "SISTEMA DE FAVORITOS",
      what: "Implementar la lógica de gestión de favoritos",
      why: "Es una funcionalidad central que afecta a múltiples componentes",
      includes: [
        "Context para estado global",
        "Funciones add/remove",
        "Persistencia de datos"
      ],
      benefit: "Proporciona la funcionalidad principal de la app"
    },
    {
      step: 5,
      title: "FETCH DE DATOS",
      what: "Implementar las llamadas a la API SWAPI",
      why: "Necesitamos datos reales para probar los componentes",
      includes: [
        "Llamadas a API",
        "Manejo de loading states",
        "Manejo de errores"
      ],
      benefit: "Permite trabajar con datos reales"
    },
    {
      step: 6,
      title: "VISTAS PRINCIPALES",
      what: "Crear las páginas principales de la aplicación",
      why: "Ya tenemos componentes, rutas y datos para construirlas",
      includes: [
        "Home con listados",
        "Vistas de detalle",
        "Vista de favoritos"
      ],
      benefit: "Integra todos los elementos anteriores"
    },
    {
      step: 7,
      title: "IMÁGENES",
      what: "Gestionar la carga y visualización de imágenes",
      why: "Mejora visual una vez que la funcionalidad básica está lista",
      includes: [
        "URLs de starwars-visualguide",
        "Manejo de errores de carga",
        "Imágenes por defecto"
      ],
      benefit: "Mejora la experiencia visual"
    },
    {
      step: 8,
      title: "MEJORAS (OPCIONALES)",
      what: "Añadir funcionalidades extra para mejorar la experiencia",
      why: "Son extras una vez que todo lo básico funciona",
      includes: [
        "LocalStorage",
        "Búsqueda",
        "Paginación"
      ],
      benefit: "Mejora la usabilidad"
    },
    {
      step: 9,
      title: "ESTILOS",
      what: "Aplicar estilos y mejorar la apariencia",
      why: "La funcionalidad es prioritaria sobre la estética",
      includes: [
        "Bootstrap",
        "Responsive design",
        "Detalles visuales"
      ],
      benefit: "Hace la app más atractiva y profesional"
    },
    {
      step: 10,
      title: "TESTING Y DEPURACIÓN",
      what: "Verificar que todo funciona correctamente",
      why: "Necesitamos probar toda la funcionalidad integrada",
      includes: [
        "Revisar errores",
        "Probar casos edge",
        "Verificar responsive"
      ],
      benefit: "Asegura la calidad del producto final"
    }
  ];
  
  export const whyThisOrder = [
    "Va de lo general a lo específico",
    "Construye una base sólida antes de añadir complejidad",
    "Permite detectar problemas temprano",
    "Sigue un flujo lógico de desarrollo",
    "Facilita el testing y debugging"
  ];