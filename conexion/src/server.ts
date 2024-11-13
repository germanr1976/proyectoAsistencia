import Express from "express";
import routerAsist from "./router/router.Asist";
import routerCarrera from "./router/router.Carrera";
import routerPrecept from "./router/router.Precept";
import routerAlumn from "./router/router.Alumn";
import routerLogin from "./router/router.Auth";
import db from './config/db';
import cors from "cors";


const server = Express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,POST',
    credentials: true,
    optionsSuccessStatus: 204,

};

server.use(cors(corsOptions));
server.options('*', cors(corsOptions));
server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));
server.use('/api/asistencia', routerAsist);
server.use('/api/carrera', routerCarrera);
server.use('/api/preceptor', routerPrecept);
server.use('/api/alumno', routerAlumn);
server.use('/api/login', routerLogin);


async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
        console.log('DB is not connected');
    }
}
connectDB();

export default server;