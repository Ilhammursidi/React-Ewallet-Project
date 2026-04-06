/**
 * A logo component
 * @typedef {Object} LogoProps 
 * @param {Object} props - The properties for the logo
 * @param {string} props.className - class name for styling the logo
 * @returns {JSX.Element} The Logo component
 */

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



