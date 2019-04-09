import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';

@Injectable()
export class FilterProvider {

  constructor(
    public http: HttpClient,
    public util: Utils
  ) {
    console.log('Hello FilterProvider Provider');
  }

  public input: any = [];
  public searchText: string = '';
  public searchWithText: Array<string> = [
    // 'pig_code',
    // "birthday",
    // "gender",
    // "heath_point"
  ];

  // public gender_parems: any = [];
  public searchWithInclude: any = {
    house_id: [],
    gender: [],
    breed_id: [],
    round_id: [],
  }

  public searchWithRange: any = {
    // origin_weight: { min: null, max: null },
    // origin_sum_weight: { min: null, max: null },
    // origin_avg_weight: { min: null, max: null }
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

    console.log(this.searchWithRange);
    Object.keys(this.searchWithRange).forEach((e) => {
      result = result.filter((value) => {
        // if (value[e] !== undefined)
          return (this.searchWithRange[e].min <= value[e] && this.searchWithRange[e].max >= value[e]) ? true : false;
        // else return true;
      })
    })

    return result;
  }
}
