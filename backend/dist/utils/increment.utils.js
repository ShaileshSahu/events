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
exports = function (changeEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        // Source document _id
        const docId = changeEvent.fullDocument._id;
        // Get counter and source collection instances
        const counterCollection = context.services.get("<ATLAS-SERVICE>").db(changeEvent.ns.db).collection("counters");
        const targetCollection = context.services.get("<ATLAS-SERVICE>").db(changeEvent.ns.db).collection(changeEvent.ns.coll);
        // automically increment and retrieve a sequence relevant to the current namespace (db.collection)
        const counter = yield counterCollection.findOneAndUpdate({ _id: changeEvent.ns }, { $inc: { seq_value: 1 } }, { returnNewDocument: true, upsert: true });
        // Set a generic field <COLLECTION_NAME>Id 
        const doc = {};
        doc[`${changeEvent.ns.coll}Id`] = counter.seq_value;
        const updateRes = yield targetCollection.updateOne({ _id: docId }, { $set: doc });
        console.log(`Updated ${JSON.stringify(changeEvent.ns)} with counter ${counter.seq_value} result: ${JSON.stringify(updateRes)}`);
    });
};
