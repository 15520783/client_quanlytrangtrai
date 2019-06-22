import { InputObject, customers, partners } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class PartnersRole {
    public object = new partners();
    public keySettingStorage = SETTING_STORAGE_KEY.PARTNER;

    public headerTitle = {
        insertMode: 'Nhập thông tin đối tác',
        updateMode: 'Cập nhật thông tin đối tác'
    }

    public inputRole: Array<any> = [
        {
            name: 'name',
            label: 'Tên đối tác',
            placeholder: 'Nhập tên đối tác',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên đối tác là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên đối tác không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.name,
            data: null
        },
        {
            name: 'manager',
            label: 'Người quản lý',
            placeholder: 'Nhập tên người quản lý',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên người quản lý là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên người quản lý không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.manager,
            data: null
        },
        {
            name: 'phone',
            label: 'Số điện thoại đối tác',
            placeholder: 'Nhập số điện thoại đối tác',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Số điện thoại đối tác là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Số điện thoại đối tác không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.phone,
            data: null
        },
        {
            name: 'address',
            label: 'Địa chỉ',
            placeholder: 'Nhập địa chỉ đối tác',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Địa chỉ đối tác là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Địa chỉ đối tác không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.address,
            data: null
        },
        {
            name: 'agencyName',
            label: 'Tên chi nhánh',
            placeholder: 'Nhập tên chi nhánh',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên chi nhánh là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên chi nhánh không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.agencyName,
            data: null
        },
        {
            name: 'agencyAddress',
            label: 'Địa chỉ chi nhánh',
            placeholder: 'Nhập địa chỉ chi nhánh',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Địa chỉ chi nhánh là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Địa chỉ chi nhánh không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.agencyAddress,
            data: null
        },
        {
            name: 'agencyPhone',
            label: 'Số điện thoại chi nhánh',
            placeholder: 'Nhập số điện thoại chi nhánh',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Số điện thoại chi nhánh là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Số điện thoại chi nhánh không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.agencyPhone,
            data: null
        },
        {
            name: 'distributionName',
            label: 'Nhà cung cấp',
            placeholder: 'Nhập tên nhà cung cấp',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên nhà cung cấp là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên nhà cung cấp không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.distributionName,
            data: null
        },
        {
            name: 'distributionAddress',
            label: 'Địa chỉ nhà cung cấp',
            placeholder: 'Địa chỉ nhà cung cấp',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Địa chỉ nhà cung cấp là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Địa chỉ nhà cung cấp không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.distributionAddress,
            data: null
        },
        {
            name: 'distributionPhone',
            label: 'Số điện thoại nhà cung cấp',
            placeholder: 'Số điện thoại nhà cung cấp',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Số điện thoại nhà cung cấp là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Số điện thoại nhà cung cấp không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.distributionPhone,
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
        return this.settingProvider.createNewPartner(this.object)
    }

    delete(object) {
        
        return this.settingProvider.deletePartner(object);
    }

    update() {
        return this.settingProvider.updatePartner(this.object);
    }

    clear() {
        this.object = new partners();
    }
}