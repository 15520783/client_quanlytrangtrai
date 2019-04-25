const KEY = {
    ACCESSTOKEN:'accessToken',
    TOKENTYPE:'tokenType',
    FARMS: 'farms',
    SECTIONS: 'sections',
    HOUSES:'houses',
    PIGS: 'pigs',
    GROUPS: 'groups',
    EMPLOYEES: 'employees',
    WAREHOUSES: 'warehouses'
}

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CONFIG = {
    // SERVER_API: 'http://192.168.0.36:3000',
    SERVER_API: 'https://quanlytrangtrai-uit.herokuapp.com',
    DEFAULT_TIMEOUT: 20000,
    LANGUAGE_DEFAULT:'vi',
    ACCESS_KEY:''
}

const VARIABLE = {
    gender: [
        { id: 0, name: 'Không xác định' },
        { id: 1, name: 'Nái' },
        { id: 2, name: 'Đực' },
        { id: 3, name: 'Đực hiến' }
    ]
}

const API = {
    LOGIN:'https://quanlytrangtrai-uit.herokuapp.com/auth/login',
    // GET_ALL_FARMS: '/api/farms',
    GET_ALL_FARMS:'https://quanlytrangtrai-uit.herokuapp.com/api/farms/list',
    // GET_ALL_SECTIONS: '/api/sections',
    GET_ALL_SECTIONS: '/api/sections/list',
    // GET_ALL_HOUSES: '/api/houses',
    GET_ALL_HOUSES: '/api/houses/list',
    GET_ALL_PIGS: '/api/pigs',
    // GET_ALL_GROUPS: '/api/groups',
    GET_ALL_GROUPS: '/api/groups/list',
    // GET_ALL_EMPLOYEES: '/api/employees',
    GET_ALL_EMPLOYEES: 'https://quanlytrangtrai-uit.herokuapp.com/api/employees/list',
    // GET_ALL_WAREHOUSES: '/api/warehouses',
    GET_ALL_WAREHOUSES: '/api/warehouses/list'
}

export { KEY }
export { API }
export { CONFIG }
export { VARIABLE }
export { EMAIL_PATTERN } 