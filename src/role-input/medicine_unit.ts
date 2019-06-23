import { InputObject, medicineUnits } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class MedicineUnitRole {
    public object = new medicineUnits();
    public keySettingStorage = SETTING_STORAGE_KEY.MEDICINE_UNIT;

    public headerTitle = {
        insertMode: 'Nhập thông tin đơn vị thuốc',
        updateMode: 'Cập nhật thông đơn vị thuốc'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên đơn vị thuốc',
            placeholder: 'Nhập tên đơn vị thuốc',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên đơn vị thuốc là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên đơn vị thuốc không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.name,
            data: null
        },
        {
            name: 'quantity',
            label: 'Trọng lượng',
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
            name: 'baseUnit',
            label: 'Loại đơn vị cơ bản',
            placeholder: 'Chọn loại đơn vị cơ bản',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Loại đơn vị cơ bản là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.baseUnit,
            data: this.deployData.get_medicineUnit_list_for_select().filter((unit) => {
                return unit.value == unit.baseUnit ? true : false;
            }),
            selectOptions: {
                cssClass: 'ion-popover'
            }
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
        return this.settingProvider.createNewMedicineUnit(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteMedicineUnit(object);
    }

    update() {
        return this.settingProvider.updateMedicineUnit(this.object);
    }

    clear() {
        this.object = new medicineUnits();
    }
}