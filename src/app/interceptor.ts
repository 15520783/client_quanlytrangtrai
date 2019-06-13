import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { API, CONFIG, KEY, MESSAGE } from '../common/const';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Utils } from '../common/utils';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public events: Events, public util: Utils) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    headers.set('Access-Control-Allow-Origin','*');
    if (request.url != API.PUSH_NOTIFICATION && !request.url.includes('../..')) {
      request = request.clone({ url: CONFIG.SERVER_API + request.url, headers: headers });
    } else {
      request = request.clone({ url: request.url });
    }

    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      if (request.url !== CONFIG.SERVER_API.concat(API.LOGIN))
        // this.util.showLoading(MESSAGE[CONFIG.LANGUAGE_DEFAULT].PROCESS_DATA);
        this.util.openBackDrop();
    }

    return next.handle(request).pipe(
      tap(event => { }, error => {
        //intercept the respons error and displace it to the console
        console.log('Error occur', error);

        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
          if (request.url !== CONFIG.SERVER_API.concat(API.LOGIN))
            // this.util.closeLoading();
            this.util.closeBackDrop();
        }

        if (error.status === 401) {
          if (request.url === CONFIG.SERVER_API.concat(API.LOGIN)) {
            this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].LOGIN_INVALID);
          } else {
            this.util.removeKey(KEY.ACCESSTOKEN)
              .then(() => {
                this.util.removeKey(KEY.TOKENTYPE)
                  .then(() => {
                    this.events.publish('app_logout');
                  })
              })
            this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].SESSIONS_NOT_EXPIRE);
          }
        }
        else {
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR);
        }
        //return the error to the method that called it
        return error;
      }, () => {
        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
          if (request.url !== CONFIG.SERVER_API.concat(API.LOGIN) && request.url != API.PUSH_NOTIFICATION)
            this.util.closeBackDrop().then(() => {
              this.util.showToastSuccess(MESSAGE[CONFIG.LANGUAGE_DEFAULT].UPDATE_SUCCESS);
            });
          else if(request.url == API.PUSH_NOTIFICATION){
            this.util.closeBackDrop().then(() => {
              this.util.showToastSuccess('Gửi thông báo nhắc nhở thành công');
            });
          }
        }
      })
    )
  }
}