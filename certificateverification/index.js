function main() {
    require('dotenv').config();
    require('./config/db');
    const express = require('express');
    const bodyParser = require('body-parser');
    const port = process.env.PORT || 3000;
    const api = process.env.API_URL || '/api/v1';
    const certicateRoutes = require('./routes/certificate.routes');
    const certicateQueryRoutes = require('./routes/certificate-query.routes');
    const userRoutes = require('./routes/user.routes');
    const app = express();
    const { errorHandler } = require('./middlewares/error-handler');
    // const cron = require('node-cron');
    const path = require('path');
    // public folder to upload files or (evidenes in this project)
    const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER;
    app.use((req, res, next) => {
        const allowedOrigins = [
            process.env.FRONTEND_LOCAL_HOST_URL,
            process.env.FRONTEND_LOCAL_IP_URL,
            process.env.FRONTEND_LIVE_URL
        ];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }

        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header(
            "Access-Control-Allow-Headers",
            "Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization"
        );
        res.header("Access-Control-Allow-Credentials", true);
        return next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/" + UPLOAD_FOLDER, express.static(path.join(__dirname, UPLOAD_FOLDER)));

    // Route Middelwares
    app.use(`${api}/certicates`, certicateRoutes);
    app.use(`${api}/certicate-query`, certicateQueryRoutes);
    app.use(`${api}/users`, userRoutes);

    // empty route
    // app.get('/', (req, res) => {
    //     try {
    //         res.send('Node server running successfully.');
    //     } catch (error) {
    //         next(error);
    //     }
    // });

    // cron.schedule('0 0 * * *', async () => {
    //     try {
    //         // Implement your logic here to delete documents based on conditions
    //     } catch (error) {
    //         console.log('Error deleting documents:', error);
    //     }
    // });


    app.use(express.static(path.join(__dirname, 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

    // Error handler Middelware
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Node server is listening on port ${port}`);
    });
}

main();
