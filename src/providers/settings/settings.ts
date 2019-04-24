import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { breeds, pregnancy_status, breeding_type, health_status, diseases, farm_type, food_type, food, medicine_type, medicine_units, price_codes, foot_type, gential_type, issues, mark_types, medicines } from '../../common/entity';

@Injectable()
export class SettingsProvider {


  public setting: {
    pregnancyStatus:Array<pregnancy_status>,
    breeds:Array<breeds>,
    breedingType:Array<breeding_type>,
    health_status:Array<health_status>,
    diseases:Array<diseases>,
    farmType:Array<farm_type>,
    foodType:Array<food_type>,
    food:Array<food>,
    medicineType:Array<medicine_type>,
    medicineUnits:Array<medicine_units>,
    medicines:Array<medicines>
    priceCodes:Array<price_codes>,
    footTypes:Array<foot_type>,
    gentialTypes:Array<gential_type>,
    issues:Array<issues>,
    markTypes:Array<mark_types>
  } 


  constructor(public http: HttpClient) {
    console.log('Hello SettingsProvider Provider');
  }

  

}
