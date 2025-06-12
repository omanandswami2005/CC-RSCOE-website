import "react";

function Footer() {
  return (
    <div>
      <footer
        className="
     bg-gradient-to-r from-[#040313] via-[#040323] to-[#040313] border-t-2 border-slate-900 mt-[100px] text-white py-12 px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          {/* <!-- Left Section (CTA) --> */}
          <div className="max-w-lg">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Join The Community
            </h2>
            <p className="mt-6 md:mt-8 lg:mt-10 text-gray-400 text-sm">
              With Coding Club RSCOE, you can touch bounds you never even
              imagined of and learn what you never thought you could. Join us
              now and be a part of one of the most amazing communities in the
              world.
            </p>
          </div>

          {/* <!-- Right Section (Social Links) --> */}
          <div className="mt-10 md:mt-0">
            <ul
              className="space-y-3 text-white opacity-90 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <li className="flex items-center justify-between border-b border-gray-700 pb-4">
                <span className="flex items-center">
                  <i className="fa-brands fa-facebook mr-2"></i> FACEBOOK
                </span>
                <a href="#" className="text-gray-400 hover:text-white ml-4">
                  ↗
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-gray-700 pb-4">
                <span className="flex items-center">
                  <i className="fa-brands fa-instagram mr-2"></i> INSTAGRAM
                </span>
                <a
                  href="https://www.instagram.com/codingclub.rscoe?igsh=cXBsN2dpbDRyMW05&utm_source=qr "
                  className="text-gray-400 hover:text-white ml-4"
                >
                  ↗
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-gray-700 pb-4">
                <span className="flex items-center">
                  <i className="fa-brands fa-linkedin mr-2"></i> LINKEDIN
                </span>
                <a
                  href="https://www.linkedin.com/company/coding-club-rscoe/"
                  className="text-gray-400 hover:text-white ml-4"
                >
                  ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Navigation Links --> */}
        <div className="max-w-6xl pt-10 mx-auto mt-10">
          <ul
            className="mt-4 space-y-3 text-[10px] text-white tracking-widest"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>SUBSCRIPTION</span>
              <a href="#" className="text-gray-400 hover:text-white">
                ↗
              </a>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>ABOUT US</span>
              <a href="#" className="text-gray-400 hover:text-white">
                ↗
              </a>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>TEAM</span>
              <a href="#" className="text-gray-400 hover:text-white">
                ↗
              </a>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>CONTACT</span>
              <a href="#" className="text-gray-400 hover:text-white">
                ↗
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- Bottom Copyright Section --> */}
        <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <p>© Coding Club RSCOE 2021 - 2024. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
