import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo_project.png';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Verifica la autenticación al cargar el componente
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsAuthenticated(!!authToken); // Se autentica solo si hay un token en localStorage
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remueve el token al cerrar sesión
        setIsAuthenticated(false);
        navigate('/'); // Redirige al home después de cerrar sesión
    };

    const handleLogin = () => {
        // Aquí deberías manejar la autenticación real (por ejemplo, setear un token después de validarlo)
        localStorage.setItem('authToken', 'your-token'); // Guarda un token simulado
        setIsAuthenticated(true);
        navigate('/login'); // Redirige al dashboard o a la página deseada después de loguearse
    };

    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <img src={logo} alt="Logo del Proyecto" className="w-11 h-11 bg-indigo-500 rounded-full" />
                    <span className="ml-3 text-xl">Home</span>
                </Link>

                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <div className="relative group">
                        <Link to="/" className="mr-5 hover:text-white">Gestionar</Link>
                        <div className="absolute hidden group-hover:block bg-gray-700 rounded-md shadow-lg z-10">
                            <ul className="py-2">
                                <li>
                                    <Link to="/alumnos" className="block px-4 py-2 text-sm hover:bg-gray-600 text-white">Alumnos</Link>
                                </li>
                                <li>
                                    <Link to="/carreras" className="block px-4 py-2 text-sm hover:bg-gray-600 text-white">Carreras</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group">
                        <Link to="" className="mr-5 hover:text-white">Registrar</Link>
                        <div className="absolute hidden group-hover:block bg-gray-700 rounded-md shadow-lg z-10">
                            <ul className="py-2">
                                <li>
                                    <Link to="/asistencia" className="block px-4 py-2 text-sm hover:bg-gray-600 text-white">Asistencia</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group">
                        <Link to="/asistencia" className="mr-5 hover:text-white">Reportes</Link>
                        <div className="absolute hidden group-hover:block bg-gray-700 rounded-md shadow-lg z-10">
                            <ul className="py-2">
                                <li>
                                    <Link to="/asistencia/reporte-general" className="block px-4 py-2 text-sm hover:bg-gray-600 text-white">Reporte General</Link>
                                </li>
                                <li>
                                    <Link to="/asistencia/reporte-detallado" className="block px-4 py-2 text-sm hover:bg-gray-600 text-white">Reporte Detallado</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center bg-red-600 border-0 py-1 px-3 focus:outline-none hover:bg-red-500 rounded text-base mt-4 md:mt-0"
                    >
                        Cerrar Sesión
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-400 rounded text-base mt-4 md:mt-0"
                    >
                        Login
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
