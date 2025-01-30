import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="page_404">
      <div className="container1">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>The page you are looking for not available!</p>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="main_btn mt-10 transition-colors duration-300 hover:bg-customBlack hover:text-white hover:border-white dark:hover:bg-darkModeTextClr dark:hover:text-slate-800 dark:hover:border-slate-800"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
