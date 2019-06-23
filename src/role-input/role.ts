import { InputObject, roles, } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class RolePermissionRole {
    public object = new roles();
    public keySettingStorage = SETTING_STORAGE_KEY.ROLE;

    public headerTitle = {
        insertMode: 'Nhập thông tin phân quyền',
        updateMode: 'Cập nhật thông tin phân quyền'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên phân quyền',
            placeholder: 'Nhập tên phân quyền',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên phân quyền là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên phân quyền không được vượt quá 1000 ký tự'
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
        return this.settingProvider.createMatingRole(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteMatingRole(object);
    }

    update() {
        return this.settingProvider.updateMatingRole(this.object);
    }

    clear() {
        this.object = new roles();
    }
}