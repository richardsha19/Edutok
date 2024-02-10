import React from 'react'
import image from './image.png'


function LandingPage() {
  return (
    <div className="flex justify-center items-center px-16 py-12 bg-indigo-700 max-md:px-5 ">
      <div className="flex flex-col items-center mt-36 max-w-full w-[1030px] max-md:mt-10">
        <div className="text-7xl font-extrabold text-center text-lime-300 max-md:max-w-full max-md:text-4xl">
          doomscroll your textbook
        </div>
        <div className="mt-10 text-2xl font-medium text-center text-gray-200">
          on easy mode 🌶️
        </div>
        
        <div className="flex gap-5 justify-between items-center self-stretch px-20 py-12 mt-28 bg-white rounded-xl max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col flex-1 self-stretch my-auto">
            <div className="flex gap-0 justify-between">
              <div className="grow my-auto text-2xl text-center text-black">
                1
              </div>
              <div className="grow justify-center px-12 py-3 text-xl text-center text-black bg-white rounded-tl rounded-bl border border-r-0 border-black border-solid max-md:px-5">
                upload textbook pdf
              </div>
              <div className="flex justify-center items-center px-8 py-3 rounded-none border rounded-tr rounded-br border-black border-solid basis-0 bg-zinc-300 max-md:px-5">
                <div style={{ width: '2vh', height: '2vh' }}>
                  
              <img
                src={image}
                className="aspect-square"
                alt="Upload icon"
              />
            </div>

              </div>
            </div>
            <div className="flex gap-0 justify-between mt-16 text-center whitespace-nowrap text-zinc-300 max-md:mt-10">

              <div className="grow my-auto text-2xl">2</div>
              <div className="grow justify-center px-6 py-3 text-xl bg-white rounded-tl rounded-bl border border-solid border-zinc-300 max-md:pl-5">
                starting page number
              </div>
              <div className="flex justify-center items-center px-8 py-3 rounded-none border rounded-tr rounded-br border-zinc-300 border-solid basis-0 bg-zinc-300 max-md:px-5"/>
            </div>
            <div className="flex gap-0 justify-between mt-16 text-center whitespace-nowrap text-zinc-300 max-md:mt-10">
              <div className="grow my-auto text-2xl">3</div>
              <div className="grow justify-center px-6 py-3 text-xl bg-white rounded-tl rounded-bl border border-solid border-zinc-300 max-md:px-5">
                ending page number
              </div>
              <div className="flex justify-center items-center px-8 py-3 rounded-none border rounded-tr rounded-br border-zinc-300 border-solid basis-0 bg-zinc-300 max-md:px-5"/>
            </div>
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto text-center">
          <div className="overflow-hidden relative flex justify-center items-center rounded-full bg-red-500 self-center max-w-full text-7xl font-bold text-white whitespace-nowrap aspect-square w-[166px] max-md:px-5 max-md:text-4xl">
          <div className="overflow-hidden relative flex justify-center items-center rounded-full bg-red-400 self-center max-w-full text-7xl font-bold text-white whitespace-nowrap aspect-square w-[120px] max-md:px-5 max-md:text-4xl">

      3
      </div>
    </div>
            <div className="mt-11 text-3xl text-black max-md:mt-10">
              steps away from doomscrolling
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default LandingPage