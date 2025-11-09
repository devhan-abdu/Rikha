import Link from "next/link";

export default function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-center px-4">
            <h1 className="text-5xl font-cinzel mb-4">We're Launching Soon </h1>
            <p className="text-lg mb-8 text-black/60 max-w-md">
                Our electronics store is getting ready. Stay tuned for something amazing!
            </p>
            <div className="flex items-center gap-6 mt-3">
                <Link href='/' className="font-cinzel bg-primary text-white px-3 py-2 rounded-sm text-base capitalize z-10 hover:scale-95 transition-all duration-300">Shop Now</Link>
                <Link href='/category' className="font-cinzel text-primary border-2 border-primary px-3 py-1.5  rounded-sm text-base capitalize font-bold hover:scale-95 transition-all duration-300 z-10">Explore More</Link>
            </div>
        </div>
    );
}
