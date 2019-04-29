import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousesProvider } from '../houses/houses';
import { PigsProvider } from '../pigs/pigs';
import { FarmsProvider } from '../farms/farms';

/*
  Generated class for the DeployDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeployDataProvider {

  constructor(
    public http: HttpClient,
    public houseProvider: HousesProvider,
    public pigsProvider: PigsProvider,
    public farmProvider: FarmsProvider
  ) {
  }

  /**
   * Lấy danh sách heo nọc trong trang trại
   * @param farmId 
   */
  get_male_pig_of_farm(farmId) {
    let housesId:any = [];
    this.houseProvider.houses.filter((house) => {
      return (house.section.farm.id == farmId && house.section.typeId !== "6" && house.section.typeId !== "7") ? true : false;
    }).forEach((house) => {
      housesId.push(house.id);
    })
    return this.pigsProvider.pigs.filter((pig) => {
      return (housesId.includes(pig.houseId) && pig.gender == 1) ? true : false;
    })
  }

  /**
   * Lấy danh sách heo nái trong trang trại
   * @param farmId 
   */
  get_female_pig_of_farm(farmId) {
    let housesId:any = [];
    this.houseProvider.houses.filter((house) => {
      return (house.section.farm.id == farmId && house.section.typeId !== "6" && house.section.typeId !== "7") ? true : false;
    }).forEach((house) => {
      housesId.push(house.id);
    })
    return this.pigsProvider.pigs.filter((pig) => {
      return (housesId.includes(pig.houseId)  && pig.gender == 2) ? true : false;
    })
  }

  get_child_pig_of_farm(farmId){
    
  }


  // get_summary_of_farm(farmId: String) {
  //   let result: { male: number, female: number, child: number };
  // }
}
