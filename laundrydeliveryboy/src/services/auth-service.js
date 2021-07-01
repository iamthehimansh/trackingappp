import request from '../utils/fetch';

export const loginWithEmail = (data) => request.post('login', data);

export const signup = (data) => request.post('sign_up', data);


export const updateProfile = (data) => request.post('update_profile', data);

export const homeData = (id) => request.get('total_order_assigned/' + id);

export const orderList = (data) => request.post('order_list', data);

export const orderDetails = (data) => request.post('order_details', data);

export const statusUpdate = (data) => request.post('update_status', data);

export const orderHistory = (data) => request.post('order_history', data);

export const updatePassword = (data) => request.post('change_password', data);

export const forgetPasswordOtp = (data) => request.post('forget_password', data);

export const validatePasswordOtp = (data) => request.post('validate_password_otp', data);

export const changeForgetPassword = (data) => request.post('change_forget_password', data);

export const getTermsCondition = (data) => request.post('check_treams_condition', data);

export const saveQuery = (data) => request.post('save_query', data);






export const updateCustomer = (user_id, data, token) =>
  request.put(
    `/mobile-builder/v1/customers/${user_id}`,
    JSON.stringify(data),
    token,
  );
