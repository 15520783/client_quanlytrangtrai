import { ErrorHandler } from "@angular/core";

export class MyErrorHandler implements ErrorHandler {
    handleError(err: any): void {
      // do something with the error
      console.log(err);
    }
  }