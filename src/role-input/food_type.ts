import { InputObject, foodType } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class FoodTypeRole {
    public object = new foodType();
    public keySettingStorage = SETTING_STORAGE_KEY.FOOD_TYPE;

    public headerTitle = {
        insertMode: 'Nhập thông tin loại cám',
        updateMode: 'Cập nhật thông tin loại cám'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên khách hàng',
            placeholder: 'Nhập tên khách hàng',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên khách hàng là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên khách hàng không được vượt quá 1000 ký tự'
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
        return this.settingProvider.createNewFoodType(this.object)
    }

    delete(object) {
        
        return this.settingProvider.deleteFoodType(object);
    }

    update() {
        return this.settingProvider.updateFoodType(this.object);
    }

    clear() {
        this.object = new foodType();
    }
}