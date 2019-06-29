import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    constructor(){}
    handleError(err: any): void {
      // do something with the error
      console.log(err);
    }
  }