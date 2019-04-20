const KEY = {
    FARMS: 'farms',
    SECTIONS: 'sections',
    HOUSES:'houses',
    PIGS: 'pigs',
    GROUPS: 'groups',
    EMPLOYEES: 'employees'
}

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CONFIG = {
    SERVER_API: 'http://192.168.1.223:3000',
    DEFAULT_TIMEOUT: 3000,
    LANGUAGE_DEFAULT:'vi'
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
    GET_ALL_FARMS: '/api/farms',
    GET_ALL_SECTIONS: '/api/sections',
    GET_ALL_HOUSES: '/api/houses',
    GET_ALL_PIGS: '/api/pigs',
    GET_ALL_GROUPS: '/api/groups',
    GET_ALL_EMPLOYEES: '/api/employees'
}

export { KEY }
export { API }
export { CONFIG }
export { VARIABLE }
export { EMAIL_PATTERN } 