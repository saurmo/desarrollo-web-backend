
export class ResponseModel {

     ok: boolean;
     message: string;
     info:  any[] | any;

    constructor(ok: boolean, message: string, info?: any[] | any) {
        this.ok = ok;
        this.message = message;
        this.info = info;
    }


}