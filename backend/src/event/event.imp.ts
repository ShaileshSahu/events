
interface IEventCreate{
    name: String;
    dates: Array<String>;
}

interface IVoteCreate{
    name: String;
    dates: Array<String>;
}


interface IEvent{
    id: Number,
    name: String
}

interface IEventList{
    events:Array<IEvent>;
}