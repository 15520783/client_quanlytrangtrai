import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { API, CONFIG } from '../../common/const';
import { farm } from '../../common/entity';
import Highcharts from 'highcharts';

@Injectable()
export class FarmsProvider {

  public farms: Array<farm> = []

  constructor(
    public http: HttpClient,
    public util: Utils
  ) {

  }


  public getFarms() {
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_FARMS)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  createChartQuantity(elementChart: any, data: Array<{ name: String, y: number, unit: String, sliced: boolean, selected: boolean }>) {
    Highcharts.chart(elementChart, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Quy mô trang trại'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %  ({point.y} {point.unit})',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: <any>[
        {
          name: 'Brands',
          colorByPoint: true,
          data: data
        }
      ]
    });
  }
}
