import * as yup from 'yup'

// login validation
const LoginValidation = yup.object().shape({
    email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email")
        .trim(),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(20, "Mật khẩu không được vượt quá 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất một chữ số"),
});


// register validation
const RegisterValidation = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email")
    .trim(),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được vượt quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất một chữ số"),

  fullName: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .max(20, "Họ tên không được vượt quá 20 ký tự")
    .matches(/^[a-zA-Z ]*$/, "Họ tên chỉ được chứa chữ cái"),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .max(20, "Họ tên không được vượt quá 20 ký tự")
    .matches(/^[a-zA-Z ]*$/, "Họ tên chỉ được chứa chữ cái"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email").trim(),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu cũ")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được vượt quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất một chữ số"),

  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được vượt quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất một chữ số"),

  confirmPassword: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được vượt quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất một chữ số")
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu nhập lại không khớp"),
});

export { 
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation 
};
