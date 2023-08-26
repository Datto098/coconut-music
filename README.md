# Coconut Music - Trang web nghe nhạc trực tuyến

Chào mừng bạn đến với trang web nghe nhạc trực tuyến! Dưới đây là một hướng dẫn sơ bộ về cách sử dụng các chức năng
chính của trang web. <br>

![Trang chủ](/public/images/homepage-dark.png) ![Trang chủ](/public/images/homepage-light.png)

## API Documentation

### Chức năng người dùng

#### Đăng nhập

Endpoint: `POST /api/users/login`

Để đăng nhập, bạn cần gửi yêu cầu POST đến đường dẫn trên với dữ liệu sau:

```javascript
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

#### Đăng ký

Endpoint: `POST /api/users/sign-up`

Để đăng ký tài khoản, bạn cần gửi yêu cầu POST đến đường dẫn trên với dữ liệu sau:

```javascript
{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}
```

### Chức năng nghe nhạc

- Chú ý param mặc định sẽ có dang: `?\_limit=12`

#### Bài hát trending

Endpoint: `GET /api/music/trending?\_limit=12`

Để lấy danh sách các bài hát đang trending, bạn có thể gửi yêu cầu GET đến đường dẫn trên.

#### Bài hát top lượt xem

Endpoint: `GET /api/music/top-view?\_limit=12`

Để lấy danh sách các bài hát có lượt xem cao nhất, bạn có thể gửi yêu cầu GET đến đường dẫn trên.

#### Bài hát yêu thích

Endpoint: `GET /api/music/favorite?\_limit=12`

Để lấy danh sách các bài hát trong danh sách yêu thích của bạn, bạn có thể gửi yêu cầu GET đến đường dẫn trên.

#### Bài hát mới nổi

Endpoint: `GET /api/music/new-music?\_limit=12`

Để lấy danh sách các bài hát mới nổi, bạn có thể gửi yêu cầu GET đến đường dẫn trên.

## Bắt đầu sử dụng

Để bắt đầu sử dụng trang web nghe nhạc trực tuyến, bạn cần thực hiện các bước sau:

1.Đăng ký tài khoản hoặc đăng nhập nếu bạn đã có tài khoản.

2.Khám phá các bài hát theo các chức năng như trending, top lượt xem, yêu thích, mới nổi.

3.Thêm bài hát vào danh sách phát yêu thích của bạn hoặc tạo danh sách phát riêng của mình.

4.Tải lên các bài hát yêu thích của bạn để có thể nghe chúng mọi lúc mọi nơi.

Trang web chính: [Trang chủ](https://coconut-music.vercel.app)

## Liên hệ

Nếu bạn gặp bất kỳ vấn đề hoặc có câu hỏi, vui lòng liên hệ với chúng tôi qua email: dat61222@gmail.com

Chúng tôi rất hân hạnh được hỗ trợ bạn!
