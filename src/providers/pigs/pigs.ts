import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, CONFIG } from '../../common/const';
import { pig } from '../../common/entity';


@Injectable()
export class PigsProvider {

  protected pigs: Array<pig> = [];

  constructor(public http: HttpClient) {
    console.log('Hello PigsProvider Provider');
    
  }

  getPigs(){
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_PIGS)).toPromise();
	}
	

	public input: Array<pig> = [];
  public searchText: string = '';
  public searchWithText = [
    'pig_code',
    "birthday",
    "gender",
    "heath_point"
  ];

  public gender_parems: any = [];
  public searchWithInclude = {
    house_id: [],
    gender: [],

  }

  public searchWithRange = {
    origin_weight: { min: 0, max: 500 },
  }


  filter() {
    let result = this.input.filter((item) => {
      let check = 0;
      this.searchWithText.forEach(e => {
        if (item[e])
          check += (item[e].toString().toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ? 1 : 0;
        else return false;
      });
      return check > 0 ? true : false;
    })

    Object.keys(this.searchWithInclude).forEach((e) => {
      result = result.filter((value) => {
        if (this.searchWithInclude[e].length > 0) 
          return this.searchWithInclude[e].map(String).includes((value[e]).toString()) === true;
        else return true;
      })
    })


    Object.keys(this.searchWithRange).forEach((e) => {
      result = result.filter((value) => {
        return (this.searchWithRange[e].min <= value[e] && this.searchWithRange[e].max >= value[e]) ? true : false;
      })
    })

    return result;
  }
}
