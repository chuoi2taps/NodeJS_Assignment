import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": 'Trường "tên" không được để trống',
        "any.required": 'Trường "tên" là bắt buộc',
      }),
    email: Joi.string().email().required().messages({
        "string.email":"Email không hợp lệ",
        "string.empty":"Email không được để trống",
        "any.required":"Hãy nhập email",
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty":"Mật khẩu không được để trống",
        "any.required":"Hãy nhập mật khẩu",
        "string.min":"Mật khẩu tối thiểu 6 ký tự",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only":"Mật khẩu không giống nhau, hãy nhập lại",
        "string.empty":"Xác nhận mật khẩu không được để trống",
        "string.required":"Hãy nhập xác nhận mật khẩu",
    })
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email không hợp lệ",
        "string.empty": "Email không được để trống",
        "any.required": "Hãy nhập gmail vào",
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Ai cho mày để trống mật khẩu",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu bắt buộc",
    })
})