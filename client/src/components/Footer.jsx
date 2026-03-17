import { assets } from "../assets/assets";
import { useState } from "react";

const Footer = () => {

  const [showMessage, setShowMessage] = useState(false);

  const handleSubscribe = () => {
    setShowMessage(true);

    // auto close after 3 sec
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <img className="h-9" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Experience the power of AI with QuickAi. <br /> Transform you
            content creation with our suite of premium AI tools. Write articles,
            generate images, and enhance your workflow.
          </p>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>

            <div className="text-sm space-y-2">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>

              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />

                <button
                  onClick={handleSubscribe}
                  className="bg-primary w-24 h-9 text-white rounded cursor-pointer hover:scale-105 transition"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          
          {/* Blur Background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Message Box */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center animate-fadeIn">
            
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="success"
              className="w-16 h-16 mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800">
              Subscribed Successfully 🎉
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              You will receive latest updates in your inbox.
            </p>

          </div>
        </div>
      )}

      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2026 ©{" "}
        <a target="_blank" href="https://github.io/Elysee-Portfolio">
          Cognify
        </a>
        . All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;