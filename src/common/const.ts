const KEY = {
    ACCESSTOKEN: 'accessToken',
    TOKENTYPE: 'tokenType',
    FARMS: 'farms',
    SECTIONS: 'sections',
    HOUSES: 'houses',
    PIGS: 'pigs',
    GROUPS: 'groups',
    EMPLOYEES: 'employees',
    WAREHOUSES: 'warehouses',
    SETTINGS: 'settings',
    PARTNERS: 'partners'
}

const SETTING_STORAGE_KEY = {
    PREGNANCY_STATUS: 'pregnancyStatus',
}

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CONFIG = {
    // SERVER_API: 'http://192.168.0.36:3000',
    SERVER_API: 'https://quanlytrangtrai-uit.herokuapp.com',
    DEFAULT_TIMEOUT: 30000,
    LANGUAGE_DEFAULT: 'vi',
    ACCESS_KEY: ''
}

const VARIABLE = {
    gender: [
        { value: '1', name: 'Đực' },
        { value: '2', name: 'Nái' },
        { value: '3', name: 'Đực hiến' }
    ],
    INVOICE_PRODUCT_TYPE:{
        FOOD:'food',
        MEDICINE:'medicine'
    }

    ,
    section_type: [
        {
            id: 1,
            name: "Khu cách ly",
            function: {
                inputPig: "Nhập heo",
                breeding: "Lên giống",
                transfer: "Chuyển(xuất) heo"
            }
        },
        {
            id: 2,
            name: "Khu nọc",
            function: {
                inputPig: "Nhập heo",
                sperm: "Khai thác tinh heo",
                transfer: "Chuyển(xuất) heo"
            }
        },
        {
            id: 3,
            name: "Khu phối",
            function: {
                inputPig: "Nhập heo",
                mating: "Phối giống",
                transfer: "Chuyển(xuất) heo"
            }
        },
        {
            id: 4,
            name: "Khu mang thai",
            function: {
                inputPig: "Nhập heo",
                pregnancyFollow: "Phối giống",
                transfer: "Chuyển(xuất) heo"
            }
        },
        {
            id: 5,
            name: "Khu đẻ",
            function:{
                inputPig: "Nhập heo",
                bornFollow: "Phối giống",
                weaning: "Cai sữa heo nái",
                transfer: "Chuyển(xuất) heo"
            }
        },
        { 
            id: 6, 
            name: "Khu cai sữa" ,
            function:{
                inputPig: "Nhập heo",
                transfer: "Chuyển(xuất) heo"
            }
        },
        { 
            id: 7, 
            name: "Khu hậu bị" ,
            function:{
                inputPig: "Nhập heo",
                reviewOfftest: "Đánh giá Offtest heo con",
                transfer: "Chuyển(xuất) heo"
            }
        },
        { 
            id: 8, 
            name: "Khu chờ bán" ,
            function:{
                prepareToSale:"Lên danh sách chờ bán",
                exportSale:"Xuất bán heo"
            }
        },
    ]
}

const API = {
    LOGIN: '/auth/login',
    CHECK_SERVER: '/auth/check_login',

    GET_ALL_FARMS: '/api/farms/list',
    GET_ALL_SECTIONS: '/api/sections/list',
    GET_ALL_HOUSES: '/api/houses/list',
    GET_ALL_PIGS: '/api/pigs/list',
    GET_ALL_GROUPS: '/api/groups/list',
    GET_ALL_EMPLOYEES: '/api/employees/list',
    GET_ALL_WAREHOUSES: '/api/warehouses/list',
    GET_ALL_SETTINGS: '/api/settings/list',
    GET_ALL_PARTNERS: '/api/partners/list',
    GET_ALL_INVOICES: '/api/invoices/list',

    GET_PIG_INVOICE_DETAIL_FROM_INVOICE: '/api/invoicepigdetail/invoice/',

    CREATE_PREGNANCY_STATUS: '/api/pregnancystatus/',
    DELETE_PREGNANCY_STATUS: '/api/pregnancystatus/',
    UPDATE_PREGNANCY_STATUS: '/api/pregnancystatus/',

    CREATE_PIG_INVOICE:'/api/invoicespig/',
    UPDATE_PIG_INVOICE:'/api/invoicespig/',
    DELETE_PIG_INVOICE:'/api/invoicespig/',
    
    CREATE_PRODUCT_INVOICE:'/api/invoicesproduct/',
    // CREATE_PIG_INVOICE:'/api/invoicepigdetail/pigsinvoicepigdetail/',

    CREATE_PIG_INVOICE_DETAIL:'/api/invoicepigdetail/',
    DELETE_PIG_INVOICE_DETAIL:'/api/invoicepigdetail/',

    CREATE_FOOD_WAREHOUSE:'/api/foodwarehouse/',

    CREATE_PIG:'/api/pigs/',
    DELETE_PIG:'/api/pigs/'

}

export { KEY }
export { API }
export { CONFIG }
export { VARIABLE }
export { EMAIL_PATTERN }
export { SETTING_STORAGE_KEY }