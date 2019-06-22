import { InputObject, warehouse_type } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class WarehouseTyperole {
    public object = new warehouse_type();
    public keySettingStorage = SETTING_STORAGE_KEY.WAREHOUSE_TYPE;

    public headerTitle = {
        insertMode: 'Nhập thông tin loại kho',
        updateMode: 'Cập nhật thông tin loại kho'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên kho',
            placeholder: 'Nhập tên kho',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên kho là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên kho không được vượt quá 1000 ký tự'
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

    constructor(public settingProvider: SettingsProvider) {

    }

    insert() {
        return this.settingProvider.createNewWarehouseType(this.object)
    }

    delete(object) {
        
        return this.settingProvider.deleteWarehouseType(object);
    }

    update() {
        return this.settingProvider.updateWarehouseType(this.object);
    }

    clear() {
        this.object = new warehouse_type();
    }
}