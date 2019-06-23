import { InputObject, foods } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class FoodRole {
    public object = new foods();
    public keySettingStorage = SETTING_STORAGE_KEY.FOOD;

    public headerTitle = {
        insertMode: 'Nhập thông tin cám',
        updateMode: 'Cập nhật thông cám'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên cám',
            placeholder: 'Nhập tên cám',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên cám là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên cám không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.name,
            data: null
        },
        {
            name: 'typeId',
            label: 'Loại cám',
            placeholder: 'Chọn loại cám',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Loại cám là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.typeId,
            data: this.deployData.get_food_type_list_for_select(),
            selectOptions: {
                cssClass: 'ion-popover'
            }
        },
        {
            name: 'foodCode',
            label: 'Mã cám',
            placeholder: 'Nhập mã cám',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: true,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Mã cám là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Mã cám không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.foodCode,
            data: null
        },
        {
            name: 'useFor',
            label: 'Chức năng',
            placeholder: 'Nhập chức năng',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: true,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Chức năng là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Chức năng không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.useFor,
            data: null
        },
        {
            name: 'guide',
            label: 'Hướng dẫn',
            placeholder: 'Nhập hướng dẫn',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: true,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Hướng dẫn là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Hướng dẫn không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.guide,
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

    constructor(public settingProvider: SettingsProvider,public deployData:DeployDataProvider) {

    }

    insert() {
        this.object.type = this.deployData.get_food_type_by_id(this.object.typeId);
        return this.settingProvider.createNewFood(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteFood(object);
    }

    update() {
        this.object.type = this.deployData.get_food_type_by_id(this.object.typeId);
        return this.settingProvider.updateFood(this.object);
    }

    clear() {
        this.object = new foods();
    }
}