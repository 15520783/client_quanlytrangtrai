import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

@Injectable()
export class HighChartProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HighChartProvider Provider');
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
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} {point.unit})'
      },
      plotOptions: {
        pie: {
          size: '80%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} % ',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: <any>[
        {
          name: '',
          colorByPoint: true,
          data: data
        }
      ]
    });
  }

  createPieDrilldownChart(elementChart: any, data: Array<{ name: String, y: number, unit: String, sliced: boolean, selected: boolean }>, drilldownData, title: string, subtitle: string) {
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
          size: '80%',
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
          // name: 'Brands',  
          colorByPoint: true,
          data: data
        }
      ],
      drilldown: {
        series: drilldownData
      }
    });
  }
}
