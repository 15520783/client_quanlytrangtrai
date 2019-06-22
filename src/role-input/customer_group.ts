import { InputObject, customerGroups, customerType } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class CustomerGroupsRole {
    public object = new customerType();
    public keySettingStorage = SETTING_STORAGE_KEY.CUSTOMER_GROUP;
    
    public headerTitle = {
        insertMode:'Nhập thông tin nhóm khách hàng',
        updateMode:'Cập nhật thông tin nhóm khách hàng'
    }

    public inputRole:Array<InputObject> =[
        {
            name:'name',
            label:'Tên nhóm khách hàng',
            placeholder:'Nhập tên nhóm khách hàng',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Tên nhóm khách hàng là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Tên nhóm khách hàng không được vượt quá 1000 ký tự'
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
        return this.settingProvider.createCustomerGroup(this.object)
    }

    delete(object){
        return this.settingProvider.deleteCustomerGroup(object);
    }

    update(){
        return this.settingProvider.updateCustomerGroup(this.object);
    }

    clear(){
        this.object = new customerGroups();
    }
}