import { Button } from "../../Components/Atoms/Button";
import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { useEffect, useState } from "react";
import { Modal } from "../../Components/Atoms/Modal";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory } from "../../Redux/thunks/findHistory";

export const History = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectData, setSelectData] = useState(null);
    const dispatch = useDispatch();
    const BACKEND_URL = import.meta.env.VITE_API_URL
    const { history, totalPages = 1, data: currentUser, isLoading, error: isError } = useSelector((state) => state.users);

    const query = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const currentItems = history || [];

    useEffect(() => {
        dispatch(getTransactionHistory({ page: currentPage, search: query }));
    }, [dispatch, currentPage, query]);

    const [searchInput, setSearchInput] = useState(query);

useEffect(() => {
    const timer = setTimeout(() => {
        const trimmed = searchInput.trim();
        if (trimmed !== query) {
            setSearchParams({ search: trimmed, page: "1" });
        }
    }, 500);
    return () => clearTimeout(timer);
}, [searchInput]);

useEffect(() => {
    setSearchInput(query);
}, [query]);

const triggerSearchNow = () => {
    const trimmed = searchInput.trim();
    setSearchParams({ search: trimmed, page: "1" });
};


    const paginate = (pageNumber) => {
        setSearchParams({ search: query, page: pageNumber.toString() });
    };

    const handleRowClick = (row) => {
        setSelectData(row);
        setIsOpen(true);
    };

    const isModalTopUp = selectData?.type?.toUpperCase().replace(/\s+/g, '') === "TOPUP";

    const isModalTransferIn = selectData?.type?.toUpperCase().replace(/\s+/g, '') === "TRANSFER" && String(currentUser?.id) === String(selectData?.receiver_id);

    const isModalTransferOut = selectData?.type?.toUpperCase().replace(/\s+/g, '') === "TRANSFER" && String(currentUser?.id) === String(selectData?.sender_id);

    const userPhoto = currentUser?.photo?.length > 0 ? currentUser.photo : "img/profiles/user_1781943518142517600.svg";

    let otherPhoto = "-"
    if (isModalTransferIn) {
        otherPhoto = selectData?.sender_photo || "img/profiles/user_1781943518142517600.svg";
    } else if (isModalTransferOut) {
        otherPhoto = selectData?.receiver_photo || "img/profiles/user_1781943518142517600.svg";
    }
    
    let displayName = "-"
    if (isModalTopUp) {
        displayName = "Top Up";
    } else if (isModalTransferIn) {
        displayName = selectData?.sender_name;
    } else if (isModalTransferOut) {
        displayName = selectData?.receiver_name;
    }

    let status = "-"
    if (isModalTopUp) {
        status = "Top Up Success";
    } else if (isModalTransferIn) {
        status = "Receive Success"
    } else if (isModalTransferOut) {
        status = "Transfer Success"
    }

    let phoneNumber = "-"
    if (isModalTransferIn) {
        phoneNumber = selectData?.sender_number;
    } else if (isModalTransferOut) {
        phoneNumber = selectData?.phone_number;
    }

    return (
        <section>
            <AppHeader className="md:bg-white" />

            {/* MODAL DETAIL */}
            <Modal isOpen={isOpen} value="Back" onClose={() => setIsOpen(false)}>
                {selectData && (
                            <section className="flex bg-white flex-col w-80 p-2 md:h-115 rounded-md h-fit">
                        <p className="text-sm font-semibold mb-2">DETAIL TRANSACTION</p>
                        <hr className="border border-gray-200" />
                        <img
                            className="w-20 h-20 rounded-full mx-auto my-3 object-cover"
                            src={isModalTopUp ? `${BACKEND_URL}/${userPhoto}` : `${BACKEND_URL}/${otherPhoto}`}
                            alt={selectData.name || "Transaction"}
                            />

                        <p className="font-semibold text-xs text-gray-500 mt-1">Name :</p>
                        <p className="text-sm font-medium">{displayName}</p>

                        <p className="font-semibold text-xs text-gray-500 mt-1">Phone :</p>
                        <p className="text-sm font-medium">{phoneNumber}</p>

                        <p className="font-semibold text-xs text-gray-500 mt-1">Status :</p>
                        <p className={isModalTopUp || isModalTransferIn ? "text-green-500 text-sm font-medium" : "text-red-500 text-sm font-medium"}>
                            {status}
                        </p>

                        <p className="font-semibold text-xs text-gray-500 mt-1">Amount :</p>
                        <p className={isModalTopUp || isModalTransferIn ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                            {isModalTopUp || isModalTransferIn ? `+ Rp ${selectData.amount.toLocaleString("id-ID")}` : `- Rp ${selectData.amount.toLocaleString("id-ID")}`}
                        </p>

                        <Button className="flex flex-row items-center justify-center w-full border p-2 mt-4 border-red-600 rounded">
                            <img src="/icons/Trash.svg" alt="delete" className="mr-1" />
                            <p className="font-semibold text-red-600">Delete</p>
                        </Button>
                        <Button color="blue" className="mt-2" onClick={() => setIsOpen(false)}>Back</Button>
                    </section>
                )}
            </Modal>

            <section className="md:flex md:justify-between w-full">
                <SideBar />
                <section className="hidden md:block w-50"></section>

                <section className="md:flex flex-col md:w-5/6 md:px-5">
                    <section className="hidden md:flex md:h-5 md:mr-auto md:gap-2 items-center font-medium md:m-5 ">
                        <img src="/icons/blueHistory.svg" alt="history" />
                        <p>History Transaction</p>
                    </section>

                    <section className="px-5 py-3 md:border md:w-240 md:border-gray-300 md:rounded-md md:py-5 bg-white">
                        <section className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <p className="font-semibold">Find Transaction</p>
                            <section className="flex items-center justify-between p-2 border border-gray-500 rounded mt-1 focus-within:border-blue-600">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e)=> setSearchInput(e.target.value)}
                                    onKeyDown={(e)=>{
                                        if(e.key === "Enter") triggerSearchNow();
                                    }}
                                    placeholder="Enter Number Or Fullname"
                                    className="focus:outline-none bg-transparent"
                                />
                                <img src="/icons/Search.svg" onClick={triggerSearchNow} alt="search" />
                            </section>
                        </section>

                        <section className="py-5">
                            {isError && <p className="text-red-500 text-sm mb-2">{isError}</p>}

                            {isLoading ? (
                                <p className="text-center py-10 text-gray-500 font-medium">Loading history...</p>
                            ) : (
                                <table className="w-full [&_tr:nth-child(2n+1)]:bg-gray-50">
                                    <tbody>
                                        {currentItems.length === 0 ? (
                                            <tr key="no-data">
                                                <td colSpan="5" className="text-center py-10 text-gray-400">No transactions found.</td>
                                            </tr>
                                        ) : (
                                            currentItems.map((row) => {
                                                const isRowTopUp = row.type?.toUpperCase().replace(/\s+/g, '') === "TOPUP";

                                                const isRowTransferIn = row.type?.toUpperCase().replace(/\s+/g, '') === "TRANSFER" && String(currentUser?.id) === String(row.receiver_id);

                                                const isRowTransferOut = row.type?.toUpperCase().replace(/\s+/g, '') === "TRANSFER" && String(currentUser?.id) === String(row.sender_id);

                                                const userPhoto = currentUser?.photo?.length > 0 ? currentUser.photo : "img/profiles/user_1781943518142517600.svg";

                                                let displayPhoto = "-";
                                                if (isRowTopUp) {
                                                    displayPhoto = userPhoto;
                                                } else if (isRowTransferIn) {
                                                    displayPhoto = row.sender_photo;
                                                } else if (isRowTransferOut) {
                                                    displayPhoto = row.receiver_photo;
                                                }

                                                let displayPhone = "-";
                                                if (isRowTransferIn) {
                                                    displayPhone = row.sender_number;
                                                } else if (isRowTransferOut) {
                                                    displayPhone = row.phone_number;
                                                }

                                                let displayName = "-"
                                                if (isRowTopUp) {
                                                    displayName = "Top Up"
                                                } else if (isRowTransferIn) {
                                                    displayName = row.sender_name;
                                                } else if (isRowTransferOut) {
                                                    displayName = row.receiver_name;
                                                }

                                                return (
                                                    <tr key={row.transaction_id} className="table-layout w-full text-xs cursor-pointer hover:bg-gray-100 transition-colors">
                                                        <td className="p-2" onClick={() => handleRowClick(row)}>
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover m-auto"
                                                                src={`${BACKEND_URL}/${displayPhoto}`}
                                                                alt={row.name}
                                                            />
                                                        </td>
                                                        <td className="p-2" onClick={() => handleRowClick(row)}>
                                                            {displayName}
                                                        </td>
                                                        <td className="p-2 text-center" onClick={() => handleRowClick(row)}>
                                                            {isRowTopUp ? row.payment_method_name : "E-Wallet" }
                                                        </td>
                                                        <td className="p-2 text-center" onClick={() => handleRowClick(row)}>
                                                            {displayPhone}
                                                        </td>
                                                        <td className={`p-2 font-medium text-center ${isRowTopUp || isRowTransferIn ? "text-green-500" : "text-red-500"}`} onClick={() => handleRowClick(row)}>
                                                            {isRowTopUp || isRowTransferIn ? `+ Rp ${row.amount.toLocaleString("id-ID")}` : `- Rp ${row.amount.toLocaleString("id-ID")}`}
                                                        </td>
                                                        <td className="p-2 text-center">
                                                            <button className="hover:opacity-60 transition-opacity">
                                                                <img src="/icons/Trash.svg" alt="trash" className="w-5 h-5 mx-auto" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                              })
                                        )}
                            
                                    </tbody>
                                </table>
                            )}
                        </section>
                    </section>
                </section>
            </section>

            {/* PAGINATION */}
            {!isLoading && (
                <section className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-30 hover:bg-gray-50"
                    >
                        Prev
                    </button>

                    <span className="text-sm">
                        Page <strong>{currentPage}</strong> of {totalPages || 1}
                    </span>

                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => paginate(currentPage + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-30 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </section>
            )}
        </section>
    );
};