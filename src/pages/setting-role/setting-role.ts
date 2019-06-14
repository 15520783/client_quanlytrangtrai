import { Component, Renderer, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { permission, roles } from '../../common/entity';

import { SettingsProvider } from '../../providers/settings/settings';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';
import { VARIABLE } from '../../common/const';

@IonicPage()
@Component({
  selector: 'page-setting-role',
  templateUrl: 'setting-role.html',
})
export class SettingRolePage {

  @ViewChild('slider') slider: Slides;

  public rolePermission: any = {};
  public MainRolePermission: any;
  public listMainKey: Array<any> = [];

  public role: roles = new roles();
  public permissionObjectKey: any = {};

  constructor(
    public renderer: Renderer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public platform: Platform,
    public settingProvider: SettingsProvider,
    public util: Utils
  ) {
    if (this.navParams.data) {
      this.role = this.navParams.data;
    }

    this.MainRolePermission = VARIABLE.MENU_FIELDS;
    this.listMainKey = Object.keys(VARIABLE.MENU_FIELDS);

    Object.keys(this.userProvider.rolePermission).forEach((key) => {
      this.rolePermission[key] = new Array<any>();
      Object.keys(this.userProvider.rolePermission[key]).forEach((_key) => {
        this.rolePermission[key].push(this.userProvider.rolePermission[key][_key]);
      })
    });
  }

  ionViewDidLoad() {
    this.getAllPermission();
  }

  getAllPermission() {
    this.util.openBackDrop();
    this.settingProvider.getPermissionOfRole(this.role.id)
      .then((permissions: Array<permission>) => {
        if (permissions && permissions.length) {
          permissions.forEach(permission => {
            this.permissionObjectKey[permission.id] = permission;
          });
          console.log(this.permissionObjectKey);
        }
        this.util.closeBackDrop();
      })
      .catch((err) => {
        this.util.closeBackDrop();
        return err;
      })
  }

  onSubmit() {
    let listPermissionsRequest: Array<any> = [];
    this.listMainKey.forEach((key) => {
      let permission = this.rolePermission[this.MainRolePermission[key].codeName].filter((item) => {
        return item.granted == true;
      })
      listPermissionsRequest.push.apply(listPermissionsRequest, permission);
    })
    console.log(listPermissionsRequest);
  }

  scrollToView(idx: number) {
    this.slider.slideTo(idx);
  }

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;

    let element: any = document.getElementsByClassName('setting-util-component');
    for (let i = 0; i < element.length; i++) {
      this.renderer.setElementStyle(element[i], 'height', 90 + 'vH');
    }
  }
}
