import { InputObject, foodType, foodUnits } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class FoodUnitsRole {
    public object = new foodUnits();
    public keySettingStorage = SETTING_STORAGE_KEY.FOOD_UNIT;

    public headerTitle = {
        insertMode: 'Nhập thông tin đơn vị cám',
        updateMode: 'Cập nhật thông đơn vị cám'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên đơn vị cám',
            placeholder: 'Nhập tên đơn vị cám',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên đơn vị cám là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên đơn vị cám không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.name,
            data: null
        },
        {
            name: 'quantity',
            label: 'Trọng lượng ( kg )',
            placeholder: 'Nhập tên trọng lượng',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: true,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Trọng lượng là hạng mục bắt buộc.',
                isNumber: 'Trọng lượng là hạng mục nhập số',
                isMaxlength: 'Trọng lượng không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.quantity,
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
        this.object.baseUnit = '1';
        return this.settingProvider.createNewFoodUnit(this.object)
    }

    delete(object) {
        
        return this.settingProvider.deleteFoodUnit(object);
    }

    update() {
        return this.settingProvider.updateFoodUnit(this.object);
    }

    clear() {
        this.object = new foodUnits();
    }
}