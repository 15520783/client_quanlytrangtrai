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
    PARTNERS: 'partners',
    EMPID: 'employeeId'
}

const SETTING_STORAGE_KEY = {
    PREGNANCY_STATUS: 'pregnancyStatus',
    BREEDS: 'breeds',
    BREEDING_TYPE: 'breedingType',
    STATUS_PIG: 'status'
}

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CONFIG = {
    // SERVER_API: 'http://192.168.0.36:3000',
    SERVER_API: 'https://quanlytrangtrai-uit.herokuapp.com',
    // SERVER_API: 'http://192.168.1.45:8080',
    DEFAULT_TIMEOUT: 30000,
    LANGUAGE_DEFAULT: 'vi',
    ACCESS_KEY: '',
    PAGE_SITE: 50,
    LOADING_MORE_TIME: 800
}

const VARIABLE = {
    gender: [
        { value: '1', name: 'Đực' },
        { value: '2', name: 'Nái' },
        { value: '3', name: 'Đực hiến' }
    ],
    GENDER: {
        1: { id: 1, name: "Đực" },
        2: { id: 2, name: "Nái" }
    },
    INVOICE_PRODUCT_TYPE: {
        FOOD: 'food',
        MEDICINE: 'medicine'
    },
    SECTION_TYPE: [
        { id: '0', value: '0', name: 'Chưa xác định' },
        { id: '1', value: '1', name: 'Khu cách ly' },
        { id: '2', value: '2', name: 'Khu nọc' },
        { id: '3', value: '3', name: 'Khu phối' },
        { id: '4', value: '4', name: 'Khu mang thai' },
        { id: '5', value: '5', name: 'Khu đẻ' },
        { id: '6', value: '6', name: 'Khu cai sữa' },
        { id: '7', value: '7', name: 'Khu hậu bị' },
        { id: '8', value: '8', name: 'Khu 8' }
    ],
    STATUS_PIG: {
        UNKNOW: "0",
        REPLACEMENT: "1",
        MATED: "2",
        RETURN: "3",
        ABORTION: "4",
        FARROWING: "5",
        WEANING: "6",
        GROWING: "7",
        WAIT_FOR_SALE: "8",
        WAIT_FOR_MATING: "9",
        SOLD: "10",
        MATING: "11",
    },
    INVOICE_PIG_TYPE: {
        INTERNAL_IMPORT: 'internal-import',
        EXTERNAL_IMPORT: 'external-import',
        INTERNAL_EXPORT: 'internal-export',
        SALING_EXPORT: 'sale'
    },
    INVOICE_STATUS: {
        PROCCESSING: 'processing',
        COMPLETE: 'complete'
    },
    MATING_TYPE: {
        IMMEDIATE: 'immediate',
        SPERM: 'SPERM'
    },
    INSEMINATION: [
        { id: 0, value: "ĐẠT", name: "ĐẠT" },
        { id: 1, value: "KHÔNG ĐẠT", name: "KHÔNG ĐẠT" }
    ],
    MATING_STATUS: {
        PROCCESSING: { id: 0, codeName: 'processing', name: 'Đang chờ lấy tinh lần 2' },
        COMPLETE: { id: 1, codeName: 'finish', name: 'Hoàn tất' }
    },
    ISSUE_PIG_STATUS: {
        DECTECTION: { id: 0, name: 'Mới phát hiện' },
        PROCESSING: { id: 1, name: 'Đang xử lý' },
        RESOLVE: { id: 2, name: 'Đã xử lý' }
    },
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
            function: {
                inputPig: "Nhập heo",
                bornFollow: "Phối giống",
                weaning: "Cai sữa heo nái",
                transfer: "Chuyển(xuất) heo"
            }
        },
        {
            id: 6,
            name: "Khu cai sữa",
            function: {
                inputPig: "Nhập heo",
                transfer: "Chuyển(xuất) heo"
            }
        },
        {
            id: 7,
            name: "Khu hậu bị",
            function: {
                inputPig: "Nhập heo",
                reviewOfftest: "Đánh giá Offtest heo con",
                transfer: "Chuyển(xuất) heo"
            }
        },
        {
            id: 8,
            name: "Khu chờ bán",
            function: {
                prepareToSale: "Lên danh sách chờ bán",
                exportSale: "Xuất bán heo"
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
    GET_ALL_SPERMS: '/api/sperm/list',
    GET_ALL_BREEDINGS: '/api/breedings/list',
    GET_ALL_MATING:'/api/matings/list',
    GET_FOOD_WAREHOUSE_OF_WAREHOUSE: '/api/foodwarehouse/warehouse/',
    GET_MEDICINE_WAREHOUSE_OF_WAREHOUSE: '/api/medicinewarehouse/warehouse/',
    GET_PIG_INVOICE_DETAIL_FROM_INVOICE: '/api/invoicepigdetail/invoice/',
    GET_FOOD_WAREHOUSE_FROM_INVOICE: '/api/foodwarehouse/invoice/',
    GET_MEDICINE_WAREHOUSE_FROM_INVOICE: '/api/medicinewarehouse/invoice/',
    GET_SCHEDULE: '/api/schedule/list',

    CREATE_PREGNANCY_STATUS: '/api/pregnancystatus/',
    DELETE_PREGNANCY_STATUS: '/api/pregnancystatus/',
    UPDATE_PREGNANCY_STATUS: '/api/pregnancystatus/',

    CREATE_PIG_STATUS: '/api/status/',
    DELETE_PIG_STATUS: '/api/status/',
    UPDATE_PIG_STATUS: '/api/status/',

    CREATE_BREED: '/api/breeds/',
    UPDATE_BREED: '/api/breeds/',
    DELETE_BREED: '/api/breeds/',

    CREATE_BREEDING_TYPE: '/api/breedingtype/',
    UPDATE_BREEDING_TYPE: '/api/breedingtype/',
    DELETE_BREEDING_TYPE: '/api/breedingtype/',


    CREATE_PIG_INVOICE: '/api/invoicespig/',
    UPDATE_PIG_INVOICE: '/api/invoicespig/',
    DELETE_PIG_INVOICE: '/api/invoicespig/',

    CREATE_PRODUCT_INVOICE: '/api/invoicesproduct/',
    DELETE_PRODUCT_INVOICE: '/api/invoicesproduct/',

    CREATE_PIG_INVOICE_DETAIL: '/api/invoicepigdetail/pigsinvoicepigdetail/',
    DELETE_PIG_INVOICE_DETAIL: '/api/invoicepigdetail/',

    CREATE_FOOD_WAREHOUSE: '/api/foodwarehouse/',
    UPDATE_FOOD_WAREHOUSE: '/api/foodwarehouse/',

    CREATE_MEDICINE_WAREHOUSE: '/api/medicinewarehouse/',
    UPDATE_MEDICINE_WAREHOUSE: '/api/medicinewarehouse/',

    CREATE_PIG: '/api/pigs/',
    UPDATE_PIG: '/api/pigs/',
    DELETE_PIG: '/api/pigs/',

    CREATE_BREEDING: '/api/breedings/',
    UPDATE_BREEDING: '/api/breedings/',
    DELETE_BREEDING: '/api/breedings/',

    CREATE_SPERM: '/api/sperm/',
    UPDATE_SPERM: '/api/sperm/',
    DELETE_SPERM: '/api/sperm/',

    CREATE_MATING: '/api/matings/matingsmatingdetails/',

    CREATE_ISSUES_PIG: '/api/issuespigs/'

}

const ERROR_NAME = {
    TIMEMOUT_ERROR: 'TimeoutError',
    ERROR_RESPONSE: 'HttpErrorResponse'
}

const MESSAGE = {
    vi: {
        TIMEOUT_REQUEST: 'Không có phản hồi từ máy chủ. Vui lòng kiểm tra kết nối.',
        PROCESS_DATA: 'Đang xử lí dữ liệu.',
        LOGIN_INVALID: 'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.',
        SESSIONS_NOT_EXPIRE: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại',
        ERROR_OCCUR: 'Có lỗi xảy ra. Vui lòng kiểm tra lại.',
        UPDATE_SUCCESS: 'Dữ liệu cập nhật thành công.',
        UPDATE_FAILED: 'Dữ liệu cập nhật thất bại. Vui lòng thử lại.',
        LOADING_DATA: 'Đang tải dữ liệu'
    }
}

export { KEY }
export { API }
export { CONFIG }
export { VARIABLE }
export { EMAIL_PATTERN }
export { SETTING_STORAGE_KEY }
export { MESSAGE, ERROR_NAME }