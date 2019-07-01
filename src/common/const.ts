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
    EMPID: 'employeeId',
    EMPLOYEE_USER: 'employee_user',
    USER: 'user',
    USERNAME: 'username',
    PASSWORD: 'password',
    PERMISSIONS: 'permissions',
}

const SETTING_KEY = {
    SERVER_API:'serverApi',
    DEFAULT_REQUEST_TIMEOUT:'defaultRequestTimeout',
    INTERVAL_SYNC_DELAY:'intervalSyncDelay'
}

const SETTING_STORAGE_KEY = {
    PREGNANCY_STATUS: 'pregnancyStatus',
    BREEDS: 'breeds',
    BREEDING_TYPE: 'breedingType',
    STATUS_PIG: 'status',
    DISEASES: 'diseases',
    CUSTOMER:'customers',
    CUSTOMER_TYPE:'customerTypes',
    CUSTOMER_GROUP:'customerGroups',
    PARTNER:'partners',
    HEALTH_STATUS:'healthStatus',
    FARM_TYPE:'farmTypes',
    FOOD_TYPE:'foodType',
    FOOD_UNIT:'foodUnits',
    FOOD:'foods',
    WAREHOUSE_TYPE:'warehouseTypes',
    MEDICINE_TYPE:'medicineType',
    MEDICINE_UNIT:'medicineUnits',
    MEDICINE:'medicines',
    GENTIAL_TYPE:'gentialType',
    FOOT_TYPE:'footType',
    ISSUE:'issues',
    REGENCIES:'regencies',
    ROLE:'roles',
    MATING_ROLE:'matingRoles'
}

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CONFIG = {
    // SERVER_API: 'http://192.168.0.36:3000',
    // SERVER_API: 'https://quanlytrangtrai-uit.herokuapp.com',
    SERVER_API: 'https://quanlytrangtrai-uit-eu.herokuapp.com',
    // SERVER_API: 'http://192.168.1.48:8080',
    // SERVER_API: 'http://10.10.121.34:8080',
    DEFAULT_TIMEOUT: 30000,
    SYNC_DELAY_DURATION: 0,
    LANGUAGE_DEFAULT: 'vi',
    ACCESS_KEY: '',
    PAGE_SITE: 50,
    LOADING_MORE_TIME: 800,
    PACKAGE_NAME: 'io.ionic.quanlitrangtrai',
    FCM_HEADER_KEY: 'AIzaSyBKbuqBrkMtN0Z7lukDQWomLMNO6uDcCZ8'
}

