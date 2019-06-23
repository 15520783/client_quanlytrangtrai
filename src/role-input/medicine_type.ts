import { InputObject, medicineType } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class MedicineTypeRole {
    public object = new medicineType();
    public keySettingStorage = SETTING_STORAGE_KEY.MEDICINE_TYPE;

    public headerTitle = {
        insertMode: 'Nhập thông tin loại thuốc',
        updateMode: 'Cập nhật thông tin loại thuốc'
    }

    public inputRole: Array<InputObject> = [
        {
            name: 'name',
            label: 'Tên loại thuốc',
            placeholder: 'Nhập tên loại thuốc',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên loại thuốc là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên loại thuốc không được vượt quá 1000 ký tự'
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
        public settingProvider: SettingsProvider
    ) {
    }


    insert() {
        return this.settingProvider.createNewMedicineType(this.object)
    }

    delete(object){
        return this.settingProvider.deleteMedicineType(object);
    }

    update(){
        return this.settingProvider.updateMedicineType(this.object);
    }

    clear(){
        this.object = new medicineType();
    }
}