import { InputObject, diseases } from "../common/entity";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class DiseasesRole {
    public object = new diseases();
    public keySettingStorage = SETTING_STORAGE_KEY.DISEASES;
    
    public headerTitle = {
        insertMode:'Nhập thông tin bệnh',
        updateMode:'Cập nhật thông tin bệnh'
    }

    public inputRole:Array<InputObject> =[
        {
            name:'name',
            label:'Tên bệnh',
            placeholder:'Nhập tên bệnh',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Tên bệnh là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Tên tbệnh không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value: this.object.name,
            data:null
        },
        {
            name:'agent',
            label:'Tác nhân',
            placeholder:'Nhập thông tin tác nhân',
            isRequire:false,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'',
                isNumber:'',
                isMaxlength:'Thông tin tác nhân không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value:this.object.agent,
            data:null
        },
        {
            name:'symptom',
            label:'Triệu chứng',
            placeholder:'Nhập thông tin triệu chứng',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Thông tin triệu chứng là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Thông tin triệu chứng không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value:this.object.symptom,
            data:null
        },
        {
            name:'diagnose',
            label:'Chuẩn đoán',
            placeholder:'Nhập thông tin chuẩn đoán',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Thông tin chuẩn đoán là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Thông tin chuẩn đoán không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value:this.object.diagnose,
            data:null
        },
        {
            name:'treatment',
            label:'Điều trị',
            placeholder:'Nhập thông tin điều trị',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Thông tin điều trị là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Thông tin điều trị không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value:this.object.treatment,
            data:null
        },
        {
            name:'note',
            label:'Ghi chú',
            placeholder:'Nhập thông tin ghi chú',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Thông tin ghi chú là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Thông tin ghi chú không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value:this.object.note,
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
        return this.settingProvider.createNewDisease(this.object)
    }

    delete(object){
        return this.settingProvider.deleteDisease(object);
    }

    update(){
        return this.settingProvider.updateDisease(this.object);
    }

    clear(){
        this.object = new diseases();
    }
}