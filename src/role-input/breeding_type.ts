import { InputObject, breedingType } from "../common/entity";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class BreedingTypesRole {
    public object = new breedingType();
    public keySettingStorage = SETTING_STORAGE_KEY.BREEDING_TYPE;
    
    public headerTitle = {
        insertMode:'Nhập thông tin trạng thái lên giống',
        updateMode:'Cập nhật thông tin trạng thái lên giống'
    }

    public inputRole:Array<InputObject> =[
        {
            name:'name',
            label:'Tên trạng thái lên giống',
            placeholder:'Nhập tên trạng thái lên giống',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Tên trạng thái lên giống là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Tên trạng thái lên giống không được vượt quá 1000 ký tự'
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
        return this.settingProvider.createNewBreedingType(this.object)
    }

    delete(object){
        return this.settingProvider.deleteBreedingType(object);
    }

    update(){
        return this.settingProvider.updateBreedingType(this.object);
    }

    clear(){
        this.object = new breedingType();
    }
}