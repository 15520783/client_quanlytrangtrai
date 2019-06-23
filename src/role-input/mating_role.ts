import { InputObject, matingRole } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class MatingRoleRole {
    public object = new matingRole();
    public keySettingStorage = SETTING_STORAGE_KEY.MATING_ROLE;

    public headerTitle = {
        insertMode: 'Nhập thông tin thuốc',
        updateMode: 'Cập nhật thông tin thuốc'
    }

    public inputRole: Array<any> = [
        {
            name: 'fatherId',
            label: 'Giống cha',
            placeholder: 'Chọn loại giống cha',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Giống cha là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.fatherId,
            data: this.deployData.get_breed_list_for_select(),
            selectOptions: {
                cssClass: 'ion-popover'
            }
        },
        {
            name: 'motherId',
            label: 'Giống mẹ',
            placeholder: 'Chọn loại giống mẹ',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Giống mẹ là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.fatherId,
            data: this.deployData.get_breed_list_for_select(),
            selectOptions: {
                cssClass: 'ion-popover'
            }
        },
        {
            name: 'childId',
            label: 'Kết quả phối',
            placeholder: 'Chọn kết quả phối',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Kết quả phối là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.fatherId,
            data: this.deployData.get_breed_list_for_select(),
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
        this.object.father = this.deployData.get_breed_by_id(this.object.fatherId);
        this.object.mother = this.deployData.get_breed_by_id(this.object.motherId);
        this.object.child = this.deployData.get_breed_by_id(this.object.childId);
        return this.settingProvider.createMatingRole(this.object)
    }

    delete(object) {
        return this.settingProvider.deleteMatingRole(object);
    }

    update() {
        this.object.father = this.deployData.get_breed_by_id(this.object.fatherId);
        this.object.mother = this.deployData.get_breed_by_id(this.object.motherId);
        this.object.child = this.deployData.get_breed_by_id(this.object.childId);
        return this.settingProvider.updateMatingRole(this.object);
    }

    clear() {
        this.object = new matingRole();
    }
}
