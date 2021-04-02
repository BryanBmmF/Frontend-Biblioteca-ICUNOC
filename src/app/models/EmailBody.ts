export class EmailBody{
    email: string;
    content: string;
    subject: string;
    constructor(email:string, content:string, subject:string){
        this.email= email;
        this.content= content;
        this.subject= subject;

    }
}