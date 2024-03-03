/**
 * @file Implements message class that stores all the fields pertaining to
 * a specific message.
 */

export default class Message {
    private message: string = '';
    private to: Number = 0;
    private from: Number = 0;
    private sentOn: Date = new Date();

    constructor(data: any) {
        this.message = data.message;
        this.to = data.to;
        this.from = data.from;
        this.sentOn = data.sentOn;
    }
}