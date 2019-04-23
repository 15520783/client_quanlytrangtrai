import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data'
Drilldown(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

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
      colors: ['#04A9FF', '#FFB840', '#FF5A47', '#00BD9F', '#3D96AE',
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
          size: '60%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            distance: 20,
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} % ',
            style: {
              color: 'black'
            },
          },
          showInLegend: true
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
    // let options = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
    Highcharts.chart(elementChart, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      colors: ['#04A9FF', '#FFB840', '#FF5A47', '#00BD9F', '#3D96AE',
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
          size: '60%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            distance: 20,
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %  ({point.y} {point.unit})',
            style: {
              color: 'black'
            }
          },
          showInLegend: true
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
      colors: ['#04A9FF', '#FFB840', '#FF5A47', '#00BD9F', '#3D96AE',
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