const VARIABLE = {
    gender: [
        { value: '1', name: 'Đực' },
        { value: '2', name: 'Nái' },
        { value: '3', name: 'Đực hiến' }
    ],
    GENDER: {
        1: { id: 1, name: "Đực" },
        2: { id: 2, name: "Nái" },
        3: { id: 3, name: 'Đực thiến' }
    },
    GENDER_EMPLOYEE: [
        { name: 'Nữ', value: '0' },
        { name: 'Nam', value: '1' }
    ]
    ,
    INVOICE_PRODUCT_TYPE: {
        FOOD: 'food',
        MEDICINE: 'medicine'
    },
    SECTION_TYPE: [
        // { id: '0', value: '0', name: 'Chưa xác định' },
        { id: '1', value: '1', name: 'Khu cách ly' },
        { id: '2', value: '2', name: 'Khu nọc' },
        { id: '3', value: '3', name: 'Khu phối' },
        { id: '4', value: '4', name: 'Khu mang thai' },
        { id: '5', value: '5', name: 'Khu đẻ' },
        { id: '6', value: '6', name: 'Khu cai sữa' },
        { id: '7', value: '7', name: 'Khu hậu bị' },
        { id: '8', value: '8', name: 'Khu chờ bán' }
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
        NEWBORN: "12",
        WAIT_FOR_TRANSFER: "13"
    },
    STATUS_CODE_NAME:{
        "UNKNOW":"Không xác định",
        "MATED":"Đã phối",
        "RETURN":"Trả lại",
        "ABORTION":"Sẩy thải",
        "GROWING":"Đang lớn",
        "WAIT_FOR_SALE":"Chờ bán",
        "WAIT_FOR_MATING":"Chờ phối",
        "SOLD":"Đã bán",
        "MATING":"Đang phối",
        "NEWBORN":"Mới sinh",
        "WAIT_FOR_TRANSFER":"Chờ chuyển trại"
    },
    INVOICE_ID: {
        '31': '4',
        '32': '5',
        '33': '6',
        '97': '7',
        '98': '8',
        '99': '9',
    },
    INVOICE_PIG_TYPE: {
        INTERNAL_IMPORT: 'internal-import',
        EXTERNAL_IMPORT: 'external-import',
        INTERNAL_EXPORT: 'internal-export',
        SALING_EXPORT: 'sale',
        ROOT: 'root'
    },
    INVOICE_STATUS: {
        PROCCESSING: 'processing',
        FORWARDING: 'forwarding',
        COMPLETE: 'complete'
    },
    MATING_TYPE: {
        IMMEDIATE: { value: 0, codeName: 'immediate', name: 'Phối trực tiếp' },
        SPERM: { value: 1, codeName: 'bySperm', name: 'Phối gián tiếp' }
    },
    INSEMINATION: [
        { id: 0, value: "ĐẠT", name: "ĐẠT" },
        { id: 1, value: "KHÔNG ĐẠT", name: "KHÔNG ĐẠT" }
    ],
    MATING_STATUS: {
        PROCESSING: { id: 0, codeName: 'processing', name: 'Đang chờ lấy tinh lần 2' },
        COMPLETE: { id: 1, codeName: 'finish', name: 'Hoàn tất phối giống' },
        FARROW: { id: 2, codeName: 'farrow', name: 'Mang thai' },
        ABORTION: { id: 3, codeName: 'abort', name: 'Sẩy thai' },
        BORNED: { id: 4, codeName: 'borned', name: 'Đã sinh' }
    },
    ISSUE_PIG_STATUS: {
        DECTECTION: { id: 0, name: 'Mới phát hiện' },
        PROCESSING: { id: 1, name: 'Đang xử lý' },
        RESOLVED: { id: 2, name: 'Đã xử lý' }
    },
    OBJECT_BARCODE_TYPE: {
        PIG: 'pig',
        HOUSE: 'house'
    },
    GENERNAL_INVOICE_ID: {
        INTERNAL_IMPORT: 'INT-IMP',
        EXTERNAL_IMPORT: 'EXT-IMP',
        INTERNAL_EXPORT: 'INT-EX',
        SALING_EXPORT: 'SAL-EX',
        FOOD_IMPORT:'FOOD_IMP',
        MEDICINE_IMPORT:'MEDICINE_IMP'
    },
    MENU_FIELDS: {
        CHUC_VU_NGUOI_DUNG: {
            codeName: "chuc_vu_nguoi_dung",
            name: "Chức vụ người dùng"
        },
        TONG_QUAN_TRANG_TRAI: {
            codeName: "tong_quan_trang_trai",
            name: "Tổng quan trang trại"
        },
        TONG_QUAN_KHU: {
            codeName: "tong_quan_khu",
            name: "Tổng quan khu"
        },
        QUAN_LY_DANH_SACH_HEO: {
            codeName: "quan_ly_danh_sach_heo",
            name: "Quản lý danh sách heo"
        },
        QUAN_LY_DANH_SACH_NHAN_VIEN: {
            codeName: "quan_ly_danh_sach_nhan_vien",
            name: "Quản lý danh sách nhân viên"
        },
        // QUAN_LY_DANH_SACH_DOI_TAC: {
        //     codeName: "quan_ly_danh_sach_doi_tac",
        //     name: "Quản lý danh sách đối tác"
        // },
        QUAN_LY_DANH_SACH_KHO: {
            codeName: "quan_ly_danh_sach_kho",
            name: "Quản lý danh sách kho"
        },
        QUAN_LY_DANH_SACH_CHUNG_TU: {
            codeName: "quan_ly_danh_sach_chung_tu",
            name: "Quản lý danh sách chứng từ"
        },
        QUAN_LY_LAM_SAN: {
            codeName: "quan_ly_lam_san",
            name: "Quản lý lâm sàn"
        },
        QUAN_LY_HOAT_DONG: {
            codeName: "quan_ly_hoat_dong",
            name: "Quản lý hoạt động"
        },
        QUAN_LY_THIET_LAP: {
            codeName: "quan_ly_thiet_lap",
            name: "Quản lý thiết lập"
        },
        QUAN_LY_BANG_KE_HOACH: {
            codeName: "quan_ly_bang_ke_hoach",
            name: "Quản lý bảng kế hoạch"
        }
    },
    WAREHOUSE_TYPE: [
        { id: 0, name: 'Kho cám', value: 0 },
        { id: 1, name: 'Kho thuốc', value: 1 }
    ],
    REGENCIES: {
        quan_ly_kho: { id: '13', name: "Thủ kho trại" },
        quan_ly_khu: { id: '10', name: "Trưởng khu" },
    },
    SCHEDULE_STATUS: {
        OVERDUE: { id: 0, name: 'quá hạn', color: '#f53d3d' },
        NOT_ASSIGNED: { id: 1, name: 'chưa phân công', color: '#989aa2' },
        ASSIGNED: { id: 2, name: 'đã phân công', color: '#01c2fa' },
        COMPLETE: { id: 3, name: 'đã hoàn thành', color: '#32db64' }
    },
    TYPE_PIG: [
        { id: 0, name: 'Chưa phân loại' },
        { id: 1, name: 'Loai 1' },
        { id: 2, name: 'Loai 2' },
        { id: 3, name: 'Loai 3' },
        { id: 4, name: 'Loai 4' }
    ],
    INTERVALTIME_LIST: [
        { name: 'Không thiết lập', value: 0 },
        { name: '15 phút', value: 900000 },
        { name: '30 phút', value: 1800000 },
        { name: '60 phút', value: 3600000 },
        { name: '120 phút', value: 7200000 },
    ],
    DEFAULT_TIMEOUT_LIST: [
        { name: '30 giây', value: 30000 },
        { name: '1 phút', value: 60000 },
        { name: '5 phút', value: 300000 },
        { name: '10 phút', value: 600000 },
    ]
}

