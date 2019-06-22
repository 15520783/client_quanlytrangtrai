import { API, CONFIG, KEY, VARIABLE } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Events } from 'ionic-angular';
import Highcharts from 'highcharts';
import HightchartMore from 'highcharts-more';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';
import { pig } from '../../common/entity';

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

  public updatedPig = (pig: pig) => {
    if (pig) {
      let idx = this.pigs.findIndex(_pig => _pig.id == pig.id);
      if (idx > -1) {
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
      else {
        this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
          pigs.push(pig);
          this.util.setKey(KEY.PIGS, pigs).then(() => {
            this.pigs = pigs;
          })
        })
      }
    }
  }

  removedPig = (pig: pig) => {
    if (pig) {
      let idx = this.pigs.findIndex(_pig => _pig.id == pig.id);
      if (idx > -1) {
        this.pigs.splice(idx, 1);
        this.util.getKey(KEY.PIGS).then(pigs => {
          let idx = pigs.findIndex(_pig => _pig.id == pig.id);
          if (idx > -1) {
            pigs.splice(idx, 1);
            this.util.setKey(KEY.PIGS, pigs);
          }
        })
      }
    }
  }

  getPigs() {
    return this.http
      .get(API.GET_ALL_PIGS)
      .timeout(CONFIG.DEFAULT_TIMEOUT).toPromise()
      .then((data: Array<pig>) => {
        console.log(data.length);
        data = data.filter((pig:pig)=>{
          return pig.statusId != '18' ? true:false;
        })
        console.log(data.length);
        this.pigs = data;
        if (data.length) {
          this.util.setKey(KEY.PIGS, data)
        }
        return data;
      })
    // .catch((err) => {
    //   return err;
    // })
  }

  /**
   * Gửi request lấy thông tin tổng quát của heo
   * @param pigId 
   */
  getInformationPig(pigId: string) {
    return this.http
      .get(API.GET_INFORMATION_PIG.concat(pigId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Gửi request tạo mới heo
   * @param objBody 
   */
  createPig(objBody: pig) {
    return this.http
      .post<pig>(API.CREATE_PIG, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise()
      .then((pig: pig) => {
        this.updatedPig(pig);
        return pig;
      });
  }

  /**
   * Gửi request cập nhật heo
   * @param objBody 
   */
  updatePig(objBody: pig) {
    return this.http
      .put<pig>(API.UPDATE_PIG, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise().then((pig: pig) => {
        this.updatedPig(pig);
        return pig;
      })
  }

  /**
   * Gửi request xóa heo
   * @param objBody 
   */
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

  /**
   * Cập nhật trạng thái heo sang đã bán
   * @param pigs 
   */
  updateSoldStatusForPigs(pigs: Array<pig>) {
    return this.http
      .put(API.UPDATE_SOLD_STATUS_FOR_PIGS, pigs)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Đánh giá offset heo
   * @param pigId 
   */
  reviewOffset(pigId: string) {
    return this.http
      .get(API.MINING_TO_REVIEW_OFFSET + pigId)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật minings
   * @param pigId 
   * @param classification 
   */
  updateDataMining(pigId: string, classification: string) {
    return this.http
      .get(API.UPDATE_MINING_DATA + pigId + '/' + classification)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  getPigByID(id: string) {
    let pig: Array<pig> = this.pigs.filter((pig: pig) => {
      return pig.id === id ? true : false;
    })
    return pig[0];
  }

  sync() {
    this.getPigs()
      .then(() => {
        this.publishUpdateEvent();
      })
      .catch((err) => {
        this.publishUpdateEvent();
        console.log('err_pig_provider', err);
        this.util.getKey(KEY.PIGS)
          .then((data: Array<pig>) => {
            this.pigs = data;
          })
        this.util.showToast('Danh sách heo chưa được cập nhật. Vui lòng kiểm tra kết nối.');
      })

  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }

  ViewIndexChart(pig: pig, element: any) {

    let point = this.get_point_review_of_pig(pig);

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
        size: '60%'
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
        // max: 6,
        // tickInterval: 2
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
      },
      legend: {
        align: 'center',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
      },
      series: <any>[{
        name: 'Chỉ số heo',
        data: [point.index, point.weight, point.foot, point.udder, point.gential, point.adg],
        pointPlacement: 'on',
      }]
    });
  }


  get_point_review_of_pig(pig: pig) {
    let review: { index: number, weight: number, udder: number, foot: number, gential: number, adg: number };

    review = { index: 0, weight: 0, udder: 0, foot: 0, gential: 0, adg: 0 };

    //Index
    if (pig.index > 105) {
      review.index = 1;
    } else if (pig.index > 95 && pig.index <= 105) {
      review.index = 2;
    } else if (pig.index > 85 && pig.index <= 95) {
      review.index = 3;
    } else {
      review.index = 4;
    }

    //Trong luong
    if (pig.originWeight > 150) {
      review.weight = 1;
    } else if (pig.originWeight > 110 && pig.originWeight <= 150) {
      review.weight = 2;
    } else if (pig.originWeight > 90 && pig.originWeight <= 110) {
      review.weight = 3;
    } else {
      review.weight = 4;
    }

    //Vu
    if (pig.totalUdder >= 16) {
      review.udder = 1;
    } else if (pig.totalUdder >= 14 && pig.totalUdder <= 15) {
      review.udder = 2;
    } else if (pig.totalUdder >= 12 && pig.totalUdder <= 13) {
      review.udder = 3;
    } else {
      review.udder = 4;
    }

    //BPSD
    if (parseInt(pig.gentialTypeId) == 4 || parseInt(pig.gentialTypeId) == 5) {
      review.gential = 1;
    } else if (parseInt(pig.gentialTypeId) == 3) {
      review.gential = 2;
    } else if (parseInt(pig.gentialTypeId) == 2) {
      review.gential = 3;
    } else {
      review.gential = 4;
    }


    //Chân
    if (parseInt(pig.footTypeId) == 4 || parseInt(pig.footTypeId) == 5) {
      review.foot = 1;
    } else if (parseInt(pig.footTypeId) == 3) {
      review.foot = 2;
    } else if (parseInt(pig.footTypeId) == 2) {
      review.foot = 3;
    } else {
      review.foot = 4;
    }

    //ADG
    if (pig.adg > 900) {
      review.adg = 1;
    } else if (pig.adg > 800 && pig.adg <= 900) {
      review.adg = 2;
    } else if (pig.adg > 700 && pig.adg <= 800) {
      review.adg = 3;
    } else {
      review.adg = 4;
    }

    console.log(review);
    return review;
  }
}
