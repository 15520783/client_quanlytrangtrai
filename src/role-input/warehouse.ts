import { InputObject, employee, warehouse } from "../common/entity";

import { DeployDataProvider } from "../providers/deploy-data/deploy-data";
import { WarehousesProvider } from "../providers/warehouses/warehouses";

export class WarehouseRole {
    public object = new warehouse();
    public farmId: string;

    public headerTitle = {
        insertMode: 'Nhập thông tin kho',
        updateMode: 'Cập nhật thông tin kho'
    }

    public inputRole: Array<any> = [];
    public employeesBelongs: Array<employee> = [];
    constructor(public deployData: DeployDataProvider, public warehouseProvider: WarehousesProvider, employeesBelongs: Array<employee>) {

        this.inputRole = [
            {
                name: 'name',
                label: 'Tên  kho',
                placeholder: 'Nhập tên kho',
                isRequire: true,
                isMaxlength: true,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Tên kho là hạng mục bắt buộc.',
                    isNumber: '',
                    isMaxlength: 'Tên kho không được vượt quá 1000 ký tự'
                },
                type: "input-text",
                value: this.object.name,
                data: null
            }, {
                name: 'typeId',
                label: 'Loại kho',
                placeholder: 'Chọn loại kho',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Loại kho là hạng mục bắt buộc.',
                    isNumber: '',
                    isMaxlength: ''
                },
                type: "input-select",
                value: this.object.type.id,
                data: this.deployData.get_warehouse_types_list_for_select(),
                notUpdate: true
            },
            {
                name: 'managerId',
                label: 'Người quản lý',
                placeholder: 'Chọn người quản lý',
                isRequire: true,
                isMaxlength: false,
                isMailFormat: false,
                isNumber: false,
                maxlength: 1000,
                message: {
                    isMailFormat: '',
                    isRequire: 'Người quản lý là hạng mục bắt buộc.',
                    isNumber: '',
                    isMaxlength: ''
                },
                type: "input-select-target",
                value: this.object.manager.id,
                data: employeesBelongs,
                targetCmpName: 'employee'
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
        ]
    }

    insert() {
        this.object.manager = this.deployData.get_employee_by_id(this.object['managerId']);
        this.object.type.id = this.object['typeId'];
        return this.warehouseProvider.createNewWarehouse(this.object)
    }

    update() {
        this.object.manager = this.deployData.get_employee_by_id(this.object['managerId']);
        this.object.type.id = this.object['typeId'];
        return this.warehouseProvider.updateWarehouse(this.object);
    }

    delete(object) {
        return this.warehouseProvider.deleteWarehouse(object);
    }

    clear() {
        this.object = new warehouse();
    }
}