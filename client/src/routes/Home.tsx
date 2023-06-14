import React from "react";

import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar Route="home" />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Início</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="buttons flex items-center justify-evenly gap-8">
                <a
                  href="https://wwws.fits.edu.br/Portal/Index.jsp"
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-center items-center rounded-2xl bg-gray-200 pr-3 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:ring-4 active:scale-[1.01] ease-in duration-100 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                >
                  <img
                    src="https://play-lh.googleusercontent.com/IpPntxBn6fUB_7SgH3UvCDgzlvcUKwQ9dReYPMJJfIxBuJiz7qCL5wdqHM4yvFLvBA"
                    alt="Magister.png"
                    height={100}
                    width={100}
                    className="rounded-2xl mr-2"
                  />
                  <p className="text-3xl">Magister</p>
                </a>
                <a
                  href="https://afya.instructure.com/login/canvas"
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-center items-center rounded-2xl bg-gray-200 pr-3 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:ring-4 active:scale-[1.01] ease-in duration-100 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                >
                  <img
                    src="https://www.nicepng.com/png/full/788-7887218_canvas-lms-has-selected-badgr-as-its-native.png"
                    alt="Canvas.png"
                    height={100}
                    width={100}
                    className="rounded-2xl mr-2 bg-[#cdd7e1]"
                  />
                  <p className="text-3xl">Canvas</p>
                </a>
                <a
                  href="https://edu.google.com/intl/ALL_br/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[100px] justify-center items-center rounded-2xl bg-gray-200 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:ring-4 active:scale-[1.01] ease-in duration-100 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                >
                  <img
                    src="https://mopi.com.br/wp-content/uploads/2016/10/google-for-education-logo.png"
                    alt="GoogleForEducation.png"
                    className="rounded-2xl h-[80px] px-5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
