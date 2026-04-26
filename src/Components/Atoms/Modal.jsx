/**
 * 
 * @typedef {Object} ModalProps
 * @param {Object} props - The properties for the Modal component
 * @param {boolean} props.isOpen - A boolean indicating whether the modal is open or not 
 * @param {string} props.value - The text for the modal's close button
 * @param {Function} props.onClose - The function to call when the modal is closed
 * @param {React.ReactNode} props.children - The content to display inside the modal
 * @returns {JSX.Element} The Modal component
 */

export const Modal = ({className,isOpen, onClose, children,inner}) => {
    if(!isOpen) return null;
    const defaultClass = "fixed top-10 inset-0 bg-black/60 flex items-center justify-center"
    const defaulInner = "bg-white rounded-lg"
    
    return (
        <section>
            <section onClick={onClose} className={`${defaultClass} ${className}`}>
                <section onClick={(e) => e.stopPropagation()} className={`${inner} ${defaulInner}`}>
                    {children}
                </section>
            </section>
        </section>
    )
}