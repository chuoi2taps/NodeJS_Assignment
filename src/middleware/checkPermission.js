import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;


export const checkPermission = async (req, res, next) => {
  try {
    // kiểm tra xem user có đăng nhập không
    // if (!req.headers.authorization) {
    //   throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
    // }
    // lấy jwt token từ header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Ban chưa đăng nhập",
      });
    }
    jwt.verify(token, SECRET_CODE, async function (err, decoded) {
      if (err) {
        if ((err.name = "TokenExpiredError")) {
          return res.status(400).json({
            message: err.message || "Token het han",
          });
        }
        if ((err.name = "JsonWebTokenError")) {
          return res.status(400).json({
            message: err.message || "Token không hợp lệ!",
          });
        }
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(400).json({
          message: "User khong co trong he thong!",
        });
      }

      if (user.role !== "admin") {
        return res.status(400).json({
          message: "Bạn không có quyền thực hiện hành động này!",
        });
      }
      req.user = user;
      next();
    });
    // xác thực jwt token
    // const { _id } = jwt.verify(token, "123456", async (err, payload) => {
      
    // });
    // const user = await User.findById(_id);
    // // kiểm tra xem user có quyền admin không
    // if (user.role != "admin") {
    //   throw new Error("Bạn không có quyền để thực hiện hành động này");
    // }
    // // lưu thông tin user vào request để sử dụng cho các middleware khác
    // req.user = user;
  } catch (error) {
   return res.status(500).json({ message: "Đã có lỗi xảy ra !" });
  }
};
