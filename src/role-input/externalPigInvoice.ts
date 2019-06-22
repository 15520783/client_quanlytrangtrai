import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { InvoicesProvider } from "../providers/invoices/invoices";
import { UserProvider } from "../providers/user/user";
import { VARIABLE } from "../common/const";
import { invoicesPig } from "../common/entity";

export class ExternalPigInvoiceRole {
    public object = new invoicesPig();


    public headerTitle = {
        insertMode: 'Nhập thông tin chứng từ nhập heo ngoài hệ thống',
        updateMode: 'Cập nhật thông tin chứng từ nhập heo ngoài hệ thống'
    }

    public inputRole: Array<any>;


    constructor(
        public deployData:DeployDataProvider,
        public userProvider: UserProvider,
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
                data: [{ name: "Chọn đơn vị nguồn", value: "" }],
                notEdit:true
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
                value: this.object.importDate?new Date(this.object.importDate).toISOString():this.object.importDate,
                data: null
            },
            // {
            //     name: 'quantity',
            //     label: 'Tổng số heo',
            //     placeholder: 'Nhập tổng số heo',
            //     isRequire: true,
            //     isMaxlength: false,
            //     isMailFormat: false,
            //     isNumber: true,
            //     maxlength: 1000,
            //     message: {
            //         isMailFormat: '',
            //         isRequire: 'Tổng số heo là hạng mục bắt buộc',
            //         isNumber: 'Tổng số heo là hạng mục số',
            //         isMaxlength: 'Tổng số heo không được vượt quá 1000 ký tự'
            //     },
            //     type: "input-text",
            //     value: this.object.quantity,
            //     data: null
            // },
            {
                name: 'destinationId',
                label: 'Nơi nhận (Trang trại)',
                placeholder: 'Chọn nơi nhận',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                notUpdate:true,
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
        this.object.employee = this.userProvider.user;
        this.object.invoiceType = VARIABLE.INVOICE_PIG_TYPE.EXTERNAL_IMPORT;
        this.object.status = VARIABLE.INVOICE_STATUS.PROCCESSING;
        let source = this.deployData.get_partner_by_id(this.object.sourceId);
        let destination = this.deployData.get_farm_by_id(this.object.destinationId);
        let des_manager = this.deployData.get_employee_by_id(this.object.destinationManager);
        if (source) {
            this.object.sourceAddress = source.address;
            this.object.sourceManager = null;
        }
        if(destination){
            this.object.destinationAddress = destination.address;
            this.object.destinationManager = destination.manager;
        }
        if(des_manager){
            this.object.destinationManagerName = des_manager.name;
        }
        return this.invoiceProvider.createPigInvoice(this.object);
    }

    update(){
        this.object.invoiceType = VARIABLE.INVOICE_PIG_TYPE.EXTERNAL_IMPORT;
        this.object.status = VARIABLE.INVOICE_STATUS.PROCCESSING;
        let source = this.deployData.get_partner_by_id(this.object.sourceId);
        let destination = this.deployData.get_farm_by_id(this.object.destinationId);
        let des_manager = this.deployData.get_employee_by_id(this.object.destinationManager);
        if (source) {
            this.object.sourceAddress = source.address;
            this.object.sourceManager = null;
        }
        if(destination){
            this.object.destinationAddress = destination.address;
            this.object.destinationManager = destination.manager;
        }
        if(des_manager){
            this.object.destinationManagerName = des_manager.name;
        } 
        return this.invoiceProvider.updatePigInvoice(this.object);
    }

    clear() {
        this.object = new invoicesPig();
    }
}