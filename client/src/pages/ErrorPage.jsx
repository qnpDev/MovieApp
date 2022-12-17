import React from "react";
import "./err.css";

const ErrorPage = () => {
  return (
    <section class="page_404">
      <div class="container" style={{ width: "100%", height: "100vh" }}>
        <div class="row" style={{ width: "600px", height: "100%", margin: "auto" }}>
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div class="contant_box_404">
                <h3 class="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <a href="/" class="link_404">
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
