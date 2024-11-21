'use client'
import { FaApple } from "react-icons/fa";


export function Hero() {
    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center py-1">
                <div className="flex flex-row w-full 2xl:flex justify-center">
                    <div className="w-1/2 flex flex-col justify-between">
                        <div>
                            <h1 className="animate-fade-in text-center 2xl:text-left text-6xl font-semibold mb-4 mt-0 sm:mt-36 bg-gradient-to-b from-bright-yellow via-[#F34971] to-secondary bg-clip-text text-transparent">
                                <p className="mb-4 text-center">Track Any Climb.</p><p className="text-center mb-4">Indoors or Outdoors. </p><p className="text-center mb-4">Boulders or Ropes.</p>
                            </h1>
                            <p className="animate-slide-in mt-8 font-normal text-xl text-gray-200 text-center">Log any climb's grade, name, type, style, and photo. <br />Check your session history, view stats, and keep notes.</p>
                            <div className="mt-8 flex justify-center font-medium flex-col sm:flex-row gap-4">
                                <button className="animate-slide-in w-full sm:w-auto min-w-[200px] bg-primary-purple rounded-lg px-6 py-4 border-2 border-bright-yellow text-white hover:bg-primary-purple/80 flex items-center gap-4">
                                    <FaApple className="text-white h-10 w-10" />
                                    <div className="flex flex-col text-left">
                                        <span className="text-md">Download on the</span>
                                        <span className="text-xl font-semibold">App Store</span>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="w-1/2 hidden 2xl:flex justify-center items-center">
                        <div className="flex justify-center items-center mt-4 max-h-screen">
                            <img
                                src="/assets/createClimbLeftSim.png"
                                alt="Placeholder"
                                className="animate-slide-in h-[90vh] max-h-[90vh] max-w-full object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}