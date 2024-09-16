import express, { Request, Response, response } from 'express';
import { eventController } from "./event.controller";
import { sendResponse } from "../utils/response.utils";
import { eventValidationRules, validate, voteValidationRules } from './event.validator';

const router = express.Router();


router.get("/list", async (req: Request,res:Response)=>{
    try{
        const data:any = await eventController.getEventList();
        return sendResponse(200,res,data);
    } catch(error){
        return sendResponse(500, res, error);
    }
});

router.post("/", eventValidationRules, validate, async(req: Request,res: Response)=>{
    try{
        const body:IEventCreate = req.body;
        const data:any = await eventController.createEvent(body);
        return sendResponse(201,res,data);
    } catch(error: any){
        return sendResponse(500, res, error);
    }
});

router.get("/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const data:any = await eventController.getEvent(id);
        return sendResponse(200,res,data);
    } catch(error){
        return sendResponse(500, res, error);
    }
});

router.post("/:id/vote", voteValidationRules, validate, async(req: Request,res: Response)=>{
    try{
        const body: any = req.body;
        const {id} = req.params;
        const data:any = await eventController.createVote(id,body);
        return sendResponse(201,res,data);
    } catch(error){
        return sendResponse(500, res, error);
    }
});

router.get("/:id/results", async(req,res)=>{
    try{
        const {id} = req.params;
        const data:any = await eventController.getResult(id);
        return sendResponse(200,res,data);
    } catch(error){
        return sendResponse(500, res, error);
    }
});

export const userRouter = router;

