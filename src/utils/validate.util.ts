export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// Mật khẩu (ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số):
export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
/*
^[a-zA-Z0-9_.-]+: Bắt đầu với chữ cái, số hoặc các ký tự _, ., -.
(?: [a-zA-Z0-9_.-]+)*: Cho phép khoảng trắng và tiếp theo là các ký tự chữ cái, số, hoặc các ký tự _, ., -. Điều này cho phép nhiều từ cách nhau bởi khoảng trắng.
* cho phép khoảng trắng xuất hiện nhiều lần giữa các từ.
*/

export const regexUsername = /^[a-zA-Z0-9_.-]+(?: [a-zA-Z0-9_.-]+)*$/;
