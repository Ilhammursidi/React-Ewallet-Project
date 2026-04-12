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

export const Modal = ({isOpen, onClose, children}) => {
    if(!isOpen) return null;
    return (
        <section >
            <section onClick={onClose} className="fixed top-10 inset-0 bg-black/60 flex items-center justify-center">
                <section onClick={(e) => e.stopPropagation() } className="bg-white p-5 rounded-lg">
                    {children}
                </section>
            </section>
        </section>
    )
}