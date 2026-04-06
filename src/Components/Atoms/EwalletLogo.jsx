export const Logo = ({className}) => {
    const defaultClass = "flex flex-row text-white font-semibold gap-2 items-center"
    const finalClass = `${defaultClass} ${className}`
    return (
        <section className={finalClass}>
            <img src="/src/assets/icons/Money Wallet.svg" alt="Ewallet-logo" />
            <p className={finalClass}>E-Wallet</p>
        </section>
    )
}

export const BlueLogo = ({className}) => {
    const defaultClass = "flex flex-row text-blue-600 font-semibold gap-2 items-center"
    const finalClass = `${defaultClass} ${className}`
    return (
        <section className={finalClass}>
            <img className="w-10" src="/src/assets/icons/Money Wallet.svg" alt="Ewallet-logo" />
            <p className={finalClass}>E-Wallet</p>
        </section>
    )
}

// function Logo(){
//     return(
//         <section className="ewallet-logo flex flex-row gap-2 items-center">
//             <img src="/src/assets/icons/Money Wallet.svg" alt="Ewallet Logo" />
//             <p className="text-white font-semibold" >E-Wallet</p>
//         </section>
//     )
// }
