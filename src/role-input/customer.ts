import { InputObject, customers, employee } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class CustomerRole {
    public object = new customers();
    public keySettingStorage = SETTING_STORAGE_KEY.CUSTOMER;

    public headerTitle = {
        insertMode: 'Nhập thông tin khách hàng',
        updateMode: 'Cập nhật thông tin khách hàng'
    }

    public inputRole: Array<any> = [
        {
            name: 'typeId',
            label: 'Loại khách hàng',
            placeholder: 'Chọn loại khách hàng',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Loại khách hàng là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.typeId,
            data: this.deployData.get_customer_type_list_for_select(),
            selectOptions: {
                cssClass: 'ion-popover'
            }
        },
        {
            name: 'groupId',
            label: 'Nhóm khách hàng',
            placeholder: 'Chọn nhóm khách hàng',
            isRequire: true,
            isMaxlength: false,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Nhóm khách hàng là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: ''
            },
            type: "input-select",
            value: this.object.groupId,
            data: this.deployData.get_customer_group_list_for_select(),
            selectOptions: {
                cssClass: 'ion-popover'
            }
        },
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
            name: 'phone',
            label: 'Số điện thoại',
            placeholder: 'Nhập số điện thoại',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Số điện thoại là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Số điện thoại không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.phone,
            data: null
        },
        {
            name: 'email',
            label: 'Email',
            placeholder: 'Nhập email',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Email là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Email không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.email,
            data: null
        },
        {
            name: 'address',
            label: 'Địa chỉ',
            placeholder: 'Nhập địa chỉ',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Địa chỉ là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Địa chỉ không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.address,
            data: null
        },
        {
            name: 'companyAddress',
            label: 'Địa chỉ công ty',
            placeholder: 'Nhập địa chỉ công ty',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Địa chỉ công ty là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Địa chỉ công ty không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.companyAddress,
            data: null
        },
        {
            name: 'fax',
            label: 'Fax',
            placeholder: 'Nhập fax',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Fax là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Fax không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.fax,
            data: null
        },
        {
            name: 'bank',
            label: 'Ngân hàng',
            placeholder: 'Nhập tên ngân hàng',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Ngân hàng là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Ngân hàng không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.bank,
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
        this.object.type = this.deployData.get_customerType_by_id(this.object.typeId);
        this.object.group = this.deployData.get_customerGroup_by_id(this.object.groupId);
        return this.settingProvider.createNewCustomer(this.object)
    }

    delete(object) {
        
        return this.settingProvider.deleteCustomer(object);
    }

    update() {
        this.object.type = this.deployData.get_customerType_by_id(this.object.typeId);
        this.object.group = this.deployData.get_customerGroup_by_id(this.object.groupId);
        return this.settingProvider.updateCustomer(this.object);
    }

    clear() {
        this.object = new customers();
    }
}