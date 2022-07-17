import axiosClient from "./axiosClient";

// const getListBusiness = {
//     getAll : () => {
//         const url = '/products';
//         return axiosClient.get(url, { params });
//     },
// }
// export default getListBusiness;

const getListBusiness = () => {
    const url = 'http://13.229.213.34/api/v1/businesses'
    return axiosClient.get(url);
};
export default getListBusiness;