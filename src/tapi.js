import axios from 'axios';

//axios.defaults.headers.common['Authorization'] = `eyJ1aWQiOiJOQTAwMDAwMDIiLCJzaWQiOiIzNTQwQzA1NzBBQjU4QjRCIiwiZXhwIjoyMDMwODMzNDg0fQ.Of6Oxj0UuaE-R9GmYttpV1RO6YntlPxDMvLDgdYEyRE`;
const apiUrl = 'https://lhbs.vn/api';
const tApi = {
    login: (data) => axios.post('http://lhbs.vn/out/token', { username: data.username, password: data.password }).then(res => res.data.data),
    getFunctionRight:(meID) => axios.get(`${apiUrl}/System_GetFunctionRight/${meID}`).then(res=>res.data.data),
      
    //-------------------------------------------------
    getListStudent: (lopID) => axios.get(`${apiUrl}/auth/GiaoVien_GetDanhSachHocSinhLop/${lopID}`).then(res => res.data.data),
    getListClassFcRight: (meID, namhoc, hocky, fcright) => axios.get(`${apiUrl}/auth/GiaoVien_GetDanhSachLopGiangDay_new/${meID}/${namhoc}/${hocky}/${fcright}`).then(res => res.data.data),
    getListClass: (meID, namhoc, hocky) => axios.get(`${apiUrl}/auth/GiaoVien_GetDanhSachLopGiangDay/${meID}/${namhoc}/${hocky}`).then(res => res.data.data),
    getListSubjectByLop: (meID, namhoc, hocky, lopid) => axios.get(`${apiUrl}/auth/GiaoVien_GetDanhSachMonGiangDayTheoLop/${meID}/${namhoc}/${hocky}/${lopid}`).then(res => res.data.data),
    getListNhanXetMonHoc: (HocSinhID, LopMonID, NamHoc, Thang) => axios.get(`${apiUrl}/auth/GiaoVien_GetNhanXetbyHocSinh/${HocSinhID}/${LopMonID}/${NamHoc}/${Thang}`).then(res => res.data.data),
    //getThongKeNhanXetMonHoc: ( namhoc, hocky, thang) => axios.get(`${apiUrl}/auth/GiaoVien_GetThongKeNhanXetMonhoc/${namhoc}/${hocky}/${thang}`).then(res => res.data),
    getThongKeNhanXetMonHoc: (meID, namhoc, hocky, thang) => axios.get(`${apiUrl}/auth/GiaoVien_GetThongKeNhanXetMonhoc/${meID}/${namhoc}/${hocky}/${thang}`).then(res => res.data.data),
    getTieuChiDanhGia: (LopMonID, KyDanhGia) => axios.get(`${apiUrl}/auth/GiaoVien_GetTieuChiDanhGia/${LopMonID}/${KyDanhGia}`).then(res => res.data.data),
    
   
   
     //In bảng điểm
     getDataInPhieuDiem: (kydanhgia, lopid) => axios.get(`${apiUrl}/auth/GiaoVien_TT22_GetDataInPhieuDiem/${kydanhgia}/${lopid}`).then(res => res.data.data),
     getDataInNhanXet: (kydanhgia, lopid, hocsinhid) => axios.get(`${apiUrl}/auth/GiaoVien_TT22_GetDataInNhanXet/${kydanhgia}/${lopid}/${hocsinhid}`).then(res => res.data.data),

     getDataInNhanXetTheoMon: (kydanhgia, lopid, monhocid) => axios.get(`${apiUrl}/auth/GiaoVien_TT22_GetDataInNhanXetTheoMonHoc/${kydanhgia}/${lopid}/${monhocid}`).then(res => res.data.data),
     getDataInKetQuaHocTap: (kydanhgia, lopid, monhocid) => axios.get(`${apiUrl}/auth/GiaoVien_TT22_GetDataInKetQuaHocTap/${kydanhgia}/${lopid}/${monhocid}`).then(res => res.data.data),
     getListMonHocLop: (lopid,kydanhgia) => axios.get(`${apiUrl}/auth/GiaoVien_GetDanhSachMonHocLop/${lopid}/${kydanhgia}`).then(res => res.data.data),
}

export default tApi;
