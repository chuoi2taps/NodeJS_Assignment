import User from "../models/user";
import { signInSchema, signupSchema } from "../schemas/auth";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_CODE } = process.env;

export const signup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const {error} = signupSchema.validate(req.body,{abortEarly:false});

        if(error){
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"Tài khoản đã tồn tại"
            })
        }
        //Dùng bcrypt để mã hóa 
        const hashedPassword = await bcrypt.hash(password,10);
        //Tạo user mới với password được mã hóa idk
        const user = await User.create({
            name,
            email,
            password:hashedPassword,    
        })
        //Xóa bỏ password trước khi gửi lại thông báo phía client
        //const token = jwt.sign({ _id: user._id }, "123456", { expiresIn: "1d" });
        user.password = undefined;
        res.status(201).json({
            message:"Đã tạo tài khoản thành công",
            user,
            //accessToken:token,
        })
    }
    catch(error){
        return res.status(404).json({
            message:error,
        })
    }
}


export const signIn = async (req, res) => {
  try {
    const { error } = signInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const { email, password } = req.body;

    const haveUser = await User.findOne({ email });
    if (!haveUser) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại!",
      });
    }
    const checkPassword = await bcrypt.compare(password, haveUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Mật khẩu không khớp!",
      });
    }
    const token = jwt.sign(
      {
        id: haveUser._id,
      },
      SECRET_CODE,
      { expiresIn: "1d" }
    );
    haveUser.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      accessToken: token,
      user: haveUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi server",
    });
  }
};
export const getAllUser = async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        res.status(404).json({
          message: "Không có người dùng nào",
        });
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };
  