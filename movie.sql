-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 17, 2022 lúc 05:01 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `movie`
--
CREATE DATABASE IF NOT EXISTS `movie` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `movie`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `billing`
--

CREATE TABLE `billing` (
  `id` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `confirmed` bit(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `plan_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `created_at`, `name`, `updated_at`) VALUES
(1, '2022-12-17 16:39:39', 'Khoa học viễn tưởng', '2022-12-17 16:39:39'),
(2, '2022-12-17 16:40:17', 'Tội phạm', '2022-12-17 16:40:17'),
(3, '2022-12-17 16:40:30', 'Lịch sử', '2022-12-17 16:40:30'),
(4, '2022-12-17 16:40:39', 'Thể thao', '2022-12-17 16:40:39'),
(5, '2022-12-17 16:40:47', 'Viễn Tây', '2022-12-17 16:40:47'),
(6, '2022-12-17 16:40:53', 'Kiếm hiệp', '2022-12-17 16:40:53'),
(7, '2022-12-17 16:40:59', 'Cổ trang', '2022-12-17 16:40:59'),
(8, '2022-12-17 16:41:09', 'Hành động', '2022-12-17 16:41:09'),
(9, '2022-12-17 16:41:18', 'Phiêu lưu', '2022-12-17 16:41:18'),
(10, '2022-12-17 16:41:26', 'Bí ẩn', '2022-12-17 16:41:26'),
(11, '2022-12-17 16:41:31', 'Hài kịch', '2022-12-17 16:41:31'),
(12, '2022-12-17 16:41:39', 'Kinh dị', '2022-12-17 16:41:39'),
(13, '2022-12-17 16:41:44', 'Giật gân', '2022-12-17 16:41:44'),
(14, '2022-12-17 16:41:51', 'Kỳ ảo', '2022-12-17 16:41:51'),
(15, '2022-12-17 16:41:58', 'Chính kịch', '2022-12-17 16:41:58'),
(16, '2022-12-17 16:42:03', 'Lãng mạng', '2022-12-17 16:42:03'),
(17, '2022-12-17 16:43:03', 'Hoạt hình', '2022-12-17 16:43:03'),
(18, '2022-12-17 16:43:12', 'Tài liệu', '2022-12-17 16:43:12'),
(19, '2022-12-17 16:43:20', 'Khoa học', '2022-12-17 16:43:20'),
(20, '2022-12-17 16:43:31', 'Dành cho trẻ em', '2022-12-17 16:43:31'),
(21, '2022-12-17 16:43:39', 'Dành cho người lớn', '2022-12-17 16:43:39'),
(22, '2022-12-17 16:43:44', 'Gia đình', '2022-12-17 16:43:44'),
(23, '2022-12-17 16:43:49', 'Giáo dục', '2022-12-17 16:43:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat`
--

CREATE TABLE `chat` (
  `id` bigint(20) NOT NULL,
  `message` longtext DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `chat`
--

INSERT INTO `chat` (`id`, `message`, `user_id`, `created_at`) VALUES
(4, 'hello', 1, '2022-12-17 20:17:55'),
(5, 'Nguyễn Phú Quí – 51900192 Nguyễn Quốc Thái – 51900210 Nguyễn Thành Luân – 51900707 Nguyễn Vinh Tiếng - 51900713', 1, '2022-12-17 20:18:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `movies`
--

CREATE TABLE `movies` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `img_sm` varchar(255) DEFAULT NULL,
  `img_title` varchar(255) DEFAULT NULL,
  `limit_age` int(11) NOT NULL,
  `title` longtext DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `views` bigint(20) DEFAULT NULL,
  `vip` bit(1) NOT NULL,
  `year` varchar(255) DEFAULT NULL,
  `series_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `movies`
--

INSERT INTO `movies` (`id`, `active`, `created_at`, `description`, `img_sm`, `img_title`, `limit_age`, `title`, `trailer`, `updated_at`, `video`, `views`, `vip`, `year`, `series_id`) VALUES
(1, b'1', '2022-12-17 16:56:03', 'Hoàng Quyền là bộ phim cổ trang lấy bối cảnh những năm 1950 kể về thời trị vì của Nữ hoàng Elizabeth II. Bộ phim kể về cuộc đời của Nữ hoàng trẻ từ năm 1947, khi bà 25 tuổi, trải qua cuộc hôn nhân vào đầu những năm 40 tuổi. “Hoàng Quyền” đã được các nhà phê bình đón nhận rất tích cực và đã được đề cử cho hơn 50 giải thưởng. Bộ phim đạt số điểm khổng lồ 98% trên Rotten Tomatoes và 91% trên Metacritic. “Hoàng Quyền” cũng được ca ngợi vì mô tả chính xác về gia đình Hoàng gia và các sự kiện thời đó.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671270961636imgSm5.png?alt=media&token=9a7bc487-3906-460a-9b00-5e9332050257', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671270961634imgTitle5.png?alt=media&token=682a5497-b3d4-4e99-9d8c-f1a9a3f29a1b', 12, 'Hoàng Quyền', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671270961636trailertrailer.mp4?alt=media&token=3020b876-937d-4427-951b-d6e1202d33df', '2022-12-17 16:56:03', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671270961637videotrailer.mp4?alt=media&token=040c68e9-0fe1-4d18-bfdb-b2d0037b88b3', 0, b'1', '2022', 1),
(2, b'1', '2022-12-17 16:56:58', 'Cậu Bé Mất Tích là một loạt phim truyền hình kinh dị, khoa học viễn tưởng của Mỹ do Duffer Brothers sáng tạo, viết kịch bản và đạo diễn. Câu chuyện kể về một nhóm trẻ vị thành niên tìm thấy một cậu bé mất tích với khả năng kỳ lạ và đang bị truy đuổi bởi một cơ quan chính phủ. Bộ phim này hoàn toàn phù hợp cho những ai yêu thích sự hoài cổ và khoa học viễn tưởng của thập niên 80. “Cậu Bé Mất Tích” đã được giới phê bình đánh giá cao và đã giành được nhiều giải thưởng, bao gồm cả giải Quả cầu vàng.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271016004imgSm2.png?alt=media&token=f17d13d3-60fa-43bd-8b09-438f9ece5263', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271015965imgTitle2.png?alt=media&token=8c9eaa94-435c-43e7-b07b-d970df023580', 10, 'Stranger Things', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271016005trailertrailer.mp4?alt=media&token=ce61a5bc-6204-4ac1-89b5-80887679d429', '2022-12-17 16:56:58', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271016005videotrailer.mp4?alt=media&token=6e39cb65-3637-459e-ac75-c670d32475b9', 0, b'1', '2022', 2),
(3, b'1', '2022-12-17 16:58:21', 'Nếu như bạn là một mọt phim chính hiệu thì chắc chắn không thể nào không biết đến vụ trộm cướp thế kỷ gây sốt toàn cầu của Tây Ban Nha. Trong bài viết này, Coolmate muốn chia sẻ đến cho độc giả về nội dung 5 phần liên quan đến 5 vụ cướp lớn tại những điểm trọng yếu của quốc gia như Ngân hàng Tây Ban Nha, xưởng in tiền Tây Ban Nha,...', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271098441imgSm3.png?alt=media&token=a97a8ef6-d89d-4f1a-b547-511100d64b4a', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271098440imgTitle3.png?alt=media&token=631b3474-2e6e-46b4-9345-8a40808c2a3b', 14, 'Money Heist', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271098442trailertrailer.mp4?alt=media&token=9d6e3b17-306b-451b-bc37-39c054559ae6', '2022-12-17 16:58:21', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271098443videotrailer.mp4?alt=media&token=5cafbceb-e03c-4f25-a38a-48a685a5a63d', 0, b'1', '2022', 6),
(4, b'1', '2022-12-17 17:05:09', 'Cobra Kai là một bộ phim khắc họa lại cuộc hội ngộ đầy thú vị của hai nhân vật đối thủ sau ba mươi năm kể từ khi ra mắt series phim huyền thoại Karate Kid trong sự kiện 1984 All Valley Karate Tournament. ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271506921imgSm1.png?alt=media&token=a43f2a31-bedc-4259-8861-a02b22c5fd4e', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271506919imgTitle1.png?alt=media&token=750490bd-d935-4d98-9191-33c65a8318cf', 10, 'Cobra Kai', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271506921trailertrailer.mp4?alt=media&token=61437b4d-2479-4c21-bafd-ad3e04611cb6', '2022-12-17 17:05:09', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271506922videotrailer.mp4?alt=media&token=c8ccf825-0eae-4eac-bd2d-db93ca69f585', 0, b'1', '2021', 5),
(5, b'1', '2022-12-17 17:07:02', 'Thợ săn quái vật là series phim Dark Fantasy vô cùng đình đám của đạo diễn người Ba Lan Andrzej Sapkowski. Bộ phim xoay quanh bối cảnh đậm chất Trung Cổ, tất cả các Witcher sau khi trải qua quá trình huấn luyện vô cùng khắt khe thì cũng có thể đi khắp nơi để tiêu diệt lũ quái vật quấy nhiễu đời sống của người dân.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271620391imgSm7.png?alt=media&token=3fcd2d6f-46af-4f89-aed1-30e11c0e9fbc', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271620390imgTitle7.png?alt=media&token=ef7662d0-33ce-4f0a-a28f-967f2ae2941f', 0, 'The Witcher', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271620392trailertrailer.mp4?alt=media&token=0868817f-e628-49bc-994a-6c5d166b4357', '2022-12-17 17:07:02', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271620392videotrailer.mp4?alt=media&token=cd4ab6eb-96a6-47cd-89cc-9ced024a04a0', 0, b'1', '2020', 7),
(6, b'1', '2022-12-17 17:08:22', 'Bộ phim là một câu chuyện xoay quanh hành trình của cô bé mồ côi Beth Harmon đến với ngôi vị nữ hoàng của cờ vua thế giới khi mới chỉ 20 tuổi. Nếu như bạn có suy nghĩ rằng khai thác chủ đề về cờ vua có vẻ khô khan, nhàm chán với những luật lệ, quy tắc khó hiểu thì chắc chắn khi đón xem bộ phim này bạn sẽ có những suy nghĩ khác tích cực hơn đấy nhé! Bộ phim này chú trọng hơn vào cuộc sống của nữ chính, thần đồng cờ vua đang phải vật lộn trong luật lệ trọng nam khinh nữ. Bộ phim tuổi mới lớn về nữ hoàng cờ vua lắm tài nhiều tật, nghiện ngập nhưng lại ẵm trọn điểm trên thang Rotten Tomatoes. Chắc chắn bộ phim này sẽ giúp cho bạn có thể xua tan mệt mỏi sau một ngày làm dài làm việc.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271700712imgSm8.png?alt=media&token=810ecd8b-05b9-434c-adc8-6db86a07a6e0', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271700711imgTitle8.png?alt=media&token=e902f905-fe08-4435-bf0e-f80e1dc0ebb2', 8, 'The Queen’s Gambit ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271700712trailertrailer.mp4?alt=media&token=2fcb7dc0-4013-41bc-91c3-70bba6e34f87', '2022-12-17 17:08:22', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271700712videotrailer.mp4?alt=media&token=6f56f5d8-da04-49b7-ac4f-146392e4a9f6', 0, b'1', '2022', 8),
(8, b'1', '2022-12-17 17:12:12', 'Lupin được mệnh danh là một siêu phẩm “siêu đạo chích” lấy cảm hứng từ tên trộm huyền thoại trong loạt truyện nổi tiếng của Maurice Leblanc. Nam chính trong bộ phim này chính là Assane Diop do Omar Sy thủ vai với khả năng biến hóa cùng hóa trang khôn lường với quy tắc chỉ trộm của những tên nhà giàu trên hành trình minh oan cho người cha của mình.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271930010imgSm10.png?alt=media&token=8d77e220-371b-46d5-8530-467bfebf7389', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271930008imgTitle10.png?alt=media&token=10f056f0-15da-44b2-96c4-de355c785e11', 0, 'Lupin', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271930010trailertrailer.mp4?alt=media&token=7e40eb15-77e6-4480-9095-8170dda5753b', '2022-12-17 17:12:12', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671271930011videotrailer.mp4?alt=media&token=1662db98-3877-4258-bfd7-afe8e0e3b29f', 0, b'1', '2021', 10),
(9, b'1', '2022-12-17 17:17:09', 'Bộ phim Squid Game mới ra mắt vào năm 2021 xung quanh 456 người chơi đang mắc kẹt trong một khu vực cách biệt. Điểm chung của tất cả các người chơi chính là họ đều mắc kẹt về tài chính và có những câu chuyện khác nhau. Trải qua 6 trò chơi dân gian tuổi thơ, người thua cuộc phải trả giá bằng chính mạng sống của mình, ngược lại người thắng cuộc sẽ nhận được toàn bộ số tiền.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272228223imgSm11.jpg?alt=media&token=8dab9251-b976-42e7-8b4c-16cb2fb34970', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272228222imgTitle11.jpg?alt=media&token=1e893899-05d4-4313-9b0d-bdca6696c5a6', 0, 'Squid Game', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272228224trailertrailer.mp4?alt=media&token=d8b79e11-03bf-443f-9fce-93c4f8762e43', '2022-12-17 17:17:09', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272228224videotrailer.mp4?alt=media&token=f9344086-9417-464a-8ef7-e2c3e13329f5', 0, b'1', '2020', 11),
(10, b'1', '2022-12-17 17:19:53', 'Sex Education là một series phim hài hước, mặn mòi về giáo dục giới tính dành cho tuổi mới lớn được khán giả yêu thích nhất. Nội dung phim xoay quanh cuộc sống học đường và đời sống tình dục của những cô cậu mới lớn. Bộ phim phản ánh những vấn đề nhạy cảm nhất, truyền tải đến khán giả một cách thẳng thẳn giúp cho các bạn trẻ có cái nhìn đúng đắn hơn về Sex. ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272387022imgSm12.png?alt=media&token=33ad8904-5b77-47ee-8629-4f905f0e7bba', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272387021imgTitle12.png?alt=media&token=f801dcff-6db9-4cb0-b36c-91da309ed9eb', 0, 'Sex Education', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272387022trailertrailer.mp4?alt=media&token=776930d0-9694-431d-a7ce-d1156518ba04', '2022-12-17 17:19:53', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272387023videotrailer.mp4?alt=media&token=4afad4d6-d952-4698-b4c6-a5cbd412a1b5', 0, b'1', '2019', 12),
(12, b'1', '2022-12-17 17:26:06', 'Uncut Gems là một trong những bộ phim có điểm trên IMDB khá cao, đạt ngưỡng 8.0 trong số những phim công chiếu trên Netflix năm 2019. Bộ phim tập hợp các sự kiện mà người bán trang sức Howard Ratner sống tại New York. Nhân vật chính Ratner đặt cược rủi ro chi những người nổi tiếng cũng như kinh doanh trang sức, anh ta phải đối mặt với những khoản nợ khổng lồ. Vào một ngày nọ, khi bói toán được đặt lên hàng đầu, tuy nhiên để có thể lấy được số tiền này, tất cả mọi người cần phải hành động như những người đáng tin cậy. Khi tham gia trò chơi, anh ta cần phải giữ mối quan hệ đối với những người xung quanh. Chắc chắn bạn nên xem bộ phim này bởi lẽ nó đã góp mặt vào những bộ phim nổi tiếng của Netflix trong những năm gần đây.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272764120imgSm14.png?alt=media&token=7ce858d6-e426-4cc6-8c43-8222e42b37d1', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272764075imgTitle14.png?alt=media&token=6d820181-0cb4-40b1-b3ee-e864c5386c97', 0, 'Uncut Gems', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272764120trailertrailer.mp4?alt=media&token=68da1f2e-479a-49f2-ab59-7fbb8f323168', '2022-12-17 17:26:06', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272764120videotrailer.mp4?alt=media&token=63def6b4-69c9-4c25-98f3-6da7db4106ae', 0, b'0', '2021', 14),
(13, b'1', '2022-12-17 17:27:45', 'Một trong những sản phẩm đầy tham vọng nhất năm 2019 do đạo diễn Martin Scorsese đem đến chính là The Irishman. Bộ phim tập trung vào câu chuyện người đàn ông tên Frank Sheeran - một kẻ tấn công của băng đảng Mafia. Khi đó, Frank Sheeran cũng làm việc như những sĩ quan khác tại International Brotherhood of Teamsters, đã tham gia vào nhiều tội ác giết người hàng loạt cho băng đảng mafia này.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272864022imgSm15.png?alt=media&token=7f095eb2-b0af-492f-83b9-ef2311d64371', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272864021imgTitle15.png?alt=media&token=d59496c0-6c23-466b-b1a6-37da11cda4a9', 10, 'The IrishMan', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272864023trailertrailer.mp4?alt=media&token=d46c7da2-647d-415a-80d8-efff98ea5c5d', '2022-12-17 17:27:45', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671272864024videotrailer.mp4?alt=media&token=e49d461c-c0b4-4359-a05a-11c1559715b1', 0, b'0', '2019', 15),
(14, b'1', '2022-12-17 17:31:41', 'Friends From College là loạt phim hài về một nhóm bạn gặp nhau ở trường đại học và hiện đang đối mặt với cuộc sống sau tuổi trung niên. Bộ phim được đánh giá cao bởi câu chuyện thú vị và các nhân vật thú vị không kém. “Friends From College” là một bộ phim hay cho những ai yêu thích thể loại hài vui nhộn.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273096198imgSm16.png?alt=media&token=a5ba3cb6-83b8-4c86-a91a-9e4a80f5de91', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273096197imgTitle16.png?alt=media&token=a261aea8-633f-445b-90a4-30d6d7e44d90', 6, 'Những Người Bạn Từ Trường Đại Học', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273096198trailertrailer.mp4?alt=media&token=5c6c3aa0-17d2-4735-9813-30f13941b109', '2022-12-17 17:31:41', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273096199videotrailer.mp4?alt=media&token=3d6d524b-8ea6-47e6-adfc-7fc6a15fe41d', 0, b'0', '2021', 3),
(15, b'1', '2022-12-17 17:32:49', 'Bojack Horseman là một loạt phim hoạt hình hài hước kể về một chú ngựa hình người đang cố gắng trở nên tốt đẹp hơn. Bộ truyện được khen ngợi vì ý tưởng độc đáo và những nhân vật vô cùng thú vị. “Bojack Horseman” là một bộ phim hay cho những ai yêu thích các bộ phim hoạt hình hoặc phim hài hay. Nếu bạn đang tìm kiếm một bộ phim nhẹ nhàng nhưng những khá chất thì đây là lựa chọn hoàn hảo dành cho bạn. Nhược điểm duy nhất của bộ phim này là nó hoàn toàn bằng tiếng Anh.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273167980imgSm17.png?alt=media&token=83e861ee-8e16-4221-8f80-40235b1d8985', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273167979imgTitle17.png?alt=media&token=16410965-439b-45fb-854a-fcb869d9da87', 10, 'Bojack Horseman', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273167980trailertrailer.mp4?alt=media&token=67875ee9-24ed-447c-84ca-e4a937d03070', '2022-12-17 17:32:49', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273167980videotrailer.mp4?alt=media&token=ec287981-0b27-45d5-b58e-4638a2061119', 0, b'1', '2022', 4),
(16, b'1', '2022-12-17 17:38:30', 'Bộ phim Dòng tộc Bridgerton được chuyển thể từ bộ tiểu thuyết lãng mạn ăn khách cùng tên của Julia Quinn. Xoay quanh câu chuyện của nhân vật chính là Daphne Bridgerton - con gái cả trong đại gia đình nhà Bridgerton quyền quý. Trong buổi ra mắt thượng lưu, Daphne và chàng công tước xứ Hastings vô tình phải lòng nhau.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273507202imgSm9.png?alt=media&token=0ba2581a-f896-4b09-8d94-6fbca5f0dde8', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273507201imgTitle9.png?alt=media&token=1e3f0bd0-f382-4eb0-9856-0cc10a770cb7', 10, 'Bridgerton ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273507202trailertrailer.mp4?alt=media&token=88301f42-5d7b-4e82-8135-9544ccb70926', '2022-12-17 17:38:30', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273507203videotrailer.mp4?alt=media&token=5d6c631f-8ec5-4786-ac7a-b289e2a0d82a', 0, b'0', '2021', 9),
(17, b'1', '2022-12-17 17:41:18', 'Bộ phim The Umbrella Academy được đầu tư sản xuất chính bởi Netflix, với giả tưởng về 7 đứa trẻ được nhận nuôi bởi tỷ phú kiêm nhà thám hiểm Reginald Hargreeves lập dị. Tại học viện này đào tạo biệt đội siêu anh hùng, họ hội ngộ lại nhau sau khi người cha nuôi qua đời.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273675656imgSm13.png?alt=media&token=b2e83c33-a8cd-4807-8dd8-2b37845b38ee', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273675654imgTitle13.png?alt=media&token=d598269b-9f73-4300-86da-53fe9ad2042e', 10, 'The Umbrella Academy', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273675657trailertrailer.mp4?alt=media&token=22040f88-a025-42c2-8aa2-24722ef8c9f1', '2022-12-17 17:41:18', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671273675658videotrailer.mp4?alt=media&token=a3168555-e4de-4418-a980-d73a805713ec', 0, b'0', '2021', 13),
(18, b'1', '2022-12-17 18:01:54', 'Thư Ký Kim Sao Thể xoay quanh mối tình của Kim Mi So (Park Min Young) và Lee Young Joon (Park Seo Joon). Vào một ngày, cô thư ký tài năng Miso thông báo rằng cô sẽ từ chức, lúc này phó chủ tịch Young Joon mới nhận ra mình đã rất thích Mi So. Vì thế, anh đã quyết định làm mọi cách để giữ Mi So ở lại bên cạnh mình.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671274910812imgSm18.png?alt=media&token=0ecc5b0c-8b13-4128-9a1e-43c07da22626', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671274910811imgTitle18.png?alt=media&token=3d6d30e4-67c0-4084-9511-8c0a6afd6732', 12, 'Thư Ký Kim Sao Thế', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671274910813trailertrailer.mp4?alt=media&token=1b60992a-7795-45d5-acb4-00835ab0c56a', '2022-12-17 18:01:54', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671274910813videotrailer.mp4?alt=media&token=c9723cfb-84c0-4c54-8f90-4829bc36cbd6', 0, b'0', '2022', 16),
(19, b'1', '2022-12-17 18:03:28', 'Hạ Cánh Nơi Anh là bộ phim hay trên Netflix được rất nhiều người xem yêu thích. Nội dung phim kể về câu chuyện cô gái Hàn Quốc Yoon Se Ri được sĩ quan Bắc Hàn Ri Jung Hyuk cứu giúp trong một lần bị tai nạn. Trong thời gian gặp nhau, hai người đã đem lòng yêu nhau bất chấp những khác biệt, ngăn cách chính trị. Bộ phim đã lấy đi nhiều nước mắt của người xem nhưng vẫn có những cảnh phim đầy hài hước của tình quân dân.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275006590imgSm19.png?alt=media&token=80346263-60a9-448a-9283-2fc0615c0ac5', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275006589imgTitle19.png?alt=media&token=cc4ae96a-2965-490e-85a8-f0dc30a69434', 10, 'Hạ Cánh Nơi Anh', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275006591trailertrailer.mp4?alt=media&token=00533c40-3f3d-43cf-9a16-9b266a54083b', '2022-12-17 18:03:28', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275006591videotrailer.mp4?alt=media&token=c3880a9e-589d-4b09-b51f-9fbe54a17db1', 0, b'1', '2020', 17),
(20, b'1', '2022-12-17 18:04:53', 'Bộ phim Chuyến Tàu Sinh Tử lấy bối cảnh đất nước Hàn bị tấn công bởi một loại virus, có thể biến con người thành những xác sống khát máu, hung hăng. Có mặt trên chuyến tàu từ Seoul tới Busan là hai vợ chồng chuẩn bị đón đứa con đầu lòng, một người cha cùng con gái và một số học sinh cấp 3. Khi đại dịch bất người bùng phát, họ không còn cách nào khác là ra ngoài đối đầu với chúng để bảo vệ những người thân yêu. ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275090879imgSm20.png?alt=media&token=89b3c477-c676-478b-bb79-0cb2bf9f03c2', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275090879imgTitle20.png?alt=media&token=8ac57edd-ab19-424a-94f7-9becb94c9526', 14, 'Chuyến tàu sinh tử', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275090880trailertrailer.mp4?alt=media&token=28ff7799-b25d-46a7-b889-ea27433a2cff', '2022-12-17 18:04:53', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275090880videotrailer.mp4?alt=media&token=8cf884d3-045f-4f9d-8236-be9546ef7ec5', 0, b'1', '2021', 18),
(21, b'1', '2022-12-17 18:06:12', 'Âm Dương Sư: Tình Nhã Tập là bộ phim Trung Quốc cổ trang gây bão khắp các diễn đàn “mọt phim” Châu Á. Nội dung phim xoay quanh cuộc chiến chống lại cái ác của hai Âm Dương Sư là Tình Minh và Bác Nhã. Hai người từ oan gia trở thành đồng đội cùng nhau khai mở bí mật được chôn giấu hàng thế kỷ. Đây là bộ phim có bước tiến đáng kể về kỹ xảo của điện ảnh Trung Quốc. Hầu hết yêu quái trong phim được khắc họa chân thực, vô cùng sắc sảo không hề kém cạnh các siêu phẩm đến từ Hollywood.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275170409imgSm21.png?alt=media&token=f003f29e-fd8c-4d93-8a71-cdeb4a8cfe85', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275170408imgTitle21.png?alt=media&token=a36305d4-84b9-4e13-9b27-5372ba67b887', 5, 'Âm Dương Sư: Tình Nhã tập', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275170410trailertrailer.mp4?alt=media&token=0f37b6c5-520b-412b-a573-5378eb60cd26', '2022-12-17 18:06:12', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275170410videotrailer.mp4?alt=media&token=7c2fec20-56ee-4ea2-ac14-341e25dbc6be', 0, b'0', '2022', 19),
(22, b'1', '2022-12-17 18:07:24', 'How I Met Your Mother là tựa phim hay trên Netflix dành cho những bạn thích chủ đề tình cảm nhẹ nhàng. Bộ phim xoay quanh cuộc sống, tình cảm của Ted Mosby và những người bạn thân thiết. Những tình huống dở khóc dở cười trong phim chỉ là câu chuyện đời sống thường ngày nhưng chứa đựng nhiều bài học nhân văn sâu sắc. ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275242047imgSm22.png?alt=media&token=af4724fc-6093-4058-9a91-5c1ed786cbaa', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275242046imgTitle22.png?alt=media&token=651ac00b-21ef-4703-aa7a-5ed3a5ac34ab', 0, 'How I Met Your Mother', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275242048trailertrailer.mp4?alt=media&token=b961ecd3-ef80-4c4c-be28-d46805c10c00', '2022-12-17 18:07:24', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275242048videotrailer.mp4?alt=media&token=3a40bed9-a699-42af-9610-e8342bb7e8f6', 0, b'1', '2022', 20),
(23, b'1', '2022-12-17 18:08:31', 'Vùng Chiến Sự Nguy Hiểm là bộ phim khoa học viễn tưởng hay trên Netflix. Câu chuyện bắt đầu khi một trung úy thực hiện cuộc tấn công bằng máy bay không người lái hỗ trợ đồng đội nhưng không nghe theo chỉ thị cấp trên. Người phi công đã bị điều đến Ukraine và gặp được người máy sĩ quan có khả năng chiến đấu mạnh mẽ và có suy nghĩ, hành động như con người. ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275308851imgSm23.png?alt=media&token=882fe072-d075-4c4f-b981-fd217bdc575f', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275308850imgTitle23.png?alt=media&token=5f6e3fdd-0c44-4a7d-a20f-bf5db2fc6b6f', 12, 'Vùng Chiến Sự Nguy Hiểm', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275308852trailertrailer.mp4?alt=media&token=239e50c1-a0c7-412e-af1f-3cdd62a4e41b', '2022-12-17 18:08:31', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671275308852videotrailer.mp4?alt=media&token=98de765e-29da-436c-a101-1b9e9a0af4e9', 0, b'1', '2021', 21),
(24, b'1', '2022-12-17 18:41:48', 'Ấn Quỷ là bộ phim hay trên Netflix xoay quanh cô gái khiếm thính Alice tại thị trấn nhỏ thuộc vùng New England. Vào một ngày, cô bỗng nhiên nghe, nói và có được năng lực chữa bệnh cho mọi người. Hàng trăm nghìn người đổ về để chứng kiến phép màu của cô, trong đó nhà báo Gerry Fenn muốn thực hiện một phóng sự để cứu vãn sự nghiệp của mình. Song hàng loạt các sự kiện kinh hoàng xảy ra khiến ông nhận ra thế lực ma quỷ thực sự đứng sau lưng cô gái.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277306784imgSm24.png?alt=media&token=d837b03c-5cac-4478-aac4-0c1b329d02ff', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277306775imgTitle24.png?alt=media&token=edf64dc7-8795-49de-9142-eba22db12789', 14, 'Ấn Quỷ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277306785trailertrailer.mp4?alt=media&token=f5fe26c3-ef1d-4849-92d7-40688f666b8b', '2022-12-17 18:41:48', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277306786videotrailer.mp4?alt=media&token=6802b22e-d521-4660-aeb5-5769501f8892', 0, b'1', '2021', 22),
(25, b'1', '2022-12-17 18:44:27', 'Đối với các mọt phim đam mê thể loại phim tình cảm lãng mạn của các cặp đôi thì Hello, Goodbye, and Everything In Between chính là lựa chọn hàng đầu trong tháng 7 này. Phim Netflix tháng 7 2022 này được chuyển thể từ tiểu thuyết kinh điển của nữ nhà văn Jennifer E.Smith. Sự dày vò, lưu luyến, buồn vui lẫn lộn từ hai con người được lột tả một cách chân thực nhất.', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277464808imgSm25.png?alt=media&token=9f5c7247-2778-4f65-82aa-82e83307f34c', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277464807imgTitle25.png?alt=media&token=0f3dd45e-7ff8-4a93-a302-2ce4993027b0', 6, 'Hello, Goodbye, and Everything In Between', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277464809trailertrailer.mp4?alt=media&token=bb6acd40-9922-4061-a0e7-951d02789744', '2022-12-17 18:44:27', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277464809videotrailer.mp4?alt=media&token=05e3b0e3-a564-49a9-a15c-4da18f90ec9c', 0, b'0', '2022', 23),
(26, b'1', '2022-12-17 18:46:19', 'The Sea Beast - những cuộc phiêu lưu kỳ thú trên biển do đạo diễn Chris Williams sẽ chính thức chiếu độc quyền trên Netflix vào ngày 8/7 sẽ mang tới cho khán giả những giây phút thư giãn nhất. Trong cái thời đại mà những con thú nguy hiểm vẫn còn “nhởn nhơ” trên biển thì cái tên Jacob Holland được muôn nơi ca tụng. ', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277577246imgSm26.png?alt=media&token=aa725e66-2cb3-46f6-b7da-b09a08f8c482', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277577245imgTitle26.png?alt=media&token=d95ea37e-ce6d-4819-bb60-2046ce9a81e8', 0, 'The Sea Beast', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277577247trailertrailer.mp4?alt=media&token=c1f19f4a-5fd6-4e7f-aef3-298c44b01e1b', '2022-12-17 18:46:19', 'https://firebasestorage.googleapis.com/v0/b/movie-app-e6ad2.appspot.com/o/videos%2F1671277577247videotrailer.mp4?alt=media&token=81f33c54-febd-46db-aacd-5d2f3b77ef4c', 0, b'1', '2022', 24);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `movies_categories`
--

CREATE TABLE `movies_categories` (
  `movies_id` bigint(20) NOT NULL,
  `categories_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `movies_categories`
--

INSERT INTO `movies_categories` (`movies_id`, `categories_id`) VALUES
(1, 3),
(1, 14),
(2, 1),
(2, 8),
(3, 8),
(3, 9),
(4, 2),
(4, 8),
(5, 8),
(5, 17),
(6, 15),
(6, 16),
(8, 4),
(8, 23),
(9, 8),
(9, 15),
(10, 23),
(12, 18),
(13, 18),
(13, 19),
(14, 11),
(14, 23),
(15, 17),
(16, 16),
(17, 11),
(18, 16),
(19, 16),
(20, 9),
(20, 12),
(21, 6),
(21, 7),
(22, 11),
(22, 22),
(22, 23),
(23, 2),
(23, 8),
(24, 1),
(25, 16),
(26, 9),
(26, 17);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `plan`
--

CREATE TABLE `plan` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `days` bigint(20) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `price` double NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `plan`
--

INSERT INTO `plan` (`id`, `created_at`, `days`, `description`, `name`, `price`, `updated_at`) VALUES
(1, '2022-12-17 16:46:07', 7, 'Chất lượng hình ảnh chuẩn 4K Không quảng cáo Nói không với tài khoản Trial Bảo hành trọn thời gian Thời gian sử dụng tối ưu', 'Gói 7 ngày', 20000, '2022-12-17 16:46:07'),
(2, '2022-12-17 16:46:20', 14, 'Chất lượng hình ảnh chuẩn 4K Không quảng cáo Nói không với tài khoản Trial Bảo hành trọn thời gian Thời gian sử dụng tối ưu', 'Gói 14 ngày', 40000, '2022-12-17 16:46:20'),
(3, '2022-12-17 16:46:47', 30, 'Chất lượng hình ảnh chuẩn 4K Không quảng cáo Nói không với tài khoản Trial Bảo hành trọn thời gian Gia hạn trên chính tài khoản đang sử dụng', 'Gói 1 tháng', 60000, '2022-12-17 16:46:47'),
(4, '2022-12-17 16:47:11', 60, 'Chất lượng hình ảnh chuẩn 4K Không quảng cáo Nói không với tài khoản Trial Bảo hành trọn thời gian Gia hạn trên chính tài khoản đang sử dụng', 'Gói 3 tháng', 140000, '2022-12-17 16:47:11'),
(5, '2022-12-17 16:47:32', 90, 'Chất lượng hình ảnh chuẩn 4K Không quảng cáo Nói không với tài khoản Trial Bảo hành trọn thời gian Gia hạn trên chính tài khoản đang sử dụng', 'Gói 6 tháng', 250000, '2022-12-17 16:47:32'),
(6, '2022-12-17 16:47:49', 365, 'Chất lượng hình ảnh chuẩn 4K Không quảng cáo Nói không với tài khoản Trial Bảo hành trọn thời gian Gia hạn trên chính tài khoản đang sử dụng', 'Gói 1 năm', 500000, '2022-12-17 16:47:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reset_password`
--

CREATE TABLE `reset_password` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `uid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL,
  `content` longtext DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `rating` float NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `movies_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `series`
--

CREATE TABLE `series` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `title` longtext DEFAULT NULL,
  `type` longtext DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `series`
--

INSERT INTO `series` (`id`, `created_at`, `title`, `type`, `updated_at`) VALUES
(1, '2022-12-17 16:48:28', 'Hoàng Quyền (The Crown)', 'series', '2022-12-17 16:48:28'),
(2, '2022-12-17 16:48:57', 'Cậu Bé Mất Tích (Stranger Things)', 'series', '2022-12-17 16:48:57'),
(3, '2022-12-17 16:49:25', 'Những Người Bạn Từ Trường Đại Học (Friends From College)', 'series', '2022-12-17 16:49:25'),
(4, '2022-12-17 16:49:45', 'Bojack Horseman', 'series', '2022-12-17 16:49:45'),
(5, '2022-12-17 16:50:08', 'Cobra Kai ( Võ quán Cobra Kai)', 'series', '2022-12-17 16:50:08'),
(6, '2022-12-17 16:50:35', 'Money Heist ( Phi vụ triệu đô)', 'series', '2022-12-17 16:50:35'),
(7, '2022-12-17 16:50:57', 'The Witcher ( Thợ săn quái vật)', 'series', '2022-12-17 16:50:57'),
(8, '2022-12-17 16:51:15', 'The Queen’s Gambit (Gambit Hậu)', 'series', '2022-12-17 16:51:15'),
(9, '2022-12-17 16:51:32', 'Bridgerton ( Dòng tộc Bridgerton)', 'series', '2022-12-17 16:51:32'),
(10, '2022-12-17 16:51:47', 'Lupin', 'series', '2022-12-17 16:51:47'),
(11, '2022-12-17 16:52:08', 'Squid Game ( Trò chơi con mực)', 'series', '2022-12-17 16:52:08'),
(12, '2022-12-17 16:52:29', 'Sex Education ( Giáo dục giới tính)', 'series', '2022-12-17 16:52:29'),
(13, '2022-12-17 16:53:07', 'The Umbrella Academy ( Học viện Umbrella)', 'series', '2022-12-17 16:53:07'),
(14, '2022-12-17 16:53:25', 'Uncut Gems ', 'series', '2022-12-17 16:53:25'),
(15, '2022-12-17 16:53:53', 'The IrishMan - Người đàn ông Ireland', 'series', '2022-12-17 16:53:53'),
(16, '2022-12-17 17:58:15', 'Thư Ký Kim Sao Thế', 'series', '2022-12-17 17:58:15'),
(17, '2022-12-17 17:58:37', 'Hạ Cánh Nơi Anh', 'series', '2022-12-17 17:58:37'),
(18, '2022-12-17 17:59:06', 'Chuyến tàu sinh tử', 'series', '2022-12-17 17:59:06'),
(19, '2022-12-17 17:59:27', 'Âm Dương Sư: Tình Nhã tập', 'series', '2022-12-17 17:59:27'),
(20, '2022-12-17 17:59:51', 'How I Met Your Mother', 'series', '2022-12-17 17:59:51'),
(21, '2022-12-17 18:00:12', 'Vùng Chiến Sự Nguy Hiểm', 'series', '2022-12-17 18:00:12'),
(22, '2022-12-17 18:40:55', 'Ấn Quỷ', 'series', '2022-12-17 18:40:55'),
(23, '2022-12-17 18:43:12', 'Hello, Goodbye, and Everything In Between', 'series', '2022-12-17 18:43:12'),
(24, '2022-12-17 18:45:14', 'The Sea Beast', 'series', '2022-12-17 18:45:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `series_categories`
--

CREATE TABLE `series_categories` (
  `series_id` bigint(20) NOT NULL,
  `categories_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `series_categories`
--

INSERT INTO `series_categories` (`series_id`, `categories_id`) VALUES
(1, 7),
(2, 1),
(2, 8),
(2, 9),
(3, 11),
(3, 23),
(4, 16),
(4, 17),
(5, 8),
(6, 2),
(6, 21),
(7, 13),
(7, 14),
(8, 22),
(9, 16),
(10, 4),
(11, 8),
(11, 15),
(12, 20),
(12, 23),
(13, 9),
(13, 11),
(14, 18),
(15, 18),
(15, 19),
(16, 16),
(17, 16),
(18, 15),
(19, 6),
(19, 7),
(20, 11),
(20, 22),
(20, 23),
(21, 2),
(21, 8),
(22, 1),
(23, 16),
(24, 9),
(24, 17);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `vip` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `active`, `avatar`, `created_at`, `email`, `name`, `password`, `refresh_token`, `roles`, `updated_at`, `username`, `vip`) VALUES
(1, b'0', 'https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg', '2022-12-17 16:38:17', 'admin@qui.name.vn', 'Administrator', '$2a$10$OGevLled7EaUksr/jnDiYe6vC59uzk1472PhgJD1gU05kElvvzzhW', '8a0de3e0-7ebd-46ba-8de3-e07ebd96ba4a', 'ROLE_USER,ROLE_ADMIN', '2022-12-17 22:53:38', 'admin', NULL),
(2, b'0', 'https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg', '2022-12-17 21:11:14', 'quocthai05022@gmail.com', 'thai01', '$2a$10$qTS6cyV7AASszYhGQzSqs.vpH5SYB5NtrZ2Jt8VtpwrLaBmQ6In4O', 'f5f1c51a-5719-4a53-b1c5-1a5719ba53f5', 'ROLE_USER', '2022-12-17 22:53:39', 'user', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `billing`
--
ALTER TABLE `billing`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_f1qjovm173c1iixreyt8muo46` (`code`),
  ADD KEY `FKowp6rc2crgyc3cr2l6wyyhkrd` (`plan_id`),
  ADD KEY `FK7u0qmrh9gxtqnm08yj1eji0ju` (`user_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1x766u663l7m0mxuj0o72muu` (`user_id`);

--
-- Chỉ mục cho bảng `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkdxvykn8v7c20i8t4xocjtjgt` (`series_id`);

--
-- Chỉ mục cho bảng `movies_categories`
--
ALTER TABLE `movies_categories`
  ADD KEY `FKlc0xgbt4aq9fgw63jpeu36o0t` (`categories_id`),
  ADD KEY `FKatgsnl7fyqx58m934snd5kis3` (`movies_id`);

--
-- Chỉ mục cho bảng `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reset_password`
--
ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_8stfknif8g2vm00l390wmgd27` (`token`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmmf791m5pctm0lqrp4mlnbe80` (`movies_id`),
  ADD KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`);

--
-- Chỉ mục cho bảng `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `series_categories`
--
ALTER TABLE `series_categories`
  ADD KEY `FKdn8jyv82kxhij1nigd36jbvfs` (`categories_id`),
  ADD KEY `FKhopu32affxtlcj129206frtwe` (`series_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `billing`
--
ALTER TABLE `billing`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `movies`
--
ALTER TABLE `movies`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `plan`
--
ALTER TABLE `plan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `reset_password`
--
ALTER TABLE `reset_password`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `series`
--
ALTER TABLE `series`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `billing`
--
ALTER TABLE `billing`
  ADD CONSTRAINT `FK7u0qmrh9gxtqnm08yj1eji0ju` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKowp6rc2crgyc3cr2l6wyyhkrd` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`id`);

--
-- Các ràng buộc cho bảng `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FK1x766u663l7m0mxuj0o72muu` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `FKkdxvykn8v7c20i8t4xocjtjgt` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`);

--
-- Các ràng buộc cho bảng `movies_categories`
--
ALTER TABLE `movies_categories`
  ADD CONSTRAINT `FKatgsnl7fyqx58m934snd5kis3` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `FKlc0xgbt4aq9fgw63jpeu36o0t` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKmmf791m5pctm0lqrp4mlnbe80` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`);

--
-- Các ràng buộc cho bảng `series_categories`
--
ALTER TABLE `series_categories`
  ADD CONSTRAINT `FKdn8jyv82kxhij1nigd36jbvfs` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `FKhopu32affxtlcj129206frtwe` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
