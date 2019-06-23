import { InputObject, issues } from "../common/entity";

import { SETTING_STORAGE_KEY } from "../common/const";
import { SettingsProvider } from "../providers/settings/settings";

export class IssueRole {
    public object = new issues();
    public keySettingStorage = SETTING_STORAGE_KEY.ISSUE;

    public headerTitle = {
        insertMode: 'Nhập thông tin triệu chứng lâm sàn',
        updateMode: 'Cập nhật thông tin triệu chứng lâm sàn'
    }

    public inputRole: Array<any> = [
        {
            name: 'symptom',
            label: 'Tên triệu chứng lâm sàn',
            placeholder: 'Nhập tên triệu chứng lâm sàn',
            isRequire: true,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: 'Tên triệu chứng lâm sàn là hạng mục bắt buộc.',
                isNumber: '',
                isMaxlength: 'Tên triệu chứng lâm sàn không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.symptom,
            data: null
        },
        {
            name: 'level',
            label: 'Mức độ',
            placeholder: 'Nhập mức độ',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: true,
            maxlength: 1000,
            message: {
                isMailFormat: '',
                isRequire: '',
                isNumber: 'Mức độ là hạng mục nhập số',
                isMaxlength: 'Mức độ không được vượt quá 1000 ký tự'
            },
            type: "input-text",
            value: this.object.level,
            data: null
        },
        {
            name: 'lesions',
            label: 'Biểu hiện mắc bệnh',
            placeholder: 'Nhập biểu hiện mắc bệnh',
            isRequire: false,
            isMaxlength: true,
            isMailFormat: false,
            isNumber: false,
            maxlength: 5000,
            message: {
                isMailFormat: '',
                isRequire: '',
                isNumber: '',
                isMaxlength: 'Biểu hiện mắc bệnh không được vượt quá 5000 ký tự'
            },
            type: "input-text",
            value: this.object.lesions,
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
    ) {
    }


    insert() {
        return this.settingProvider.createNewIssue(this.object)
    }

    delete(object) {
        return this.settingProvider.delelteIssue(object);
    }

    update() {
        return this.settingProvider.updateIssue(this.object);
    }

    clear() {
        this.object = new issues();
    }
}