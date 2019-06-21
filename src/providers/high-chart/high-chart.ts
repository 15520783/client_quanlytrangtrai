import Drilldown from 'highcharts/modules/drilldown';
import Highcharts from 'highcharts';
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsExporting from 'highcharts/modules/exporting';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
            }
          },
          showInLegend: true
        }
      },
      series: <any>[
        {
          colorByPoint: true,
          data: data
        }
      ],
      drilldown: {
        series: drilldownData
      }
    });
  }

  createBarchart(
    element: any,
    data: {
      khu_cach_ly: any,
      khu_noc: any,
      khu_phoi: any,
      khu_mang_thai: any,
      khu_de: any,
      khu_cai_sua: any,
      khu_hau_bi: any
    }) {
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
          'Khu hậu bị',
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
        data: [
          data.khu_cach_ly.male_pig.length,
          data.khu_noc.male_pig.length,
          data.khu_phoi.male_pig.length,
          data.khu_mang_thai.male_pig.length,
          data.khu_de.male_pig.length,
          data.khu_cai_sua.male_pig.length,
          data.khu_hau_bi.male_pig.length,
        ]

      }, {
        name: 'Nái',
        data: [
          data.khu_cach_ly.female_pig.length,
          data.khu_noc.female_pig.length,
          data.khu_phoi.female_pig.length,
          data.khu_mang_thai.female_pig.length,
          data.khu_de.female_pig.length,
          data.khu_cai_sua.female_pig.length,
          data.khu_hau_bi.female_pig.length,
        ]

      }, {
        name: 'Đực hiến',
        data: [
          data.khu_cach_ly.child_pig.length,
          data.khu_noc.child_pig.length,
          data.khu_phoi.child_pig.length,
          data.khu_mang_thai.child_pig.length,
          data.khu_de.child_pig.length,
          data.khu_cai_sua.child_pig.length,
          data.khu_hau_bi.child_pig.length,
        ]
      }]
    });
  }
}
