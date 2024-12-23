import User from "../models/user.js";
import bcrypt from 'bcryptjs';

// Tạo người dùng mới (chỉ dành cho Admin)
export const createUser = async (req, res, next) => {
  try {
    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Tạo người dùng mới
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    // Lưu người dùng
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "Người dùng mới đã được tạo thành công.",
      user: savedUser,
    });
  } catch (err) {
    next(err);
  }
};

// Phân quyền cho người dùng (chỉ Admin)
export const assignRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    // Kiểm tra vai trò có hợp lệ hay không
    const validRoles = ["admin", "assistant", "customer"]; // Bạn có thể tùy chỉnh danh sách này
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Vai trò không hợp lệ." });
    }

    // Cập nhật vai trò người dùng
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { role } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    res.status(200).json({
      message: "Vai trò người dùng đã được cập nhật.",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { newPassword, ...updateFields } = req.body;

    let updatedData = { ...updateFields };

    // Nếu người dùng gửi mật khẩu mới, mã hóa mật khẩu
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      updatedData.password = hashedPassword;
    }

    // Cập nhật người dùng trong cơ sở dữ liệu
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({
      message: "Thông tin người dùng đã được cập nhật.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Xem thông tin cá nhân người dùng và lịch sử đặt phòng
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password") // Không trả về mật khẩu
      .lean(); // Trả kết quả dưới dạng object thuần JS (tùy chọn)

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Lấy booking history trực tiếp từ user.booking_history
    const bookingHistory = user.booking_history || [];

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      bookingHistory,
    });
  } catch (error) {
    next(error);
  }
};

// Xem danh sách tất cả người dùng
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
