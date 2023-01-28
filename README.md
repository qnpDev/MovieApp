<div align="center">
    <h2><b>Movie App</b></h2>
    <h5><i>Movie App is a web application like netflix. On website, everyone can access to find and view movie online. </i></br>***</h5>
    </br>
</div>

# Table of contents

1. [About](#1-about)</br>
2. [Demo](#2-demo)</br>
3. [Install](#3-install)</br>

# 1. About
<b>Source code bao gồm 2 folder và 1 file:</b></br>
<ul>
    <li><b>server</b>: Là phần Back-end của dự án, được xây dựng dựa trên ngôn ngữ java (Spring Boot RESTful API).</li>
	<li><b>client</b>: Là phần Front-end của dự án, được xây dựng dựa trên ReactJS, giao diện người dùng sử dụng API để trao đổi dữ liệu với server Spring Boot.</li>
	<li><b>movie.sql</b>: là file database với dữ liệu sẳn thực tế</li>
</ul>

# 2. Demo
<b>Link video demo</b>: <i><a href="https://www.youtube.com/watch?v=UmIzefYuKGY">https://www.youtube.com/watch?v=UmIzefYuKGY</a></I>

# 3. Install
<ul>
    <li><b>Import sql: </b>
        <ul>
            <li><code>Khởi chạy hệ thống mysql database bằng các công cụ hỗ trợ (xampp)</code></li>
            <li><code>Sử dụng file "movie.sql" trong source code để import database vào mysql</code></li>
        </ul>
    </li>
	<li><b>Khởi chạy server:</b> Có 2 cách
		<ul>
            <li>Khởi chạy server bằng IDE (Intellij, VSCode,...)
                <ul>
			        <li>Tiến hành open project với thư mục "server"</li>
			        <li>Tùy chỉnh các cấu hình cho server phù hợp trong: "src/main/resources/application.properties"</li>
			        <li>Khởi chạy server bằng phím tắt "Shift + F10" hoặc lựa chọn biểu tượng run trên thanh navbar</li>
                </ul>
            </li>
		    <li>Khởi chạy server với file 'war' hoặc 'jar' đã được build (cấu hình mặc định sẳn cho localhost) bằng tomcat + JDK có sẳn
			    <ul>
                    <li>Truy cập thư mục "server\target"</li>
			        <li>Thực hiện chạy file "server-0.0.1-SNAPSHOT.jar" hoặc "server-0.0.1-SNAPSHOT.war" với 'Java Platform SE'</li>
                </ul>
            </li>
        </ul>
    </li>
	<li><b>Khởi chạy client:</b>
		<ul>
            <li>Máy tính cần cài đặt node(https://nodejs.org/en/) để sử dụng lệnh</li>
		    <li>Tiến hành mở terminal ở thư mục "client" trong source code</li>
		    <li>Sử dụng lệnh "npm i" để cài đặt các dependence cần thiết</li>
		    <li>Sử dụng lệnh "npm start" để tiến hành khởi chạy client</li>
		    <li>Truy cập browser với liên kết "http://localhost:3000" để truy cập giao diện trang web</li>
        </ul>
    </li>
    <li><b>Thông tin tài khoản: (tài khoản / mật khẩu)</b>
    <ul>
        <li><b>Quản trị viên</b>: <code>admin</code> / <code>admin</code></li>
        <li><b>Người dùng</b>: <code>user</code> / <code>user</code></li>
    </ul>
</ul>

<h5 align="center">__qnp__</h5>
<h2 align="center">Thank you!</h3>