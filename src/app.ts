import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';


//parser
app.use(express.json());
app.use(cors());


app.use('/api/v1/users', UserRoutes)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app;