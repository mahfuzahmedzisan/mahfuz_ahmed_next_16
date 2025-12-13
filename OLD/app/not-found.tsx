import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <div className='h-screen w-full flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-light'>Mahfuz Ahmed Zisan</h2>
                    <h1 className='text-6xl font-bold text-primary'>404</h1>
                    <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-light mt-2'>Page Not Found</h2>
                    <p className='text-lg text-light mt-2'>Sorry, the page you are looking for
                        does not exist.</p>
                    <Link href={'/'} className='bg-gradient-primary shadow-shadow-primary px-5 py-3 rounded-md hover:bg-gradient-secondary hover:shadow-primary hover:shadow-sm transition-all duration-300 inline-block mt-10'>
                        Go Back Home
                    </Link>
                </div>
            </div>
        </>
    )
}
