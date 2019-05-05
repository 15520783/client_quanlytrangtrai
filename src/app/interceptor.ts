import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';

import { CONFIG, KEY, API } from '../common/const';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Events } from 'ionic-angular';
import { Utils } from '../common/utils';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public events: Events, public util: Utils) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    request = request.clone({ url: CONFIG.SERVER_API + request.url, headers: headers });

    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      if (request.url !== CONFIG.SERVER_API.concat(API.LOGIN))
        this.util.showLoading('Đang xử lí dữ liệu');
    }

    return next.handle(request).pipe(
      tap(event => { }, error => {
        //intercept the respons error and displace it to the console
        console.log('Error occur', error);

        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
          if (request.url !== CONFIG.SERVER_API.concat(API.LOGIN))
            this.util.closeLoading();
        }

        if (error.status === 401) {
          if (request.url === CONFIG.SERVER_API.concat(API.LOGIN)) {
            this.util.showToast('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại');
          } else {
            this.util.removeKey(KEY.ACCESSTOKEN)
              .then(() => {
                this.util.removeKey(KEY.TOKENTYPE)
                  .then(() => {
                    this.events.publish('app_logout');
                  })
              })
            this.util.showToast('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại');
          }
        }
        else {
          this.util.showToast('Có lỗi xảy ra. Vui lòng kiểm tra lại.');
        }
        //return the error to the method that called it
        return Observable.throw(error);
      }, () => {
        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
          if (request.url !== CONFIG.SERVER_API.concat(API.LOGIN))
            this.util.closeLoading().then(() => {
              this.util.showToastSuccess('Dữ liệu cập nhật thành công');
            });
        }
      })
    )
  }
}