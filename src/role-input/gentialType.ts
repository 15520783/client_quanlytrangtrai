import { InputObject, gentialType } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class GentialTypeRole {
    public object = new gentialType();
    public keySettingStorage = SETTING_STORAGE_KEY.GENTIAL_TYPE;

    public headerTitle = {
        insertMode: 'Nhập thông tin loại bộ phận sinh dục',
        updateMode: 'Cập nhật thông tin loại bộ phận sinh dục'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên loại bộ sinh dục',
            placeholder: 'Nhập tên loại bộ sinh dục',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên loại bộ sinh dục là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên loại bộ sinh dục không được vượt quá 1000 ký tự'
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
        return this.settingProvider.createNewGentialType(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteGentialType(object);
    }

    update() {
        return this.settingProvider.updateGentialType(this.object);
    }

    clear() {
        this.object = new gentialType();
    }
}