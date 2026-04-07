/**
 * An Nominal input component
 * @typedef {Object} InputNominalProps
 * @param {Object} props - The properties for the input
 * @param {string} props.value - The value of the input
 * @param {function} props.onChange - The function to call when the input value changes
 * @param {string} props.className - class name for styling the input
 * @returns {JSX.Element} The InputNominal component
 */


export const InputNominal = ({value,onChange,className=""}) => {
    const defaultClass = "rounded-md bg-gray-100/30 px-5 p-3 text-sm border border-gray-400 flex flex-row gap-3 focus-within:border-blue-500 focus-within:border-2" 
    const finalClass = `${defaultClass} ${className}`
    return (
        <section className={finalClass}>
        <img  src="/icons/u_money-bill.svg" alt="money" />
        <input 
        className="focus:outline-none w-full" 
        type="text"
        inputmode="numeric"
        pattern="[0-9]*" 
        id="text"
        value={value}
        onChange={onChange}
        placeholder="Enter Nominal Transfer"/>
        </section>
    )
}
