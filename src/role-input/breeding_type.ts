import { InputObject, breeding_type } from "../common/entity";

export class BreedingTypesRole {
    public breeding_type = new breeding_type();

    public inputRole:Array<InputObject> =[
        {
            name:'name',
            label:'Tên trạng thái lên giống',
            placeholder:'Nhập tên trạng thái lên giống',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Tên trạng thái lên giống là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Tên trạng thái lên giống không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value: this.breeding_type.name,
            data:null
        },
        {
            name:'description',
            label:'Mô tả',
            placeholder:'Nhập thông tin mô tả',
            isRequire:false,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'',
                isNumber:'',
                isMaxlength:'Thông tin mô tả không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value:this.breeding_type.description,
            data:null
        }
    ];

    constructor(){

    }
}