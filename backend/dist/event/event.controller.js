"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = void 0;
var mongoose = require('mongoose');
const event_entity_1 = require("./event.entity");
const votes_entity_1 = require("./votes.entity");
// Event Controler !!
class EventController {
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const create = yield event_entity_1.Event.create(event);
            return create;
        });
    }
    getEventList() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield event_entity_1.Event.find({}, { name: 1, id: 1 });
            return { "events": list };
        });
    }
    getEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield event_entity_1.Event.aggregate([{ $match: { _id: id } }, {
                    $lookup: {
                        from: 'votes',
                        foreignField: 'eventId',
                        as: 'votes'
                    }
                }]);
            return events;
        });
    }
    createVote(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let date of payload.dates) {
                yield votes_entity_1.Vote.create({ name: payload.name, eventId: id, date: date });
            }
            const result = yield event_entity_1.Event.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) }
                }, {
                    $lookup: {
                        from: 'votes',
                        foreignField: 'eventId',
                        localField: "_id",
                        as: 'votes'
                    }
                }, {
                    $project: {
                        votes: {
                            $map: {
                                input: "$votes",
                                as: "vote",
                                in: {
                                    data: "$$vote.date"
                                }
                            }
                        },
                        eventDetails: "$$ROOT"
                    }
                }, {
                    $unwind: "$votes"
                }
            ]);
            return result;
        });
    }
    getResult(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.eventController = new EventController();