const API = {
    LOGIN: '/auth/login',
    CHECK_SERVER: '/auth/check_login',

    GET_INFORMATION_PIG: '/api/piginfoextend/one/',  //{pigId}
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
    GET_ALL_MATING: '/api/matings/matingsmatingdetails/list',
    GET_ALL_BIRTHS: '/api/births/list',
    GET_FOOD_WAREHOUSE_OF_WAREHOUSE: '/api/foodwarehouse/warehouse/',
    GET_MEDICINE_WAREHOUSE_OF_WAREHOUSE: '/api/medicinewarehouse/warehouse/',
    GET_PIG_INVOICE_DETAIL_FROM_INVOICE: '/api/invoicepigdetail/invoice/',
    GET_FOOD_WAREHOUSE_FROM_INVOICE: '/api/foodwarehouse/invoice/',
    GET_MEDICINE_WAREHOUSE_FROM_INVOICE: '/api/medicinewarehouse/invoice/',
    GET_ALL_FORWARDING_PIG_INVOICE: '/api/invoicespig/forwarding/list',
    GET_SCHEDULE: '/api/schedule/listschedule',
    GET_INFO_EMPLOYEE: '/api/employees/one/',  //{id}
    GET_ISSUE_PIG_OF_SECTION: '/api/issuespigs/listcurrentissues',   //{idfarm}/{idsection}
    GET_ISSUE_PIG_OF_FARMS: '/api/issuespigs/list',   //{idfarm}/{idsection}
    GET_FORECASTED_DISEASES: '/api/issuespigs/forecastdiseases',    //{idfarm}/{idsection}
    GET_MEDICINES_OF_DISEASE: '/api/medicinedisease/disease',  //{diseaseId}
    GET_MEDICINEWAREHOUSE_OF_MEDICINE: '/api/medicinewarehouse/medicine', //{{medicineId}}
    GET_FEEDS_OF_FOODWAREHOUSE:'/api/feeds/foodwarehouse/',
    GET_USED_MEDICINE_OF_MEDICINEWAREHOUSE:'/api/usedmedicine/medicinewarehouse/',
    GET_USER_ACCOUNT_OF_EMPLOYEE: '/api/users/employee', //{empId}
    GET_SCHEDULE_OF_EMPLOYEE: '/api/schedule/employee/',  //{empId}
    GET_PERMISSION_OF_ROLE: '/api/rolepermission/role/', //{roleId}
    GET_ALL_PERMISSION: '/api/permission/list',
    GET_INVOICE_PIG_BY_ID:'/api/invoicespig/one/',//{id}
    GET_INVOICE_PRODUCT_BY_ID:'/api/invoicesproduct/one/', //{id}

    PUSH_NOTIFICATION: 'https://fcm.googleapis.com/fcm/send',
    SEND_EMAIL: '/api/mail/sendemailnotification/', //{email}/{scheduleid}
    MINING_TO_REVIEW_OFFSET: '/api/minings/',//{pigId}
    UPDATE_MINING_DATA: '/api/minings/update/', //{pigId}/{classification}

    UPDATE_ROLE_PERMISSION: '/api/rolepermission/',

    CREATE_USER: '/api/users/',
    UPDATE_USER: '/api/users/',
    DELETE_USER: '/api/users/',
    UPDATE_USER_PASSWORD: '/api/users/updatepassword/',
    UPDATE_TOKEN: '/api/users/updatetoken/', //{userId}/{token}

    CREATE_FARM: '/api/farms/',
    UPDATE_FARM: '/api/farms/',
    DELETE_FARM: '/api/farms/',

    CREATE_SECTION: '/api/sections/',
    UPDATE_SECTION: '/api/sections/',
    DELETE_SECTION: '/api/sections/',

    CREATE_HOUSE: '/api/houses/',
    UPDATE_HOUSE: '/api/houses/',
    DELETE_HOUSE: '/api/houses/',

    CREATE_WAREHOUSE: '/api/warehouses/',
    UPDATE_WAREHOUSE: '/api/warehouses/',
    DELETE_WAREHOUSE: '/api/warehouses/',

    CREATE_EMPLOYEE: '/api/employees/',
    UPDATE_EMPLOYEE: '/api/employees/',
    DELETE_EMPLOYEE: '/api/employees/',

    CREATE_CUSTOMER_TYPE:'/api/customertypes/',
    UPDATE_CUSTOMER_TYPE:'/api/customertypes/',
    DELETE_CUSTOMER_TYPE:'/api/customertypes/',

    CREATE_CUSTOMER_GROUP:'/api/customergroups/',
    UPDATE_CUSTOMER_GROUP:'/api/customergroups/',
    DELETE_CUSTOMER_GROUP:'/api/customergroups/',

    CREATE_CUSTOMER:'/api/customers/',
    UPDATE_CUSTOMER:'/api/customers/',
    DELETE_CUSTOMER:'/api/customers/',

    CREATE_PARTNER:'/api/partners/',
    UPDATE_PARTNER:'/api/partners/',
    DELETE_PARTNER:'/api/partners/',

    CREATE_FARM_TYPE:'/api/farmtypes/',
    UPDATE_FARM_TYPE:'/api/farmtypes/',
    DELELE_FARM_TYPE:'/api/farmtypes/',

    CREATE_FOOD_TYPE:'/api/foodtype/',
    UPDATE_FOOD_TYPE:'/api/foodtype/',
    DELETE_FOOD_TYPE:'/api/foodtype/',

    CREATE_FOOD_UNIT:'/api/foodunits/',
    UPDATE_FOOD_UNIT:'/api/foodunits/',
    DELETE_FOOD_UNIT:'/api/foodunits/',

    CREATE_FOOD:'/api/foods/',
    UPDATE_FOOD:'/api/foods/',
    DELETE_FOOD:'/api/foods/',

    CREATE_MEDICINE_TYPE:'/api/medicinetype/',
    UPDATE_MEDICINE_TYPE:'/api/medicinetype/',
    DELETE_MEDICINE_TYPE:'/api/medicinetype/',

    CREATE_MEDICINE_UNIT:'/api/medicineunits/',
    UPDATE_MEDICINE_UNIT:'/api/medicineunits/',
    DELETE_MEDICINE_UNIT:'/api/medicineunits/',

    CREATE_MEDICINE:'/api/medicines/',
    UPDATE_MEDICINE:'/api/medicines/',
    DELETE_MEDICINE:'/api/medicines/',

    CREATE_GENTIAL_TYPE:'/api/gentialtype/',
    UPDATE_GENTIAL_TYPE:'/api/gentialtype/',
    DELETE_GENTIAL_TYPE:'/api/gentialtype/',

    CREATE_FOOT_TYPE:'/api/foottype/',
    UPDATE_FOOT_TYPE:'/api/foottype/',
    DELETE_FOOT_TYPE:'/api/foottype/',

    CREATE_HEALTH_STATUS:'/api/healthstatus/',
    UPDATE_HEALTH_STATUS:'/api/healthstatus/',
    DELETE_HEALTH_STATUS:'/api/healthstatus/',

    CREATE_PREGNANCY_STATUS: '/api/pregnancystatus/',
    DELETE_PREGNANCY_STATUS: '/api/pregnancystatus/',
    UPDATE_PREGNANCY_STATUS: '/api/pregnancystatus/',

    CREATE_PIG_STATUS: '/api/status/',
    DELETE_PIG_STATUS: '/api/status/',
    UPDATE_PIG_STATUS: '/api/status/',

    CREATE_ISSUE:'/api/issues/',
    UPDATE_ISSUE:'/api/issues/',
    DELETE_ISSUE:'/api/issues/',

    CREATE_DISEASE: '/api/diseases/',
    UPDATE_DISEASE: '/api/diseases/',
    DELETE_DISEASE: '/api/diseases/',

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
    UPDATE_PRODUCT_INVOICE: '/api/invoicesproduct/',
    DELETE_PRODUCT_INVOICE: '/api/invoicesproduct/',

    CREATE_PIG_INVOICE_DETAIL: '/api/invoicepigdetail/pigsinvoicepigdetail/',
    CREATE_IMPORT_INTERNAL_PIG_INVOICE: '/api/invoicespig/pigsinvoicepig/',

    UPDATE_PIG_INVOICE_DETAIL:'/api/invoicepigdetail/updatepigininvoicepig/',


    DELETE_PIG_INVOICE_DETAIL: '/api/invoicepigdetail/onlyinvoicedetail/',
    DELETE_EXTERNAL_IMPORT_PIG_INVOICE_DETAIL: '/api/invoicepigdetail/',

    UPDATE_SOLD_STATUS_FOR_PIGS: '/api/pigs/updatestatussold/',

    CREATE_FOOD_WAREHOUSE: '/api/foodwarehouse/',
    UPDATE_FOOD_WAREHOUSE: '/api/foodwarehouse/',
    DELETE_FOOD_WAREHOUSE: '/api/foodwarehouse/',

    CREATE_MEDICINE_WAREHOUSE: '/api/medicinewarehouse/',
    UPDATE_MEDICINE_WAREHOUSE: '/api/medicinewarehouse/',
    DELETE_MEDICNE_WAREHOUSE: '/api/medicinewarehouse/',

    CREATE_WAREHOUSE_TYPE: '/api/warehousetype/',
    UPDATE_WAREHOUSE_TYPE: '/api/warehousetype/',
    DELETE_WAREHOUSE_TYPE: '/api/warehousetype/',

    CREATE_PIG: '/api/pigs/',
    UPDATE_PIG: '/api/pigs/',
    DELETE_PIG: '/api/pigs/',

    CREATE_MATING_ROLE:'/api/matingroles/',
    UPDATE_MATING_ROLE:'/api/matingroles/',
    DELETE_MATING_ROLE:'/api/matingroles/',

    CREATE_BREEDING: '/api/breedings/',
    UPDATE_BREEDING: '/api/breedings/',
    DELETE_BREEDING: '/api/breedings/',

    CREATE_SPERM: '/api/sperm/',
    UPDATE_SPERM: '/api/sperm/',
    DELETE_SPERM: '/api/sperm/',

    CREATE_MATING: '/api/matings/matingsmatingdetails/',
    UPDATE_MATING: '/api/matings/matingsmatingdetails/',
    UPDATE_MATING_OBJ: '/api/matings/',
    DELETE_MATING: '/api/matings/',

    CREATE_ISSUES_PIG: '/api/issuespigs/',
    UPDATE_LIST_ISSUES_PIG: '/api/issuespigs/updateall/',
    DELETE_ISSUES_PIG: '/api/issuespigs/',

    CREATE_BIRTH: '/api/births/',
    UPDATE_BIRTH: '/api/births/',

    CREATE_FEEDS: '/api/feeds/feedlist/',

    CREATE_USED_MEDICINE_LIST: '/api/usedmedicine/',

    CREATE_REGENCY:'/api/regencies/',
    UPDATE_REGENCY:'/api/regencies/',
    DELETE_REGENCY:'/api/regencies/',

    CREATE_ROLE:'/api/roles/',
    UPDATE_ROLE:'/api/roles/',
    DELETE_ROLE:'/api/roles/',

    CREATE_SCHEDULE: '/api/schedule/',
    UPDATE_SCHEDULE: '/api/schedule/',
    DELETE_SCHEDULE: '/api/schedule/'
}

const ERROR_NAME = {
    TIMEMOUT_ERROR: 'TimeoutError',
    ERROR_RESPONSE: 'HttpErrorResponse',
    ERROR_UNIQUE_MAIL: '[unique_email]'
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
        LOADING_DATA: 'Đang tải dữ liệu',
        MAIL_UNIQUE: 'Email đăng kí đã tồn tại',
        PERMISSIONS_ERROR: 'Lỗi truy cập không được cấp quyền',
        ERROR_CHECK_REMAIN_PRODUCT_CODE:/1432/,
        ERROR_CHECK_REMAIN_SPERM_CODE:/1433/
    }
}

export { KEY }
export { API }
export { CONFIG }
export { VARIABLE }
export { EMAIL_PATTERN }
export { SETTING_STORAGE_KEY }
export { MESSAGE, ERROR_NAME }
export { SETTING_KEY}


