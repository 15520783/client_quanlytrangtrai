export { PERMISSIONS }
const PERMISSIONS = {
    "chuc_vu_nguoi_dung": {
        "admin": {
            "id": "1",
            "name": "Admin"
        },
        "nhan_vien": {
            "id": "2",
            "name": "Nhân viên"
        }
    },
    "tong_quan_trang_trai": {
        "ROLE_them_trang_trai": {
            "id": "4",
            "name": "Thêm trang trại",
            "api": ""
        },
        "ROLE_xem_danh_sach_trang_trai": {
            "id": "5",
            "name": "Xem danh sách trang trại",
            "api": "/api/farms/list"
        },
        "ROLE_xem_thong_tin_trang_trai": {
            "id": "6",
            "name": "Xem thông tin trang trại",
            "api": "/api/farms/{id}"
        },
        "ROLE_cap_nhat_trang_trai": {
            "id": "7",
            "name": "Cập nhật trang trại",
            "api": "/api/farms/"
        },
        "ROLE_xoa_trang_trai": {
            "id": "8",
            "name": "Xóa trang trại",
            "api": "/api/farms/"
        }
    },
    "tong_quan_khu": {
        "ROLE_them_khu": {
            "id": "9",
            "name": "Thêm khu",
            "api": "/api/sections/"
        },
        "ROLE_xem_danh_sach_khu": {
            "id": "10",
            "name": "Xem danh sách khu",
            "api": "/api/sections/list"
        },
        "ROLE_xem_thong_tin_khu": {
            "id": "11",
            "name": "Xem thông tin khu",
            "api": "/api/sections/{id}"
        },
        "ROLE_cap_nhat_khu": {
            "id": "12",
            "name": "Cập nhật khu",
            "api": "/api/sections/"
        },
        "ROLE_xoa_khu": {
            "id": "13",
            "name": "Xóa khu",
            "api": "/api/sections/"
        },
        "ROLE_them_chuong": {
            "id": "14",
            "name": "Thêm mới chuồng",
            "api": "/api/houses/"
        },
        "ROLE_xem_danh_sach_chuong": {
            "id": "15",
            "name": "Xem danh sách chuồng",
            "api": "/api/houses/list"
        },
        "ROLE_xem_thong_tin_chuong": {
            "id": "16",
            "name": "Xem thông tin chuồng",
            "api": "/api/houses/{id}"
        },
        "ROLE_xoa_chuong": {
            "id": "17",
            "name": "Xóa chuồng",
            "api": "/api/houses/"
        }
    },
    "quan_ly_danh_sach_heo": {
        "ROLE_xem_danh_sach_heo": {
            "id": "18",
            "name": "Xem danh sách heo",
            "api": "/api/pigs/list"
        },
        "ROLE_them_heo": {
            "id": "19",
            "name": "Thêm mới heo",
            "api": "/api/pigs/"
        },
        "ROLE_xem_thong_tin_heo": {
            "id": "20",
            "name": "Xem thông tin heo",
            "api": "/api/pigs/{id}"
        },
        "ROLE_cap_nhat_thong_tin_heo": {
            "id": "21",
            "name": "Cập nhật thông tin heo",
            "api": "/api/pigs/"
        },
        "ROLE_xoa_heo": {
            "id": "22",
            "name": "Xóa heo",
            "api": "/api/pigs/"
        },
        "ROLE_xem_lich_su_hoat_dong": {
            "id": "23",
            "name": "Xem lịch sử hoạt động",
            "api": "/api/piginfoextend/"
        }
    },
    "quan_ly_danh_sach_nhan_vien": {
        "ROLE_xem_danh_sach_nhan_vien": {
            "id": "24",
            "name": "Xem danh sách nhân viên",
            "api": "/api/employees/list"
        },
        "ROLE_them_nhan_vien": {
            "id": "25",
            "name": "Thêm mới nhân viên",
            "api": "/api/employees/"
        },
        "ROLE_cap_nhat_nhan_vien": {
            "id": "26",
            "name": "Cập nhật nhân viên",
            "api": "/api/employees/"
        },
        "ROLE_xoa_nhan_vien": {
            "id": "27",
            "name": "Xóa nhân viên",
            "api": "/api/employees/"
        },
        "ROLE_xem_thong_tin_nhan_vien": {
            "id": "28",
            "name": "Xem thông tin nhân viên",
            "api": "/api/employees/{id}"
        }
    },
    "quan_ly_danh_sach_doi_tac": {
        "ROLE_xem_danh_sach_doi_tac": {
            "id": "29",
            "name": "Xem danh sách đối tác",
            "api": "/api/partners/list"
        },
        "ROLE_them_doi_tac": {
            "id": "30",
            "name": "Thêm mới đối tác",
            "api": "/api/partners/"
        },
        "ROLE_cap_nhat_doi_tac": {
            "id": "31",
            "name": "Cập nhật thông tin đối tác",
            "api": "/api/partners/"
        },
        "ROLE_xoa_doi_tac": {
            "id": "32",
            "name": "Xóa đối tác",
            "api": "/api/partners/"
        },
        "ROLE_xem_thong_tin_doi_tac": {
            "id": "33",
            "name": "Xem thông tin đối tác",
            "api": "/api/partners/{id}"
        }
    },
    "quan_ly_danh_sach_kho": {
        "ROLE_xem_danh_sach_kho": {
            "id": "34",
            "name": "Xem danh sách kho",
            "api": "/api/warehouses/list"
        },
        "ROLE_them_kho": {
            "id": "35",
            "name": "Thêm mới kho",
            "api": "/api/warehouses/"
        },
        "ROLE_cap_nhat_kho": {
            "id": "36",
            "name": "Cập nhật thông tin kho",
            "api": "/api/warehouses/"
        },
        "ROLE_xoa_kho": {
            "id": "37",
            "name": "Xóa kho",
            "api": "/api/warehouses/"
        },
        "ROLE_xem_thong_tin_kho": {
            "id": "38",
            "name": "Xem thông tin kho",
            "api": "/api/warehouses/{id}"
        },
        "ROLE_xuat_cam_cho_heo_an": {
            "id": "39",
            "name": "Xuất cám cho heo ăn",
            "api": "/api/feeds/feedlist/"
        },
        "ROLE_xem_lich_su_xuat_cam": {
            "id": "40",
            "name": "Xem lịch sử xuất cám",
            "api": ""
        }
    },
    "quan_ly_lam_san":{
        "xem_danh_sach_ghi_nhan_van_de_heo":{
            "id":"",
            "name":"Xem danh sách ghi nhận vấn đề heo",
            "api":""
        },
        "xem_goi_y_chuan_doan":{
            "id":"",
            "name":"Xem gợi ý chuẩn đoán",
            "api":""
        },
        "xoa_ghi_nhan_van_de_heo":{
            "id":"",
            "name":"Xóa ghi nhận vấn đề heo",
            "api":""
        },
        "xu_ly_van_de_heo":{
            "id":"",
            "name":"Xử lí vấn đề của heo",
            "api":""
        }
    },

    "quan_ly_danh_sach_chung_tu": {
        "ROLE_xem_danh_sach_chung_tu": {
            "id": "41",
            "name": "Xem danh sách chứng từ",
            "api": "/api/invoices/list"
        },

        "ROLE_quan_ly_chung_tu_nhap_heo_trong_he_thong": {
            "id":"",
            "name": "Quản lý chứng từ nhập heo trong hệ thống",
            "api": ""
        },
        "ROLE_quan_ly_chung_tu_nhap_heo_ngoai_he_thong": {
            "id":"",
            "name": "Quản lý chứng từ nhập heo ngoài hệ thống",
            "api": ""
        },
        "ROLE_quan_ly_chung_tu_xuat_ban_heo": {
            "id":"",
            "name": "Quản lý chứng từ xuất bán heo",
            "api": ""
        },
        "ROLE_quan_ly_chung_tu_xuat_heo_trong_he_thong": {
            "id":"",
            "name": "Quản lý chứng từ xuất heo trong hệ thống",
            "api": ""
        },
        "ROLE_quan_ly_chung_tu_nhap_cam": {
            "id":"",
            "name": "Quản lý chứng từ nhập cám",
            "api": ""
        },
        "ROLE_quan_ly_chung_tu_nhap_thuoc": {
            "id":"",
            "name": "Quản lý chứng từ nhập thuốc",
            "api": ""
        },


        "ROLE_them_chung_tu_nhap_heo_trong_he_thong": {
            "id": "42",
            "name": "Thêm chứng từ nhập heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_xoa_chung_tu_nhap_heo_trong_he_thong": {
            "id": "43",
            "name": "Xóa chứng từ nhập heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_cap_nhat_chung_tu_nhap_heo_trong_he_thong": {
            "id": "44",
            "name": "Cập nhật chứng từ nhập heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_xac_nhan_hoan_tat_chung_tu_nhap_heo_trong_he_thong": {
            "id": "45",
            "name": "Xác nhận hoàn tất chứng từ nhập heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_danh_gia_lai_heo_thuoc_chung_tu_nhap_heo_trong_he_thong": {
            "id": "46",
            "name": "Đánh giá lại heo thuộc chứng từ nhập heo trong hệ thống",
            "api": "/api/pigs/"
        },
        "ROLE_them_chung_tu_nhap_heo_ngoai_he_thong": {
            "id": "47",
            "name": "Thêm chứng từ nhập heo ngoài hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_xoa_chung_tu_nhap_heo_ngoai_he_thong": {
            "id": "48",
            "name": "Xóa chứng từ nhập heo ngoài hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_cap_nhat_chung_tu_nhap_heo_ngoai_he_thong": {
            "id": "49",
            "name": "Cập nhật chứng từ nhập heo ngoài hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_xac_nhan_hoan_tat_chung_tu_nhap_heo_ngoai_he_thong": {
            "id": "50",
            "name": "Xác nhận hoàn tất chứng từ nhập heo ngoài hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_them_chi_tiet_chung_tu_nhap_heo_ngoai_he_thong": {
            "id": "51",
            "name": "Thêm chi tiết chứng từ nhập heo ngoài hệ thống",
            "api": "/api/invoicepigdetail/pigsinvoicepigdetail/"
        },
        "ROLE_danh_gia_lai_heo_thuoc_chung_tu_nhap_heo_ngoai_he_thong": {
            "id": "52",
            "name": "Đánh giá lại heo thuộc chứng từ nhập heo ngoài hệ thống",
            "api": "/api/pigs/"
        },
        "ROLE_xoa_chi_tiet_chung_tu_nhap_heo_ngoai_he_thong": {
            "id": "53",
            "name": "Xóa chi tiết chứng từ nhập heo ngoài hệ thống",
            "api": "/api/invoicepigdetail/"
        },
        "ROLE_them_chung_tu_xuat_heo_trong_he_thong": {
            "id": "54",
            "name": "Thêm chứng từ xuất heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_xoa_chung_tu_xuat_heo_trong_he_thong": {
            "id": "55",
            "name": "Xóa chứng từ nhập xuất heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_cap_nhat_chung_tu_xuat_heo_trong_he_thong": {
            "id": "56",
            "name": "Cập nhật chứng từ xuất heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_xac_nhan_xuat_heo_chung_tu_xuat_heo_trong_he_thong": {
            "id": "57",
            "name": "Xác nhận xuất heo chứng từ xuất heo trong hệ thống",
            "api": "/api/invoicespig/"
        },
        "ROLE_them_chi_tiet_chung_tu_xuat_heo_trong_he_thong": {
            "id": "58",
            "name": "Thêm chi tiết chứng từ xuất heo trong hệ thống",
            "api": "/api/invoicepigdetail/pigsinvoicepigdetail/"
        },
        "ROLE_danh_gia_lai_heo_thuoc_chung_tu_xuat_heo_trong_he_thong": {
            "id": "59",
            "name": "Đánh giá lại heo thuộc chứng từ xuất heo trong hệ thống",
            "api": "/api/pigs/"
        },
        "ROLE_xoa_chi_tiet_chung_tu_xuat_heo_trong_he_thong": {
            "id": "60",
            "name": "Xóa chi tiết chứng từ xuất heo trong hệ thống",
            "api": "/api/invoicepigdetail/onlyinvoicedetail/"
        },
        "ROLE_them_chung_nhap_cam": {
            "id": "61",
            "name": "Thêm chứng từ nhập cám",
            "api": "/api/invoicesproduct/"
        },
        "ROLE_xoa_chung_tu_nhap_cam": {
            "id": "62",
            "name": "Xóa chứng từ nhập cám",
            "api": "/api/invoicesproduct/"
        },
        "ROLE_cap_nhat_chung_tu_nhap_cam": {
            "id": "63",
            "name": "Cập nhật chứng từ nhập cám",
            "api": "/api/invoicesproduct/"
        },
        "ROLE_xac_nhan_hoan_tat_chung_tu_nhap_cam": {
            "id":"",
            "name": "Xác nhận hoàn tất chứng từ nhập cám",
            "api": "/api/invoicesproduct/"
        },
        "ROLE_them_chi_tiet_chung_tu_nhap_cam": {
            "id": "64",
            "name": "Thêm chi tiết chứng từ nhập cám",
            "api": "/api/foodwarehouse/"
        },
        "ROLE_cap_nhat_chi_tiet_chung_tu_nhap_cam": {
            "id": "65",
            "name": "Cập nhật chi tiết chứng từ nhập cám",
            "api": "/api/foodwarehouse/"
        },
        "ROLE_xoa_chi_tiet_chung_tu_nhap_cam": {
            "id": "66",
            "name": "Xóa chi tiết chứng từ nhập cám",
            "api": "/api/foodwarehouse/"
        },
        "ROLE_them_chung_nhap_thuoc": {
            "id": "67",
            "name": "Thêm chứng từ nhập thuốc",
            "api": "/api/invoicespig/"
        },
        "ROLE_xoa_chung_tu_nhap_thuoc": {
            "id": "68",
            "name": "Xóa chứng từ nhập thuốc",
            "api": "/api/invoicespig/"
        },
        "ROLE_cap_nhat_chung_tu_nhap_thuoc": {
            "id": "69",
            "name": "Cập nhật chứng từ nhập thuốc",
            "api": "/api/invoicespig/"
        },
        "ROLE_xac_nhan_hoan_tat_chung_tu_nhap_thuoc": {
            "id":"",
            "name": "Xác nhận hoàn tất chứng từ nhập thuốc",
            "api": "/api/invoicesproduct/"
        },
        "ROLE_them_chi_tiet_chung_tu_nhap_thuoc": {
            "id": "70",
            "name": "Thêm chi tiết chứng từ nhập thuốc",
            "api": "/api/medicinewarehouse/"
        },
        "ROLE_cap_nhat_chi_tiet_chung_tu_nhap_thuoc": {
            "id": "71",
            "name": "Cập nhật chi tiết chứng từ nhập thuốc",
            "api": "/api/medicinewarehouse/"
        },
        "ROLE_xoa_chi_tiet_chung_tu_nhap_thuoc": {
            "id": "72",
            "name": "Xóa chi tiết chứng từ nhập thuốc",
            "api": "/api/medicinewarehouse/"
        },
        "ROLE_them_chung_tu_xuat_ban_heo":{
            "id":"",
            "name":"Thêm chứng từ xuất bán heo",
            "api":""
        },
        "ROLE_xoa_chung_tu_xuat_ban_heo": {
            "id":"",
            "name": "Xóa chứng từ xuất bán heo",
            "api": "/api/invoicespig/"
        },
        "ROLE_cap_nhat_chung_tu_xuat_ban_heo": {
            "id":"",
            "name": "Cập nhật chứng từ xuất bán heo",
            "api": "/api/invoicespig/"
        },
        "ROLE_xac_nhan_hoan_tat_chung_tu_xuat_ban_heo": {
            "id":"",
            "name": "Xác nhận xuất heo chứng từ xuất bán heo",
            "api": "/api/invoicespig/"
        },
        "ROLE_them_chi_tiet_chung_tu_xuat_ban_heo": {
            "id":"",
            "name": "Thêm chi tiết chứng từ xuất bán heo",
            "api": "/api/invoicepigdetail/pigsinvoicepigdetail/"
        },
    
        "ROLE_xoa_chi_tiet_chung_tu_xuat_ban_heo": {
            "id":"",
            "name": "Xóa chi tiết chứng từ xuất bán heo",
            "api": "/api/invoicepigdetail/onlyinvoicedetail/"
        }
    },
    "quan_ly_hoat_dong": {
        "ROLE_quan_ly_heo_khu_cach_ly": {
            "id": "73",
            "name": "Quản lý heo khu cách ly",
            "api": "/api/pigs/list"
        },
        "ROLE_quan_ly_heo_khu_noc": {
            "id": "74",
            "name": "Quản lý heo khu noc",
            "api": "/api/pigs/list"
        },
        "ROLE_quan_ly_heo_khu_phoi": {
            "id": "75",
            "name": "Quản lý heo khu phối",
            "api": "/api/pigs/list"
        },
        "ROLE_quan_ly_heo_khu_mang_thai": {
            "id": "76",
            "name": "Quản lý heo khu mang thai",
            "api": "/api/pigs/list"
        },
        "ROLE_quan_ly_heo_khu_de": {
            "id": "77",
            "name": "Quản lý heo khu đẻ",
            "api": "/api/pigs/list"
        },
        "ROLE_quan_ly_heo_khu_cai_sua": {
            "id": "78",
            "name": "Quản lý heo khu cai sữa",
            "api": "/api/pigs/list"
        },
        "ROLE_quan_ly_heo_khu_hau_bi": {
            "id": "79",
            "name": "Quản lý heo khu hậu bị",
            "api": "/api/pigs/list"
        },
        "ROLE_quan_ly_heo_khu_8": {
            "id": "80",
            "name": "Quản lý heo khu 8",
            "api": "/api/pigs/list"
        },
        "ROLE_xem_thong_tin_heo_tai_khu": {
            "id": "81",
            "name": "Xem thông tin heo tại khu",
            "api": "/api/pigs/{id}"
        },
        "ROLE_nhap_van_de_cua_heo": {
            "id": "82",
            "name": "Nhập vấn đề heo",
            "api": "/api/issuespigs/"
        },
        "ROLE_danh_gia_chuyen_noi_bo": {
            "id": "83",
            "name": "Đánh giá chuyển nội bộ",
            "api": "/api/pigs/"
        },
        "ROLE_len_giong_heo_nai": {
            "id": "84",
            "name": "Lên giống heo nái",
            "api": "/api/breedings/"
        },
        "ROLE_cap_nhat_thong_tin_len_giong": {
            "id": "85",
            "name": "Cập nhật thông tin lên giống",
            "api": "/api/breedings/"
        },
        "ROLE_xoa_thong_tin_len_giong": {
            "id": "86",
            "name": "Xóa thông tin lên giống",
            "api": "/api/breedings/"
        },
        "ROLE_xem_danh_sach_len_giong": {
            "id": "87",
            "name": "Xem danh sách lên giống",
            "api": "/api/breedings/list"
        },
        "ROLE_khai_thac_tinh_heo": {
            "id": "88",
            "name": "Khai thác tinh heo",
            "api": "/api/sperm/"
        },
        "ROLE_cap_nhat_thong_tin_khai_thac_tinh_heo": {
            "id": "89",
            "name": "Cập nhật thông tin khai thác tinh heo",
            "api": "/api/sperm/"
        },
        "ROLE_xoa_thong_tin_khai_thac_tinh_heo": {
            "id": "90",
            "name": "Xóa thông tin khai thác tinh heo",
            "api": "/api/sperm/"
        },
        "ROLE_xem_danh_sach_khai_thac_tinh_heo": {
            "id": "91",
            "name": "Xem danh sách khai thác tinh heo",
            "api": "/api/sperm/list"
        },
        "ROLE_ghi_nhan_phoi_giong": {
            "id": "92",
            "name": "Ghi nhận phối giống",
            "api": "/api/matings/matingsmatingdetails/"
        },
        "ROLE_cap_nhat_thong_tin_phoi_giong": {
            "id": "93",
            "name": "Cập nhật thông tin phối giống",
            "api": "/api/matings/matingsmatingdetails/"
        },
        "ROLE_xoa_thong_tin_phoi_giong": {
            "id": "94",
            "name": "Xóa thông tin phối giống",
            "api": "/api/matings/"
        },
        "ROLE_xem_danh_sach_phoi_giong": {
            "id": "95",
            "name": "Xem danh sách phối giống",
            "api": "/api/matings/matingsmatingdetails/list"
        },
        "ROLE_xac_nhan_heo_mang_thai": {
            "id": "96",
            "name": "Xác nhận heo mang thai",
            "api": "/api/matings/"
        },
        "ROLE_xac_nhan_heo_say_thai": {
            "id": "97",
            "name": "Xác nhận heo sẩy thai",
            "api": "/api/matings/"
        },
        "ROLE_ghi_nhan_thong_tin_heo_de": {
            "id": "98",
            "name": "Ghi nhận thông tin heo đẻ",
            "api": "/api/births/"
        },
        "ROLE_cap_nhat_thong_tin_heo_de": {
            "id": "99",
            "name": "Cập nhật thông tin heo đẻ",
            "api": "/api/births/"
        },
        "ROLE_xoa_ghi_nhan_thong_tin_heo_de": {
            "id": "100",
            "name": "Xóa ghi nhận thông tin heo đẻ",
            "api": "/api/births/"
        },
        "ROLE_nhap_heo_con": {
            "id": "101",
            "name": "Nhập thông tin đàn heo con",
            "api": "/api/invoicepigdetail/pigsinvoicepigdetail/"
        },
        "ROLE_xem_danh_sach_ghi_nhan_heo_de": {
            "id":"",
            "name": "Xem danh sách ghi nhận heo đẻ",
            "api": "/api/births/list"
        },
        "ROLE_xem_danh_sach_dan_heo_con": {
            "id":"",
            "name": "Xem danh sách ghi nhận heo con",
            "api": ""
        },
        "ROLE_them_vao_danh_sach_cai_sua": {
            "id": "102",
            "name": "Thêm heo vào danh sách cai sữa",
            "api": "/api/pigs/"
        },

        "ROLE_phan_loai_danh_gia_chat_luong_heo": {
            "id":"",
            "name": "Phân loại đánh giá chất lượng heo",
            "api": "/api/minings/"
        },
        "ROLE_luu_ghi_nhan_danh_gia_chat_luong_heo": {
            "id":"",
            "name": "Lưu ghi nhận đánh giá chất lượng heo",
            "api": "/api/minings/update/"
        },
    },
    "quan_ly_thiet_lap": {
        "ROLE_xem_danh_sach_thiet_lap": {
            "id": "103",
            "name": "Xem danh sách thiết lap",
            "api": "/api/settings/list"
        },
        "ROLE_thiet_lap_trang_thai_mang_thai": {
            "id": "104",
            "name": "Thiết lập trạng thái mang thai"
        },
        "ROLE_thiet_lap_danh_sach_giong": {
            "id": "105",
            "name": "Thiết lập danh sách giống"
        },
        "ROLE_thiet_lap_loai_len_giong": {
            "id": "106",
            "name": "Thiết lập loại lên giống"
        },
        "ROLE_thiet_lap_trang_thai_suc_khoe": {
            "id": "107",
            "name": "Thiết lập trạng thái sức khỏe"
        },
        "ROLE_thiet_lap_danh_sach_benh": {
            "id": "108",
            "name": "Thiết lập danh sách bệnh"
        },
        "ROLE_thiet_lap_danh_sach_loai_trang_trai": {
            "id": "109",
            "name": "Thiết lập danh sách loại trang trại"
        },
        "ROLE_thiet_lap_danh_sach_loai_thuc_an": {
            "id": "110",
            "name": "Thiết lập danh sách loại thức ăn"
        },
        "ROLE_thiet_lap_don_vi_cam": {
            "id": "111",
            "name": "Thiết lập đơn vị cám"
        },
        "ROLE_thiet_lap_danh_sach_cam": {
            "id": "112",
            "name": "Thiết lập danh sách cám"
        },
        "ROLE_thiet_lap_nhom_thuoc": {
            "id": "113",
            "name": "Thiết lập nhóm thuốc"
        },
        "ROLE_thiet_lap_danh_sach_thuoc": {
            "id": "114",
            "name": "Thiết lập danh sách thuốc"
        },
        "ROLE_thiet_lap_danh_sach_ma_san_pham": {
            "id": "115",
            "name": "Thiết lập danh sách mã sản phẩm"
        },
        "ROLE_thiet_lap_loai_chan": {
            "id": "116",
            "name": "Thiết lập loại chân"
        },
        "ROLE_thiet_lap_loai_bo_phan_sinh_duc": {
            "id": "117",
            "name": "Thiết lập loại bộ phận sinh dục"
        },
        "ROLE_thiet_lap_danh_sach_trang_thai_heo": {
            "id": "118",
            "name": "Thiết lập danh sách trạng thái heo"
        },
        "ROLE_thiet_lap_danh_sach_lua": {
            "id": "119",
            "name": "Thiết lập danh sách lứa"
        },
        "ROLE_thiet_lap_danh_sach_chuc_vu": {
            "id": "120",
            "name": "Thiết lập chức vụ"
        },
        "ROLE_thiet_lap_luat_phoi": {
            "id": "121",
            "name": "Thiết lập luật phối"
        }
    },
    "quan_ly_bang_ke_hoach": {
        "ROLE_xem_bang_ke_hoach": {
            "id": "122",
            "name": "Xem bảng kế hoạch"
        }
    }
}