import axiosClient from "./axiosClient";

const loginApi = {
    login(data) {
        const url = '/accounts/login_by_system_account';
        return axiosClient.post(url, data);
    },
    loginByGoogle(data) {
        const url = '/v1/login?token=' + data;
        return axiosClient.post(url, data);
    },
};

export default loginApi;
