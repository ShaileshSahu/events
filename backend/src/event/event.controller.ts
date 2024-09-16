var mongoose = require('mongoose');
import { Event } from "./event.entity";
import { Vote } from "./votes.entity";


// Event Controler !!
class EventController 
{
    async createEvent(event: IEventCreate): Promise<any>{
       const create = await Event.create(event);
       return create;
    }

    async getEventList():Promise<IEventList>{
        const list: Array<IEvent> = await Event.find({},{name:1,id:1});
        return {"events":list};
    }

    async getEvent(id: String): Promise<any>{
        const events:any = await Event.aggregate([{$match:{_id:id}},{
                $lookup:{
                    from: 'votes',
                    foreignField: 'eventId',
                    as: 'votes'
                }
        }]);
        return events;
    }

    async createVote(id: String, payload: IVoteCreate):Promise<any>{
        for (let date of payload.dates) {
            await Vote.create({name:payload.name, eventId: id, date: date});
        }

        const result: any = await Event.aggregate([
            {
                $match:{ _id: new mongoose.Types.ObjectId(id)}
            },{
                $lookup:{
                    from: 'votes',
                    foreignField: 'eventId',
                    localField:"_id",
                    as: 'votes'
                }
        }]);

        const response = {
            id: result._id,
            name: result.name,
            dates: result.dates,
            votes: result.votes.map((v: any) =>Object.assign({people: v.name, date: v.date}))
        };
        
        return response;
    }

    async getResult(id: String):Promise<any>{
        for (let date of payload.dates) {
            await Vote.create({name:payload.name, eventId: id, date: date});
        }

        const result: any = await Event.aggregate([
            {
                $match:{ _id: new mongoose.Types.ObjectId(id)}
            },{
                $lookup:{
                    from: 'votes',
                    foreignField: 'eventId',
                    localField:"_id",
                    as: 'votes'
                }
        }]);

        const response = {
            id: result._id,
            name: result.name,
            dates: result.dates,
            votes: result.votes.map((v: any) =>Object.assign({people: v.name, date: v.date}))
        };
        
        return response;
    }

}

export const eventController = new EventController();