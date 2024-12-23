import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT; 

// Đăng nhập người dùng
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email có tồn tại trong hệ thống không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Kiểm tra mật khẩu có đúng không
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Tạo token JWT sau khi xác thực thành công
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '24h' });

    // Lấy thông tin người dùng để trả về (ẩn mật khẩu)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role
    };

    // Trả về người dùng và token
    res.status(200).json({ user: userResponse, token });
  } catch (error) {
    console.error('Login Error:', error);  // Ghi lại lỗi để tiện theo dõi
    res.status(500).json({ error: 'Login failed due to internal server error' });
  }
};

// Đăng ký người dùng
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 8);

    // Gán role mặc định là 'customer' (Không cho phép người dùng tự chọn role)
    const role = 'customer';

    // Tạo đối tượng người dùng mới và lưu vào cơ sở dữ liệu
    const user = new User({ name, email, password: hashedPassword, phone, address, role });
    await user.save();

    // Tạo token JWT cho người dùng mới
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '24h' });

    // Trả về người dùng và token
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration Error:', error);  // Ghi lại lỗi để tiện theo dõi
    res.status(400).json({ error: 'Registration failed' });
  }
};
