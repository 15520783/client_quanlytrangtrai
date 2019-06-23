import { InputObject, medicines } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class MedicineRole {
    public object = new medicines();
    public keySettingStorage = SETTING_STORAGE_KEY.MEDICINE;

    public headerTitle = {
        insertMode: 'Nhập thông tin thuốc',
        updateMode: 'Cập nhật thông tin thuốc'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên thuốc',
            placeholder: 'Nhập tên thuốc',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên thuốc là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên thuốc không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.name,
            data: null
        },
        {
            name: 'typeId',
            label: 'Loại thuốc',
            placeholder: 'Chọn loại thuốc',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Loại thuốc là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.typeId,
            data: this.deployData.get_medicine_type_list_for_select(),
            selectOptions: {
                cssClass: 'ion-popover'
            }
        },
        {
            name: 'medicineCode',
            label: 'Mã thuốc',
            placeholder: 'Nhập mã thuốc',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Mã thuốc là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Mã thuốc không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.medicineCode,
            data: null
        },
        {
            name: 'useFor',
            label: 'Chức năng',
            placeholder: 'Nhập chức năng của thuốc',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: '',
                isNumber: '',
                isMaxlength: 'Mã thuốc không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.useFor,
            data: null
        },
        {
            name: 'guide',
            label: 'Hướng dẫn sử dụng',
            placeholder: 'Nhập hướng dẫn sử dụng thuốc',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 5000,
            message: {
                isMailFormat: '',
                isRequire: '',
                isNumber: '',
                isMaxlength: 'Hướng dẫn không được vượt quá 5000 ký tự'
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
        public deployData: DeployDataProvider
    ) {
    }


    insert() {
        this.object.type = this.deployData.get_medicineType_by_id(this.object.typeId);
        return this.settingProvider.createNewMedicine(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteMedicine(object);
    }

    update() {
        this.object.type = this.deployData.get_medicineType_by_id(this.object.typeId);
        return this.settingProvider.updateMedicne(this.object);
    }

    clear() {
        this.object = new medicines();
    }
}