import { InputObject, customers, healthStatus } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class HealthStatusRole {
    public object = new healthStatus();
    public keySettingStorage = SETTING_STORAGE_KEY.CUSTOMER;

    public headerTitle = {
        insertMode: 'Nhập thông tin trạng thái sức khỏe',
        updateMode: 'Cập nhật thông tin trạng thái sức khỏe'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên trạng thái sức khỏe',
            placeholder: 'Nhập tên trạng thái sức khỏe',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên trạng thái sức khỏe là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên trạng thái sức khỏe không được vượt quá 1000 ký tự'
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
                isRequire: 'Mô tả là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Mô tả không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.description,
            data: null
        },
    ];

    constructor(public settingProvider: SettingsProvider, public deployData: DeployDataProvider) {

    }

    insert() {
        return this.settingProvider.createNewHealthStatus(this.object)
    }

    delete(object) {
        
        return this.settingProvider.deleteHealthStatus(object);
    }

    update() {
        return this.settingProvider.updateHeathStatus(this.object);
    }

    clear() {
        this.object = new healthStatus();
    }
}