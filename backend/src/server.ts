import express from 'express';
import cors from 'cors';
import { userRouter } from './event/event.router';
const morgan = require('morgan');
import mongoose from 'mongoose';
const port = 3000;
const mongoURI = 'mongodb://127.0.0.1:27017/schedular'; 

class App {
  private app: express.Application;
  constructor(){
      this.app = express();
      this.addMiddlewares();
      this.connectDB();
      this.routes();
      this.start();
  }

  private addMiddlewares(){
    this.app.use(express.json());
    this.app.use(morgan('combined'));
    this.app.use(cors());
  }

  private connectDB(){
    mongoose.connect(mongoURI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Failed to connect to MongoDB', err);
    });
  }

  private routes(){
    this.app.use('/api/v1/event', userRouter);
    this.app.get('/', (req,res)=>{
        return res.send("Server is running");
    });
  }

  private start(){
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

new App();

