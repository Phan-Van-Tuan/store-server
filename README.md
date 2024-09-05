# **Store Server**

## Hướng Dẫn Cài Đặt

Để cài đặt ứng dụng, hãy thực hiện các bước sau:

1. Cài đặt ứng dụng:

```bash
   git clone https://github.com/Phan-Van-Tuan/store-server.git
```

2. Cài đặt các phụ thuộc:

```bash
   npm install
```

3. Khởi động ở chế độ nhà phát triển:

```bash
   npm run dev
```

## Các API

| Attempt   | Method | Enpoint                                   | Request         | Response                  |
| --------- | ------ | ----------------------------------------- | --------------- | ------------------------- |
| Đăng kí   | POST   | http://localhost:3003/api/v1/auth/signup  | 283             |                           |
| Đăng Nhập | POST   | http://localhost:3003/api/v1/auth/signin  | email, password | accessToken, refreshToken |
| Đăng Xuất | POST   | http://localhost:3003/api/v1/auth/signout | 283             |                           |
