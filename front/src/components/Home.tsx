

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
            <div className="text-center px-6 py-10 bg-white bg-opacity-20 rounded-lg shadow-xl backdrop-filter backdrop-blur-md">
                <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg text-gray-100">
                    Sistema de Asistencia Alumnos
                </h1>
                <h2 className="text-3xl font-semibold mb-6 text-gray-200">
                    Instituto Superior Combate Mborore
                </h2>
                <p className="text-lg text-gray-100 font-light">
                    Bienvenidos al sistema de gestión de asistencia
                </p>
            </div>
        </div>
    );
};

export default Home;
