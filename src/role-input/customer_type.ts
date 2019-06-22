import { InputObject, customerType } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class CustomerTypesRole {
    public object = new customerType();
    public keySettingStorage = SETTING_STORAGE_KEY.CUSTOMER_TYPE;
    
    public headerTitle = {
        insertMode:'Nhập thông tin loại khách hàng',
        updateMode:'Cập nhật thông tin loại khách hàng'
    }

    public inputRole:Array<InputObject> =[
        {
            name:'name',
            label:'Tên loại khách hàng',
            placeholder:'Nhập tên loại khách hàng',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Tên loại khách hàng là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Tên loại khách hàng không được vượt quá 1000 ký tự'
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
        return this.settingProvider.createNewCustomerType(this.object)
    }

    delete(object){
        return this.settingProvider.deleteCustomerType(object);
    }

    update(){
        return this.settingProvider.updateCustomerType(this.object);
    }

    clear(){
        this.object = new customerType();
    }
}