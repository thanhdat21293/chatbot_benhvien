# Document những phần Đạt đã sửa trong Techmaster.vn

## Video thumbnail (Code này bên video-server)

Lúc đầu là sửa dụng fs để đọc image hiển thị ra ngoài.

Bây giờ đã sửa lại là sẽ trả về tên ảnh rồi ở nginx cấu hình tới đường dẫn ảnh để hiển thị.

- Router này chỉ dùng cho frontend vì nó trả về duy nhất ảnh chính
```
 /* Chi dung cho frontend */
"/media/thumbnail_image/:mediaId": {
    get: {
        handler: controller.get_thumbnail_of_video
    }
},
```

- Router này dùng cho backend để quản lý

```
"/media/thumbnail/:mediaId": {
    get: {
        handler: controller.get_thumbnails_of_video
    },
    post: {
        handler: controller.update_thumbnails
    },
    delete: {
        handler: controller.remove_thumbnail
    }
},
```

- Code xử lý

```
video-server/features/media/frontend/controllers/media.js
```

Nếu cần ảnh thì dùng ajax để gọi vào 2 đường dẫn trên thì nó sẽ trả về tên + đuôi ảnh.

## Fake reviews  (Code này bên techmaster)

Trong bảng **course_rating** tạo thêm 1 cột **info** JSON

```
{image: 'url', name: ''}
```

#### Backend

code quản lý fake review trong Backend

```
Router: features/courses/backend/route.js 376
Code xử lý: features/courses/backend/controllers/fakereviews.js
```

Khi thêm 1 fake review thì **created_by** = 0.

Và nếu là fake review thì sẽ có phần info được nhập từ trang admin (Create new button ở trong trang fake review)

```
Tên: bắt buộc
Đánh giá: mặc định là 5
Bình luận: Không bắt buộc
image: được lấy random 1 trong các ảnh có sẵn
```

Khi sửa:

- Đối với review thật: không sửa được tên

- Đối với fake review: Sửa thoải mái nhưng ảnh vẫn như cũ

#### Frontend

- Nếu không có đánh giá thì mặc định là 1 đánh giá 5 sao

- Nếu có đánh giá thì điểm trung bình, sao sẽ tính như bình thường