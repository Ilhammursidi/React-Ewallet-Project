import { NavLink } from "react-router"
import { Button } from "../Components/Atoms/Button"
import { useState } from "react"
import { Logo } from "../Components/Atoms/Logo"
import { HamburgerButton } from "../Components/Atoms/HamburgerButton"

function LandingPage(){
const [open,setOpen] = useState(false);

    return (
        <section>
        <header className="h-15 px-5 sm:px-10 md:px-30 border-b border-white  bg-blue-600 flex justify-between w-full md:border-none items-center">
            <Logo/>
            <section className="hidden sm:flex md:flex flex-row gap-5 items-center">
                {/* belum disambung */}
            <Button color="blue"><NavLink to={"/login"}>
                Sign In
            </NavLink>
                </Button>
            <Button color="white"><NavLink to={"/signup"}>
                    Sign Up
                    </NavLink>
                </Button>
            </section>
            <HamburgerButton onClick={()=> setOpen(!open)}>
                <img src="/icons/gg_menu-right-alt.svg" alt="hamburger icon" />
            </HamburgerButton>

            {open && (
                <section className="absolute left-0 bg-white justify-center rounded-b-4xl shadow-lg top-15 w-full flex flex-col items-center sm:hidden md:hidden p-4 gap-2">
                    {/* belum disambungkan */}
                    <Button color="blue" className="border h-10 w-95 text-blue-600 rounded-md" onClick={()=> setOpen(false)}><NavLink to={"/login"}>
                Sign In
            </NavLink>
                </Button>
            <Button color="white" onClick={()=> setOpen(false)} className="border h-10 w-95 text-blue-600 rounded-md"><NavLink to={"/signup"}>
                    Sign Up
                    </NavLink>
                </Button>
                </section>
            )}
            
        </header>
        <main >
            <section className="bg-blue-600 px-5 sm:px-10  md:px-30">
                <h1 className="text-6xl text-white text-left md:px-20 sm:text-center py-6">Experience the Future of Digital Payments with e-wallet</h1>
                <section className="md:flex flex-row-reverse md:items-center md:gap-10">
                    <section className="text-part md:px-10 sm:text-center">
                <p className="text-white text-xl md:text-md md:text-left">Simplify Your Life with Secure and Convenient Mobile Payments</p>
                <section className="flex flex-row justify-between sm:px-20 md:px-0 gap-3 py-5">
                    <Button color="white" className="flex flex-row items-center justify-center w-full p-2 px-6 gap-2">
                        <img src="/icons/gplay.svg" alt="google-play icon" />
                        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                            Play Store
                        </a>
                    </Button>
                    <Button color="blue" className="flex flex-row justify-center items-center w-full p-2 px-6 gap-2">
                        <img src="/icons/appstore.svg" alt="appstore icon" />
                        <a href="https://apps.apple.com/app/id123456789" target="_blank" rel="noopener noreferrer" className="text-white">
                            App Store
                        </a>
                    </Button>
                </section>
                <section className="flex flex-row items-center sm:justify-center gap-5 py-2 md:justify-start">
                <p className="text-4xl text-white">4.6 M</p>
                <img src="/icons/user.svg" alt="users" />
                </section>
                <p className="text-white text-xl md:text-left">Around the world, we already have over 4.6 happy user</p>
                    </section>
                    <section className="image-part">
                        <img className="sm:m-auto md:relative top-5" src="/icons/Mobile Dashboard.svg" alt="mobile-dashboard" />
                    </section>
                </section>
            </section>

            <section className="bg-white px-5 py-10 sm:px-15 md:px-30 flex flex-col gap-8 md:flex-row">
    
                <section className="flex flex-col md:flex-row gap-2 justify-center items-center text-center">
                    <img className="w-12" src="/icons/blueHeadphone.svg" alt="headphone-icon" />
                    <section className="md:text-left">
                        <p className="font-bold md:px-2">24/7 Support</p>
                        <p className="px-2 text-gray-600">We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
                    </section>
                </section>
                <section className="flex flex-col md:flex-row gap-2 justify-center items-center text-center">
                    <img className="w-12" src="/icons/blueShield.svg" alt="shield-icon" />
                    <section className="md:text-left">
                        <p className="font-bold md:px-2">Data Privacy</p>
                        <p className="px-2 text-gray-600">We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
                    </section>
                </section>
                <section className="flex flex-col md:flex-row gap-2 justify-center items-center text-center">
                    <img className="w-12" src="/icons/blueDownload.svg" alt="download-icon" />
                    <section className="md:text-left">
                        <p className="font-bold md:px-2">Easy Download</p>
                        <p className="px-2 text-gray-600">Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.</p>
                    </section>
                </section>
    
            </section>

            <section className="md:flex md:flex-row-reverse md:gap-2 md:px-30 md:items-center">
                <section className="image-part px-6 md:px-0 md:w-600">
                    <img src="/icons/mobilewithlayout.png" alt="mobile-dashboard" />
                </section>
                <section className="text-part md:px-0 px-6 flex flex-col text-center gap-5 py-10 md:text-left">
                    <p className="font-bold text-blue-600">WELCOME TO E-WALLET</p>
                    <p className="text-4xl">Your All-in-One Digital Payment Solution</p>
                    <p className="text-gray-500 px-4 md:px-0">Say goodbye to cash and hello to the future of payments! With e-wallet, you have the power of secure, fast, and convenient digital transactions right at your fingertips. Whether you're shopping, dining out, or sending money to loved ones, we've got you covered.</p>
                    <Button color="blue" className="text-white md:w-40">
                        <NavLink to={"/login"}>
                            Get Started
                        </NavLink>
                    </Button>
                </section>
            </section>
            <section className="bg-gray-100/50 md:flex md:flex-row md:py-10 md:px-20">
                <section className="image-part p-6 md:w-200">
                    <img className="sm:m-auto" src="/icons/online-payment-security-concept-3d-phone-bill 1.svg" alt="mobile-dasboard" />
                </section>
                <section className="text-part grid gap-5 p-5">
                    <p className="text-4xl">All The Great
Zwallet Features.</p>
                    <p className="text-xl text-gray-500">We have some great features from the application and it’s totally free to use by all users around the world.</p>
                    <section className="grid gap-5">
                        <div className="flex gap-3 text-xl font-bold text-green-600">
                            <img src="/icons/greencheck.svg" alt="green-tick" />
                            <p>Small Fee</p>
                        </div >
                        <div className="flex gap-3 text-xl font-bold text-green-600">
                            <img src="/icons/greencheck.svg" alt="green-tick" />
                            <p>Data Secured</p>
                        </div>
                        <div className="flex gap-3 text-xl font-bold text-green-600">
                            <img src="/icons/greencheck.svg" alt="green-tick" />
                            <p>User Friendly</p>
                        </div>
                    </section>
                    <Button color="blue" className="text-white md:w-45 md:h-10">
                        <NavLink to={"/login"}>
                            Get Started
                        </NavLink>
                    </Button>
                </section>
            </section>

            <section className="p-5 pt-10 md:px-30">
                <section className="md:flex md:flex-row md:gap-10">

                <section className="text-part text-center md:text-left">
                    <p className="text-4xl px-5 md:px-0">100+ Trusted Partners</p>
                    <p className="text-gray-500 text-xl p-1 py-5">We have reached global level and have 100+
brand partners around the globe.</p>
                </section>
                <section className="partners sm:px-70 flex flex-col py-10 px-30 justify-center md:flex md:flex-row md:px-20">
                    <img src="/icons/microsoft.svg" alt="microsoft-icon" />
                    <img src="/icons/dropbox.svg" alt="dropbox-icon" />
                    <img src="/icons/h&m.svg" alt="h&m-icon" />
                    <img src="/icons/AirBnb.svg" alt="airbnb-icon" />
                    <img src="/icons/canon.svg" alt="canon-icon" />
                    <img src="/icons/Dell.svg" alt="dell-icon" />
                </section>
                </section>
                <section className="md:py-10">
                    <p className="text-4xl text-center">What Our Users Are Saying</p>
                    <p className="text-xl text-gray-500 text-center py-10 md:text-sm">Ready to experience the future of payments? Download e-wallet now and enjoy a world of convenience at your fingertips.</p>
                </section>
                <section className="md:items-center md:flex md:flex-row md:py-10">
                    <section className="hidden md:flex">
                        <img src="/icons/leftArrow.svg" alt="previous-button" />
                    </section>
                    <section className="bg-blue-600 text-white h-80 md:w-150 md:m-auto rounded-xl flex flex-col text-center p-5">
                        <img className="w-15 m-auto" src="/icons/james-bond.svg" alt="james-bond" />
                        <p className="font-bold">James Bond</p>
                        <img className="h-5" src="/icons/rating.svg" alt="rating" />
                        <p className="text-5xl items-center" >“</p>
                        <p>I've been using the e-wallet for over two years now, and I'm very satisfied with the ease of use. This has completely changed the way I shop and conduct financial transactions.</p>
                    </section>
                    <section>
                        <img className="m-auto md:hidden py-10" src="/icons/swipe-icon.svg" alt="swipe-icon" />
                    </section>
                    <section className="hidden md:flex">
                        <img src="/icons/rightArrow.svg" alt="next-button" />
                    </section>
                </section>
            </section>

            <section className="bg-gray-100/50 py-10 px-15 flex flex-col sm:text-center gap-5 md:flex-row-reverse md:items-center md:px-30">
            <section className="md:flex md:flex-col md:gap-10 md:text-left">

                <p className="text-4xl">Download The App</p>
                <p className="text-gray-600 text-lg">Ready to experience the future of payments? Download e-wallet now and enjoy a world of convenience at your fingertips.</p>
                <section className="flex justify-between gap-2">
                    <Button color="blue" className="text-white w-full flex px-3 cursor-pointer justify-center">
                        <img src="/icons/gplay.svg" alt="google play" />
                        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="text-white">
                            Play Store
                        </a>
                    </Button>
                    <Button color="white"  className="text-blue-600 border-blue-600 w-full justify-center flex">
                        <img src="/icons/blueAppstore.svg" alt="app store" />
                        <a href="https://apps.apple.com/app/id123456789" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                            App Store
                        </a>
                    </Button>
            </section>
                </section>
                <img src="/icons/Mobile Dashboard.svg" alt="mobile-dashboard" />
            </section>
        </main>
        <footer className="bg-blue-600 text-white flex flex-col md:py-15 gap-5 p-5 md:px-30">
            <section className="md:flex md:flex-row md:justify-between">
            <section className="flex flex-col gap-5 md:w-60">
                <section className="text-3xl items-center">
                    <Logo/>
                </section>
                <p className="text-lg pr-25 md:pr-0 md:text-base">Clarity gives you the blocks and components you need to create a truly professional website.</p>
            </section>
            <section className="flex flex-col gap-5">
                <p className="font-semibold text-xl">GET IN TOUCH</p>
                <section className="flex items-center font-semibold gap-1">
                    <img src="/icons/u_phone.svg" alt="phone" />
                    <p>+62 5637 8882 9901</p>
                </section>
                <section className="flex items-center font-semibold gap-2">
                    <img src="/icons/mail.svg" alt="mail" />
                    <p>contact@zwallet.com</p>
                </section>
            </section>
            <section className="flex flex-col gap-5">
                <p className="font-semibold text-xl">SOCIAL MEDIA</p>
                <section className="flex flex-row gap-3">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/twitter.svg" alt="twitter-icon" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/fb.svg" alt="facebook-icon" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/ig.svg" alt="instagram-icon" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <img src="/icons/github.svg" alt="github-icon" />
                    </a>
                </section>
            </section>
            <section className="flex flex-col gap-5">
                <p className="font-semibold text-xl">NEWSLETTER</p>
                <section className="rounded-md bg-white flex flex-row gap-2 p-4 md:p-2">
                    <img className="md:p-2" src="/icons/blackMail.svg" alt="mail" />
                    <input type="text" className="text-black md:text-sm focus:outline-0" placeholder="Enter Your Email"/>
                </section>
                <Button color="white" className="text-blue-600 p-3 md:p-1">Subscribe</Button>
            </section>
            </section>
            <section className="px-2 text-white text-center flex flex-col gap-5">
                <hr className="border-white" />
                <p>© Copyright 2022, All Rights Reserved by ClarityUI</p>
            </section>
        </footer>
        </section>
    )
}

export default LandingPage