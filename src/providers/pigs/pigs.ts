import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    public events: Events,
  ) {
    this.util.getKey(KEY.PIGS)
      .then((data) => {
        this.pigs = data;
      })
  }

  getPigs() {
    return this.http
      .get(API.GET_ALL_PIGS)
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise();
  }

  createPig(objBody: pig) {
    return this.http
      .post<pig>(API.CREATE_PIG, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise().then((pig: pig) => {
        if (pig) {
          this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
            pigs.push(pig);
            this.util.setKey(KEY.PIGS, pigs).then(() => {
              this.pigs = pigs;
            })
          })
        }
        return pig;
      });
  }

  updatePig(objBody: pig) {
    return this.http
      .put<pig>(API.UPDATE_PIG, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise().then((pig: pig) => {
        if (pig) {
          this.util.getKey(KEY.PIGS).then((pigs) => {
            let idx = pigs.findIndex(_pig => _pig.id == pig.id);
            if (idx > -1) {
              pigs[idx] = pig;
            } else {
              pigs.push(pig);
            }
            this.util.setKey(KEY.PIGS, pigs).then(() => {
              this.pigs = pigs;
            })
          })
        }
        return pig;
      })
  }

  removePig(objBody: pig) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http.delete(API.DELETE_PIG, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise().then((isOK) => {
        if (isOK) {
          this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
            let idx = pigs.findIndex(pig => pig.id == objBody.id);
            if (idx > -1)
              pigs.splice(idx, 1);
            this.util.setKey(KEY.PIGS, pigs).then(() => {
              this.pigs = pigs;
            });
          })
        }
        return isOK;
      });
  }

  getPigByID(id: string) {
    let pig: Array<pig> = this.pigs.filter((pig: pig) => {
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
    this.events.publish('updated');
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
        data: [pig.index / 200 * 5, pig.originWeight / 300 * 5, parseInt(pig.footTypeId) / 6 * 5, pig.totalUdder / 30 * 5, pig.bf / 16 * 5, pig.adg / 3000 * 5],
        pointPlacement: 'off',
      }]

    });
  }

}
