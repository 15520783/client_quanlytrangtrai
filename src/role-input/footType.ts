import { InputObject, footType } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class FootTypeRole {
    public object = new footType();
    public keySettingStorage = SETTING_STORAGE_KEY.FOOT_TYPE;

    public headerTitle = {
        insertMode: 'Nhập thông tin loại chân',
        updateMode: 'Cập nhật thông loại chân'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên loại chân',
            placeholder: 'Nhập tên loại chân',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên loại chân là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên loại chân không được vượt quá 1000 ký tự'
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
        return this.settingProvider.createNewFootType(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteFootType(object);
    }

    update() {
        return this.settingProvider.updateFootType(this.object);
    }

    clear() {
        this.object = new footType();
    }
}