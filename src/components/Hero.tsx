'use client'
import Link from "next/link";
import { FaApple } from "react-icons/fa";


export function Hero() {
    return (
        <div className="min-h-screen p-4 md:p-0">
            <div className="flex justify-center items-center py-1">
                <div className="flex flex-row w-full 2xl:flex justify-center">
                    <div className="w-1/2 flex justify-center">
                        <div>
                            <h1 className="animate-fade-in text-center 2xl:text-left md:text-6xl text-5xl font-semibold mb-4 textl mt-0 sm:mt-36 bg-gradient-to-t from-bright-yellow via-[#F34971] to-primary-purple bg-clip-text text-transparent">
                                <p className="mb-8 text-center">Track Any Climb.</p><p className="text-center mb-6">Indoors or Outdoors. </p><p className="text-center">Boulders or Ropes.</p>
                            </h1>
                            <p className="animate-slide-in sm:mt-8 mt-4 font-normal sm:text-lg text-gray-200 text-center">CruxLog is a free climbing tracker for iOS.  Track your climbing sessions, individual climbs, upload photos, and follow your stats to reach your climbing goals.</p>
                            <div className="mt-8 flex justify-center font-medium flex-col sm:flex-row gap-4">
                                <Link href={'https://apps.apple.com/us/app/cruxlog/id6738405582'}>
                                    <button className="animate-slide-in w-full sm:w-auto min-w-[200px] bg-primary-purple rounded-lg px-6 py-4 border-2 border-bright-yellow text-white hover:bg-primary-purple/70 flex items-center gap-4">
                                        <FaApple className="text-white h-10 w-10" />
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm md:text-lg">Download on the</span>
                                            <span className="text-lg md:text-xl font-semibold">App Store</span>
                                        </div>
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>

                    <div className="w-1/2 hidden 2xl:flex justify-center items-center">
                        <div className="animate-slide-in flex justify-center items-center mt-4 max-h-screen relative">
                            <img
                                src="/assets/historyVerticalSim.png"
                                alt="Placeholder"
                                className="h-[85vh] max-h-[900px] max-w-full object-contain absolute left-[-100px] top-[-5px] transform scale-95 z-0"
                            />
                            <img
                                src="/assets/createClimbLeftSim.png"
                                alt="Placeholder"
                                className="h-[90vh] max-h-[950px] max-w-full object-contain relative z-10 transform translate-x-[160px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center mt-8 2xl:hidden">
                <div className="animate-slide-in flex justify-center items-center max-h-screen relative">
                    {/* Images for small screens */}
                    <img
                        src="/assets/historyVerticalSim.png"
                        alt="Placeholder"
                        className="h-[50vh] max-h-[400px] max-w-full object-contain absolute left-[-50px] top-[-5px] transform scale-95 z-0 md:h-[65vh] md:max-h-[550px]"
                    />
                    <img
                        src="/assets/createClimbLeftSim.png"
                        alt="Placeholder"
                        className="h-[55vh] max-h-[450px] max-w-full object-contain relative z-10 transform top-[5px] translate-x-[60px] md:h-[70vh] md:max-h-[600px]"
                    />
                </div>
            </div>
        </div>
    )
}