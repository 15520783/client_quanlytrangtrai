const KEY = {
    FARMS: 'farms',
    SECTIONS: 'sections',
    PIGS: 'pigs'
}

const CONFIG = {
    SERVER_API: 'http://192.168.0.225:3000',
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
    GET_ALL_PIGS: '/api/pigs'
}

export { KEY }
export { API }
export { CONFIG }
export { VARIABLE }