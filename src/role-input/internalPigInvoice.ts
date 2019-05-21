import { InputObject, invoicesPig } from "../common/entity";
import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { InvoicesProvider } from "../providers/invoices/invoices";
import { VARIABLE } from "../common/const";

export class InternalPigInvoiceRole {
    public object = new invoicesPig();


    public headerTitle = {
        insertMode: 'Nhập thông tin chứng từ nhập heo trong hệ thống',
        updateMode: 'Cập nhật thông tin chứng từ nhập heo trong hệ thống'
    }

    public inputRole: Array<InputObject>;


    constructor(
        public deployData: DeployDataProvider,
        public invoiceProvider: InvoicesProvider
    ) {
        this.object.invoiceNo = VARIABLE.GENERNAL_INVOICE_ID.INTERNAL_IMPORT + Date.now();
        this.inputRole = [
            // {
            //     name: 'invoiceType',
            //     label: 'Nguồn gốc',
            //     placeholder: 'Nhập nguồn gốc heo',
            //     isRequire: true,
            //     isMaxlength: false,
            //     isMailFormat: false,
            //     isNumber: false,
            //     maxlength: 1000,
            //     message: {
            //         isMailFormat: '',
            //         isRequire: 'Nguồn gốc nhập heo là hạng mục bắt buộc.',
            //         isNumber: '',
            //         isMaxlength: ''
            //     },
            //     type: "input-select",
            //     value: this.object.invoiceType,
            //     data: [{ name: "Trong hệ thống", value: "1" }],
            // },
            {
                name: 'sourceId',
                label: 'Đơn vị nguồn',
                placeholder: 'Nhập thông tin mô tả',
                isRequire: false,
                isMaxlength: true,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Đơn vị nguồn là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: 'Thông tin mô tả không được vượt quá 1000 ký tự'
                },
                type: "input-select",
                value: this.object.sourceId,
                data: this.deployData.get_farm_list_for_select()
            },
            {
                name: 'invoiceNo',
                label: 'Số chứng từ',
                placeholder: 'Nhập số chứng từ',
                isRequire: true,
                isMaxlength: true,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Số chứng từ là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: 'Số chứng từ không được vượt quá 1000 ký tự'
                },
                type: "input-text",
                value: this.object.invoiceNo,
                data: [{ name: "Chọn đơn vị nguồn", value: "" }]
            },
            {
                name: 'vehicleNumber',
                label: 'Số xe vận chuyển',
                placeholder: 'Nhập số xe vận chuyển',
                isRequire: true,
                isMaxlength: true,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Số xe vận chuyển là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: 'số xe vận chuyển không được vượt quá 1000 ký tự'
                },
                type: "input-text",
                value: this.object.vehicleNumber,
                data: [{ name: "Chọn đơn vị nguồn", value: "" }]
            },
            {
                name: 'importDate',
                label: 'Ngày nhập',
                placeholder: 'Chọn ngày nhập',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Ngày nhập là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: ''
                },
                type: "input-date",
                value: this.object.importDate,
                data: null
            },
            {
                name: 'quantity',
                label: 'Tổng số heo',
                placeholder: 'Nhập tổng số heo',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: true,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Tổng số heo là hạng mục bắt buộc',
                    isNumber: 'Tổng số heo là hạng mục số',
                    isMaxlength: 'Tổng số heo không được vượt quá 1000 ký tự'
                },
                type: "input-text",
                value: this.object.quantity,
                data: null
            },
            {
                name: 'destinationId',
                label: 'Nơi nhận (Trang trại)',
                placeholder: 'Chọn nơi nhận',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Nơi nhận là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: ''
                },
                type: "input-select",
                value: this.object.destinationId,
                data: this.deployData.get_farm_list_for_select()
            },
        ];
    }


    insert() {
        this.object.invoiceType = VARIABLE.INVOICE_PIG_TYPE.INTERNAL_IMPORT;
        let destination = this.deployData.get_farm_by_id(this.object.destinationId);
        let des_manager = this.deployData.get_employee_by_id(this.object.destinationManager);
        if (destination) {
            this.object.destinationAddress = destination.address;
            this.object.destinationManager = destination.manager;
        }
        if (des_manager) {
            this.object.destinationManagerName = des_manager.name;
        }
        return this.invoiceProvider.createPigInvoice(this.object);
    }

    clear() {
        this.object = new invoicesPig();
    }
}