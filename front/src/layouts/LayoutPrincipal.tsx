import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutPrincipal = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen dark:bg-gray-800">
                <Header />
                {/* Este div asegura que el contenido llene el espacio restante */}
                <div className="flex-grow">
                    {/* El Outlet es donde se cargan las rutas correspondientes */}
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default LayoutPrincipal;
