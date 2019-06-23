import { InputObject, regencies, } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class RegencyRole {
    public object = new regencies();
    public keySettingStorage = SETTING_STORAGE_KEY.REGENCIES;

    public headerTitle = {
        insertMode: 'Nhập thông tin chức vụ',
        updateMode: 'Cập nhật thông tin chức vụ'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên chức vụ',
            placeholder: 'Nhập tên chức vụ',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên chức vụ là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên chức vụ không được vượt quá 1000 ký tự'
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
        public settingProvider: SettingsProvider,
    ) {
    }


    insert() {
        return this.settingProvider.createNewRegency(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteRegency(object);
    }

    update() {
        return this.settingProvider.updateRegency(this.object);
    }

    clear() {
        this.object = new regencies();
    }
}