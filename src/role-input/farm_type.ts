import { InputObject, farmTypes } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class FarmTypesRole {
    public object = new farmTypes();
    public keySettingStorage = SETTING_STORAGE_KEY.FARM_TYPE;
    
    public headerTitle = {
        insertMode:'Nhập thông tin loại trang trại',
        updateMode:'Cập nhật thông tin loại trang trại'
    }

    public inputRole:Array<InputObject> =[
        {
            name:'name',
            label:'Tên loại trang trại',
            placeholder:'Nhập tên loại trang trại',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Tên loại trang trại là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Tên loại trang trại không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value: this.object.name,
            data:null
        },
        {
            name:'description',
            label:'Mô tả',
            placeholder:'Nhập thông tin mô tả',
            isRequire:false,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'',
                isNumber:'',
                isMaxlength:'Thông tin mô tả không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value:this.object.description,
            data:null
        }
    ];

    constructor(public settingProvider:SettingsProvider){

    }

    insert() {
        return this.settingProvider.createNewFarmType(this.object)
    }

    delete(object){
        return this.settingProvider.deleteFarmType(object);
    }

    update(){
        return this.settingProvider.updateFarmType(this.object);
    }

    clear(){
        this.object = new farmTypes();
    }
}