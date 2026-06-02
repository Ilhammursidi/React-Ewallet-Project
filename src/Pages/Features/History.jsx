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

    const { history, totalPages = 1, currentUser, isLoading, isError } = useSelector((state) => state.users);
    
    const query = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        dispatch(getTransactionHistory({ page: currentPage, search: query }));
    }, [dispatch, currentPage, query]);

    const currentItems = history || [];

    const paginate = (pageNumber) => {
        setSearchParams({ search: query, page: pageNumber.toString() });
    };
    
    const handleRowClick = (row) => {
        setSelectData(row);
        setIsOpen(true);
    };

    const isModalTypeTopUp = selectData?.type?.toUpperCase().replace(/\s+/g, '') === "TOPUP";

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
                            src={isModalTypeTopUp ? selectData.receiver_photo : (selectData.sender_photo || "/icons/userone.svg")} 
                            alt={selectData.name || "Transaction"} 
                        />

                        <p className="font-semibold text-xs text-gray-500 mt-1">Name :</p>
                        <p className="text-sm font-medium">{selectData.receiver_name || "Unknown"}</p>

                        <p className="font-semibold text-xs text-gray-500 mt-1">Phone :</p>
                        <p className="text-sm font-medium">{selectData.phone || "-"}</p>

                        <p className="font-semibold text-xs text-gray-500 mt-1">Status :</p>
                        <p className={isModalTypeTopUp ? "text-green-500 text-sm font-medium" : "text-red-500 text-sm font-medium"}>
                            {isModalTypeTopUp ? "Top Up Success" : "Transfer Success"}
                        </p>

                        <p className="font-semibold text-xs text-gray-500 mt-1">Amount :</p>
                        <p className={isModalTypeTopUp ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                            {isModalTypeTopUp ? `+ ${selectData.amount}` : `- ${selectData.amount}`}
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
                                    value={query}
                                    onChange={(e) => setSearchParams({ search: e.target.value, page: "1" })}
                                    placeholder="Enter Number Or Fullname"
                                    className="focus:outline-none bg-transparent"
                                />
                                <img src="/icons/Search.svg" alt="search" />
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
                                                return (
                                                    <tr key={row.transaction_id} className="table-layout w-full text-xs cursor-pointer hover:bg-gray-100 transition-colors">
                                                        <td className="p-2" onClick={() => handleRowClick(row)}>
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover m-auto"
                                                                src={isRowTopUp ? (currentUser?.photoProfile || "/icons/userone.svg") : (row.img || "/icons/userone.svg")}
                                                                alt={row.name}
                                                            />
                                                        </td>
                                                        <td className="p-2" onClick={() => handleRowClick(row)}>
                                                            {isRowTopUp ? (currentUser?.fullName || currentUser?.email?.split("@")[0] || "Me") : row.name}
                                                        </td>
                                                        <td className="p-2" onClick={() => handleRowClick(row)}>
                                                            {isRowTopUp ? (currentUser?.phone || "-") : row.phone}
                                                        </td>
                                                        <td className={`p-2 font-medium ${isRowTopUp ? "text-green-500" : "text-red-500"}`} onClick={() => handleRowClick(row)}>
                                                            {isRowTopUp ? `+ ${row.amount.toLocaleString("id-ID")}` : `- ${row.amount.toLocaleString("id-ID")}`}
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