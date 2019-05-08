import { InputObject, status } from "../common/entity";
import { SettingsProvider } from "../providers/settings/settings";
import { SETTING_STORAGE_KEY } from "../common/const";

export class StatusPigRole {
    public object = new status();
    public keySettingStorage = SETTING_STORAGE_KEY.PREGNANCY_STATUS;

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
        public settingProvider: SettingsProvider
    ) {
    }


    insert() {
        return this.settingProvider.createNewPregnancyStatus(this.object)
    }

    delete(object){
        return this.settingProvider.deletePregnancyStatus(object);
    }

    update(){
        return this.settingProvider.updatePregnancyStatus(this.object);
    }

    clear(){
        this.object = new status();
    }
}