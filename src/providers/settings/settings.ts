import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { breeds } from '../../common/entity';

@Injectable()
export class SettingsProvider {


  public breeds:Array<breeds> = []

  constructor(public http: HttpClient) {
    console.log('Hello SettingsProvider Provider');
  }

  

}
