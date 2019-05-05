import { InputObject, breeds } from "../common/entity";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class BreedsRole {
    public object = new breeds();
    public keySettingStorage = SETTING_STORAGE_KEY.BREEDS;

    public headerTitle = {
        insertMode:'Nhập thông tin giống',
        updateMode:'Cập nhật thông tin giống'
    }
    
    public inputRole: Array<InputObject> = [
        {
            name: 'name',
            label: 'Tên  giống',
            placeholder: 'Nhập tên giống',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên giống là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên giống không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.name,
            data: null
        }, {
            name: 'lineCode',
            label: 'Mã dòng',
            placeholder: 'Nhập mã dòng',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Mã dòng là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Mã dòng không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.lineCode,
            data: null
        },
        {
            name: 'symbol',
            label: 'Ký hiệu',
            placeholder: 'Nhập ký hiệu',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Ký hiệu là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Ký hiệu không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.symbol,
            data: null
        },
        {
            name: 'level',
            label: 'Cấp giống',
            placeholder: 'Nhập cấp giống',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Ký hiệu là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Ký hiệu không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.level,
            data: null
        },
        {
            name: 'description',
            label: 'Mô tả',
            placeholder: 'Nhập thông tin mô tả',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: '',
                isNumber: '',
                isMaxlength: 'Thông tin mô tả không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.description,
            data: null
        }
    ];

    constructor(public settingProvider:SettingsProvider) {

    }

    insert() {
        return this.settingProvider.createNewBreed(this.object)
    }

    delete(object){
        return this.settingProvider.deleteBreed(object);
    }

    update(){
        return this.settingProvider.updateBreed(this.object);
    }

    clear(){
        this.object = new breeds();
    }
}