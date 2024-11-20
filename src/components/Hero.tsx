

export function Hero() {
    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center py-16">
                <div className="flex flex-row p-10 w-full 2xl:flex justify-center">
                    <div className="w-1/2 flex flex-col justify-between">
                        <div>
                            <h1 className="text-center 2xl:text-left text-6xl font-medium mb-4 mt-0 sm:mt-36 text-white">
                                Track Any Climb.<br />Indoors or Outdoors. <br />Boulders or Ropes.
                            </h1>
                            <p className="mt-8 font-semibold text-2xl">"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas eos natus temporibus voluptas earum distinctio debitis iste aperiam maiores sapiente tempora nobis esse, eveniet vel. Excepturi sunt accusantium labore animi."</p>
                            <div className="mt-8 flex justify-center font-medium flex-col sm:flex-row gap-4">
                                <button className="w-full sm:w-auto min-w-[200px] bg-indigo-600 rounded-md px-6 py-4 border border-indigo-600 text-white hover:bg-transparent hover:text-white">
                                    Instructor Sign up
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 hidden 2xl:flex justify-center items-center">
                        <div className="flex justify-center items-center mt-16">
                            <img
                                src="/assets/createImage.png"
                                alt="Placeholder"
                                className="flex object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-center mt-8 sm:mt-16">
                    <div className="bg-black px-4 sm:px-8 py-4 rounded-full w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl">
                        <h2 className="text-white text-2xl sm:text-3xl font-bold text-center">
                            Flexible Scheduling for Instructors and Students
                        </h2>
                    </div>
                </div>
                <div className="flex justify-center mt-4 sm:mt-8">
                    <p className="text-center text-base sm:text-lg font-light max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl">
                        For instructors or students with unpredictable schedules. We understand the complexity of daily life and musician's gigging schedules, and we want students to have the freedom to book lessons that fit their own timelines without committing to long-term contracts.
                    </p>
                </div>
            </div>
            <div className="mt-24">
                <div className="flex justify-center">
                    <h3 className="font-light text-2xl text-center">Sort for instructors based on Genre, Experience, Ratings, and Price.</h3>
                </div>
            </div>
        </div>
    )
}