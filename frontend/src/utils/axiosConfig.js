import axios from 'axios';

// Lấy giá trị từ biến môi trường
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'; // Fallback to localhost if the env variable is not set

console.log(API_BASE_URL, "asdakds")  // Debugging, remove after confirmation

// Tạo một instance axios mới
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Cấu hình base URL cho tất cả các request
  headers: {
    'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu dạng JSON
  },
});

// Interceptor để thêm token vào header của mỗi request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
    }
    return config; // Tiến hành request
  },
  (error) => {
    return Promise.reject(error); // Nếu có lỗi trong quá trình request, trả lỗi
  }
);

// Interceptor xử lý lỗi 401 (Token hết hạn hoặc không hợp lệ)
apiClient.interceptors.response.use(
  (response) => response, // Nếu request thành công, trả về response
  (error) => {
    if (error.response?.status === 401) {
      // Nếu token hết hạn (401), thực hiện logout và điều hướng đến trang login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      window.location.href = '/login'; // Điều hướng đến trang login
    }
    return Promise.reject(error); // Nếu có lỗi khác, trả về lỗi
  }
);

export default apiClient;
