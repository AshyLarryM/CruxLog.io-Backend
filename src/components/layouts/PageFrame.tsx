import { Navbar } from "./Navbar";


interface PageFrameProps {
    children: React.ReactNode;
    showNavbar?: boolean,
    showFooter?: boolean,
    className?: string,
}

export function PageFrame({ children, showNavbar, className }: PageFrameProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {showNavbar && <Navbar />}
            <main className={`flex-grow justify-center mx-auto max-w-[1440px] w-full ${className || ''}`}>
                {children}
            </main>
        </div>
    )
}
