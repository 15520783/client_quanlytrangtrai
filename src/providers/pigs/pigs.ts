import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, CONFIG, KEY } from '../../common/const';
import { pig } from '../../common/entity';
import Highcharts from 'highcharts';
import HightchartMore from 'highcharts-more';
import { Utils } from '../../common/utils';
import { Events } from 'ionic-angular';
HightchartMore(Highcharts);

@Injectable()
export class PigsProvider {

  public pigs: Array<pig> = [];
  public updated_flag = false;


  constructor(
    public http: HttpClient,
    public util: Utils,
    public events: Events
  ) {
    console.log('Hello PigsProvider Provider');
  }

  getPigs() {
    return this.http.get(CONFIG.SERVER_API.concat(API.GET_ALL_PIGS)).timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  getPigByID(id: string) {
    let pig:Array<pig> =  this.pigs.filter((pig: pig) => {
      return pig.id === id ? true : false;
    })
    return pig[0];
  }

  sync() {
    this.getPigs()
      .then((data: Array<pig>) => {
        if (data.length) {
          this.util.setKey(KEY.PIGS, data)
            .then(() => {
              this.pigs = data;
              this.publishUpdateEvent();
            })
            .catch((err) => {
              this.pigs = data;
              this.publishUpdateEvent();
              console.log('err_storage_pigs', err);
            })
        }
      })
      .catch((err) => {
        console.log('err_pig_provider', err);
        this.util.getKey(KEY.PIGS)
          .then((data: Array<pig>) => {
            this.pigs = data;
            this.publishUpdateEvent();
          })
          .catch((err) => {
            this.publishUpdateEvent();
            console.log('err_get_storage_pig', err);
          })
        this.util.showToast('Danh sách heo chưa được cập nhật. Vui lòng kiểm tra kết nối.');
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated:pig');
  }

  ViewIndexChart(pig: pig, element: any) {
    Highcharts.chart(element, {

      chart: {
        polar: true,
        type: 'area'
      },

      title: {
        text: '',
        // x: -80
      },

      pane: {
        size: '80%'
      },

      xAxis: {
        categories: ['Index', 'Trọng lượng', 'Chân', 'Số vú', 'BPSD', 'ADG'],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },

      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 6,
        tickInterval: 2
      },

      tooltip: {
        shared: true,
        valuePrefix: '$'
      },

      legend: {
        align: 'center',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
      },

      series: <any>[{
        name: 'Chỉ số heo',
        data: [pig.index / 200 * 5, pig.origin_weight / 300 * 5, pig.foot / 6 * 5, pig.total_udder / 30 * 5, pig.bf / 16 * 5, pig.adg / 3000 * 5],
        pointPlacement: 'off',
      }]

    });
  }

}
