import { InputObject, pregnancyStatus } from "../common/entity";

export class PregnancyStatusRole {
    public pregnancy_status = new pregnancyStatus();

    public inputRole:Array<InputObject> =[
        {
            name:'name',
            label:'Tên trạng thái mang thai',
            placeholder:'Nhập tên trạng thái mang thai',
            isRequire:true,
            isMaxlength:true,
            isMailFormat:false,
            isNumber:false,
            maxlength:1000,
            message:{
                isMailFormat:'',
                isRequire:'Tên trạng thái mang thai là hạng mục bắt buộc.',
                isNumber:'',
                isMaxlength:'Tên trang thái mang thai không được vượt quá 1000 ký tự'
            },
            type:"input-text",
            value: this.pregnancy_status.name,
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
            value:this.pregnancy_status.description,
            data:null
        }
    ];

    constructor(){

    }
}