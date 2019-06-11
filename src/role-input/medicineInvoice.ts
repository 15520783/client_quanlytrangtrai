import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { InvoicesProvider } from "../providers/invoices/invoices";
import { VARIABLE } from "../common/const";
import { invoicesProduct } from "../common/entity";

export class MedicineInvoiceRole {
    public object = new invoicesProduct();


    public headerTitle = {
        insertMode: 'Nhập thông tin chứng từ nhập thuốc',
        updateMode: 'Cập nhật thông tin chứng từ nhập thuốc'
    }

    public inputRole: Array<any>


    constructor(
        public deployData:DeployDataProvider,
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
                data: this.deployData.get_partner_list_for_select(),
                selectOptions: {
                    cssClass: 'ion-popover'
                }
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
            }
        ];
    }

    insert() {
        this.object.invoiceType = VARIABLE.INVOICE_PRODUCT_TYPE.MEDICINE;
        this.object.status = VARIABLE.INVOICE_STATUS.PROCCESSING;
        let source = this.deployData.get_partner_by_id(this.object.sourceId);
        let destination = this.deployData.get_farm_by_id(this.object.destinationId);
        let des_manager = this.deployData.get_employee_by_id(this.object.destinationManager);
        if (source) {
            this.object.sourceManagerName = source.manager;
            this.object.source = source;
        }
        if(destination){
            this.object.destinationManager = destination.manager;
            this.object.destination = destination;
        }
        if(des_manager){
            this.object.destinationManagerName = des_manager.name;
        }
        return this.invoiceProvider.createProductInvoice(this.object);
    }

    update() {
        this.object.invoiceType = VARIABLE.INVOICE_PRODUCT_TYPE.MEDICINE;
        this.object.status = VARIABLE.INVOICE_STATUS.PROCCESSING;
        let source = this.deployData.get_partner_by_id(this.object.sourceId);
        let destination = this.deployData.get_farm_by_id(this.object.destinationId);
        let des_manager = this.deployData.get_employee_by_id(this.object.destinationManager);
        if (source) {
            this.object.sourceManagerName = source.manager;
            this.object.source = source;
        }
        if(destination){
            this.object.destinationManager = destination.manager;
            this.object.destination = destination;
        }
        if(des_manager){
            this.object.destinationManagerName = des_manager.name;
        }
        return this.invoiceProvider.updateProductInvoice(this.object);
    }

    clear() {
        this.object = new invoicesProduct();
    }
}