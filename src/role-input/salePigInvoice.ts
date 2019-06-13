import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { InvoicesProvider } from "../providers/invoices/invoices";
import { VARIABLE } from "../common/const";
import { invoicesPig } from "../common/entity";

export class SalePigInvoiceRole {
    public object = new invoicesPig();


    public headerTitle = {
        insertMode: 'Nhập thông tin chứng từ xuất bán heo',
        updateMode: 'Cập nhật thông tin chứng từ xuất bán heo'
    }

    public inputRole: Array<any>


    constructor(
        public deployData: DeployDataProvider,
        public invoiceProvider: InvoicesProvider
    ) {

        this.inputRole = [
            {
                name: 'sourceId',
                label: 'Đơn vị nguồn',
                placeholder: 'Chọn đơn vị nguồn',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                notUpdate:true,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Đơn vị nguồn là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: ''
                },
                type: "input-select",
                value: this.object.sourceId,
                data: this.deployData.get_farm_list_for_select(),
                selectOptions: {
                    cssClass: 'ion-popover'
                }
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
                name: 'exportDate',
                label: 'Ngày xuất bán',
                placeholder: 'Chọn ngày xuất bán',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Ngày xuất bán là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: ''
                },
                type: "input-date",
                value: this.object.exportDate,
                data: null
            },
            {
                name: 'unitPrice',
                label: 'Đơn giá',
                placeholder: 'Nhập đơn giá',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: true,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Đơn giá là hạng mục bắt buộc',
                    isNumber: 'Đơn giá là hạng mục số',
                    isMaxlength: 'Đơn giá không được vượt quá 1000 ký tự'
                },
                type: "input-text",
                value: this.object.unitPrice,
                data: null
            },
            {
                name: 'totalPrice',
                label: 'Tổng giá',
                placeholder: 'Nhập tổng giá',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: true,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Tổng giá là hạng mục bắt buộc',
                    isNumber: 'Tổng giá là hạng mục số',
                    isMaxlength: 'Tổng giá không được vượt quá 1000 ký tự'
                },
                type: "input-text",
                value: this.object.totalPrice,
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
                label: 'Đơn vị mua',
                placeholder: 'Chọn đơn vị mua',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Đơn vị mua là hạng mục bắt buộc',
                    isNumber: '',
                    isMaxlength: ''
                },
                type: "input-select",
                selectOptions: {
                    cssClass: 'ion-popover'
                },
                value: this.object.destinationId,
                data: this.deployData.get_customer_list_for_select()
            }
        ];
    }

    insert() {
        this.object.invoiceType = VARIABLE.INVOICE_PIG_TYPE.SALING_EXPORT;
        this.object.status = VARIABLE.INVOICE_STATUS.PROCCESSING;
        let source = this.deployData.get_farm_by_id(this.object.sourceId);
        let destination = this.deployData.get_partner_by_id(this.object.destinationId);

        if (source) {
            this.object.sourceAddress = source.name;
            this.object.sourceManager = source.manager;
            this.object.sourceManagerName = this.deployData.get_employee_by_id(source.manager) ? this.deployData.get_employee_by_id(source.manager).name : '';
            this.object.sourceId = source.id;
        }
        if (destination) {
            this.object.destinationId = destination.id;
            this.object.destinationAddress = destination.address;
            this.object.destinationManagerName = destination.manager;
        }

        return this.invoiceProvider.createPigInvoice(this.object);
    }

    update() {
        this.object.invoiceType = VARIABLE.INVOICE_PIG_TYPE.EXTERNAL_IMPORT;
        this.object.status = VARIABLE.INVOICE_STATUS.PROCCESSING;
        let source = this.deployData.get_partner_by_id(this.object.sourceId);
        let destination = this.deployData.get_farm_by_id(this.object.destinationId);
        let des_manager = this.deployData.get_employee_by_id(this.object.destinationManager);
        if (source) {
            this.object.sourceAddress = source.address;
            this.object.sourceManager = null;
        }
        if (destination) {
            this.object.destinationAddress = destination.address;
            this.object.destinationManager = destination.manager;
        }
        if (des_manager) {
            this.object.destinationManagerName = des_manager.name;
        }
        return this.invoiceProvider.updatePigInvoice(this.object);
    }

    clear() {
        this.object = new invoicesPig();
    }
}