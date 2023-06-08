import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { AuthContext } from "../Auth/Auth";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }

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
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <div className="buttons">
                <a
                  href="https://wwws.fits.edu.br/Portal/Index.jsp"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center h-full"
                >
                  <img
                    src="https://play-lh.googleusercontent.com/IpPntxBn6fUB_7SgH3UvCDgzlvcUKwQ9dReYPMJJfIxBuJiz7qCL5wdqHM4yvFLvBA"
                    alt="Magister.img"
                    className="scale-50"
                  />
                  <p>Magister</p>
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
