import { createBrowserRouter } from "react-router-dom";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import Login, { action as actionLogin } from "./components/Login";
import Registropreceptor, { action as actionRegistro } from "./components/Register";
import RegistroAlumno, { action as actionFormularioAlumno } from "./views/FormularioAlumnos";
import RegistroCarrera, { action as actionFormularioCarrera, loader as LoaderListaCarrera } from "./views/FormularioCarreras";
import FormularioAsistencia, { action as actionFormularioAsistencia, loader as LoaderListaAlumno } from "./views/FormularioAsistencia";
import Home from "./components/Home";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPrincipal />,
        children: [
            {
                index: true,  // Página principal que carga la vista de productos
                element: <Home />  // Carga Productos en la página principal
            },
            {
                path: 'home',  // Ruta para la vista de productos
                element: <Home />
            },
            {
                path: 'login',  // Ruta para la vista de login
                element: <Login />,
                action: actionLogin
            },
            {
                path: 'preceptor',  // Nueva ruta para la vista de registro
                element: <Registropreceptor />,
                action: actionRegistro
            },
            {
                path: 'asistencia',  // Ruta para la vista de asistencia
                element: <FormularioAsistencia />,
                action: actionFormularioAsistencia,
                loader: LoaderListaAlumno
            },
            {
                path: 'alumnos',  // Ruta para la vista de Alumnos
                element: <RegistroAlumno />,
                action: actionFormularioAlumno
            },
            {
                path: 'carreras',  // Ruta para la vista de Carreras
                element: <RegistroCarrera />,
                action: actionFormularioCarrera,
                loader: LoaderListaCarrera
            },

        ]
    }
]);