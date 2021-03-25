import express from 'express';
import mailerRouter from './Routes/mailRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/contactus',mailerRouter);

app.all('*', (req,res, next) =>{
    
    res.status(400).json({
        'message': `Can't find ${req.originalUrl} on this server`
    });

    next();
});

export default app;


