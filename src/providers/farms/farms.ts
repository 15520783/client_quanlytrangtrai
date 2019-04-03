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

  createPieChart(elementChart: any, data: Array<{ name: String, y: number, unit: String, sliced: boolean, selected: boolean }>, title: string, subtitle: string) {
    Highcharts.chart(elementChart, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
        '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
      credits: {
        enabled: false
      },
      title: {
        text: title
      },
      subtitle: {
        text: subtitle
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

  createBarchart(element: any) {
    Highcharts.chart(element, {
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
        '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
      xAxis: {
        categories: [
          'Khu cách ly',
          'Khu nọc',
          'Khu phối',
          'Khu mang thai',
          'Khu đẻ',
          'Khu cai sửa',
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Số lượng (con)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '<b>{point.y}</b>',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: <any>[{
        name: 'Đực',
        data: [573, 0, 55, 876, 798, 0]

      }, {
        name: 'Nái',
        data: [4, 100, 500, 1000, 200, 0]

      }, {
        name: 'Đực hiến',
        data: [4, 100, 50, 20, 10, 500]

      }]
    });
  }
}
