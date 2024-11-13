/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5c059b',    // Púrpura oscuro
        'secondary': '#1E2938',  // Azul oscuro
        'accent': '#CB5930',     // Naranja tierra
        'accent1': '#CB5810',     // Naranja hover
        'neutral': '#F3F4F6',    // Gris claro
        'warning': '#FFCC00',    // Amarillo de advertencia
        'success': '#22C55E',    // Verde éxito
        'success1': '#22C60E',   // verde hover 
        'info': '#3B82F6',       // Azul informativo
        'danger': '#EF4444',     // Rojo de peligro
        'danger1': '#EF4401',     // Rojo hover
      }
    }
  },
  plugins: [],
}