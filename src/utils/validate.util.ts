export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// Mật khẩu (ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số):
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// Regex này cho phép tên người dùng chỉ chứa các ký tự chữ cái (a-z, A-Z), số (0-9), dấu gạch dưới (_), dấu chấm (.), và dấu gạch ngang (-). Tên người dùng không có khoảng trắng và không bắt đầu bằng ký tự đặc biệt.
export const regexUsername = /^[a-zA-Z0-9_.-]+$/;
