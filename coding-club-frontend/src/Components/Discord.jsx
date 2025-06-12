import React from "react";
import discord from "../Images/discord.png"; // Make sure this path is correct

const Home = () => {
  return (
    <>
      {/* background */}
      <div className="fixed w-full h-full z-[1]"></div>

      {/* content */}
      <div className="flex flex-col bg-[#141327] items-center gap-10 m-auto w-[80%] justify-center h-[50%] text-white">
        <div className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mt-10" style={{ fontFamily: "Sora, sans-serif" }}>
          <h1>DISCORD COMMUNITY</h1>
        </div>

        {/* Content Wrapper */}
        <div className="flex max-lg:flex-col lg:flex-row lg:w-[60vw] max-lg:w-[80vw] pt-2 pb-10 max-lg:p-7 gap-8 items-center justify-between">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Text Section */}
            <div className="lg:w-[50%]">
              <h1 className="font-bold text-lg py-2">
                Fundamental Skills and Techniques
              </h1>
              <p className="text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laborum, laboriosam. Pariatur ducimus?
              </p>
              <br />
              <h1 className="text-lg font-bold py-2">
                Advanced Learning Paths
              </h1>
              <p className="text-gray-400">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                eaque voluptatibus praesentium impedit autem dignissimos modi
                quam voluptatum iure inventore nam voluptatem, accusamus cumque
                rem ea sit. Velit, veniam ut.
              </p>
            </div>

            {/* Image Section */}
            <div className="relative w-full lg:w-[50%] flex justify-end lg:ml-12">
              <img
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                src={discord}
                alt="Community"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
