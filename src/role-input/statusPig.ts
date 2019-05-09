import { InputObject, status } from "../common/entity";
import { SettingsProvider } from "../providers/settings/settings";
import { SETTING_STORAGE_KEY } from "../common/const";
import { DeployDataProvider } from "../providers/deploy-data/deploy-data";

export class StatusPigRole {
    public object = new status();
    public keySettingStorage = SETTING_STORAGE_KEY.STATUS_PIG;



    public headerTitle = {
        insertMode: 'Nhập thông tin trạng thái heo',
        updateMode: 'Cập nhật thông tin trạng thái heo'
    }

    public inputRole: Array<InputObject> = [
        {
            name: 'name',
            label: 'Tên trạng thái heo',
            placeholder: 'Nhập tên trạng thái heo',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên trạng thái heo là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên trang thái heo không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.name,
            data: null
        },
        {
            name: 'code',
            label: 'Status code',
            placeholder: 'Nhập status code',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Status code là hạng mục bắt buộc',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-text",
            value: this.object.code,
            data: null
        },
        {
            name: 'previousStatus',
            label: 'Trạng thái trước',
            placeholder: 'Chọn trạng thái trước',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Trạng thái trước là hạng mục bắt buộc',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.code,
            data: this.deployData.get_statusCode_list_for_select()
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

    constructor(
        public settingProvider: SettingsProvider,
        public deployData: DeployDataProvider
    ) {
    }


    insert() {
        return this.settingProvider.createNewPigStatus(this.object)
    }

    delete(object){
        return this.settingProvider.deletePigStatus(object);
    }

    update(){
        return this.settingProvider.updatePigStatus(this.object);
    }

    clear(){
        this.object = new status();
    }
}