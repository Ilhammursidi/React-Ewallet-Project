import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import { getReceivers } from "../../Redux/thunks/findReceiver";

export function FindPeople() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const BACKEND_URL = import.meta.env.VITE_API_URL
    const query = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page") || "1");
    const itemsPerPage = 10;
    
    const { receivers, isLoading, isError } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getReceivers({ page: 1, limit: 100 }));
    }, [dispatch]);

    const filteredData = receivers?.filter((row) => {
        const receiverName = row.receiver ? row.receiver.toLowerCase() : "";
        const phoneNumber = row.phone_number ? row.phone_number : ""; 
        
        return receiverName.includes(query.toLowerCase()) || phoneNumber.includes(query);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setSearchParams({ search: query, page: pageNumber.toString() });
    };

    const handleRowClick = (row) => {
        navigate(`user/${row.id}`, { state: { userData: row } });
    };

    return (
        <section>
            <section className="hidden md:flex flex-row gap-5 p-5">
                <section className="flex flex-row gap-2">
                    <span className="rounded-full flex w-6 bg-blue-600 justify-center text-white font-medium">1</span>
                    <span className="text-blue-600 font-medium">Find People</span>
                </section>
                <section className="text-gray-400">----------</section>
                <section className="flex flex-row gap-2">
                    <span className="rounded-full bg-gray-300 flex w-6 justify-center text-gray-600">2</span>
                    <span className="text-gray-500">Set Nominal</span>
                </section>
                <section className="text-gray-400">----------</section>
                <section className="flex flex-row gap-2">
                    <span className="rounded-full bg-gray-300 flex w-6 justify-center text-gray-600">3</span>
                    <span className="text-gray-500">Finish</span>
                </section>
            </section>

            <section className="px-5 py-3 md:border md:w-240 md:border-gray-300 md:rounded-md md:py-5">
                <section className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <p className="font-semibold text-lg">Find People</p>
                    <section className="flex items-center justify-between p-2 border border-gray-400 rounded mt-1 focus-within:border-blue-600 bg-white">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setSearchParams({ search: e.target.value, page: "1" })}
                            placeholder="Enter Number Or Fullname"
                            className="focus:outline-none bg-transparent" 
                        />
                        <img src="/icons/Search.svg" alt="search" className="w-5 h-5" />
                    </section>
                </section>

                <section className="py-5">
                    {isError && <p className="text-red-500 mb-3 font-medium">Error: {isError}</p>}

                    {isLoading ? (
                        <p className="text-center py-10 font-medium text-gray-500">Loading data penerima...</p>
                    ) : (
                        <table className="w-full [&_tr:nth-child(2n+1)]:bg-gray-50">
                            <tbody>
                                {currentItems?.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-10 text-gray-400">
                                            Data Not Found
                                        </td>
                                    </tr>
                                ) : (
                                    currentItems?.map((row) => (
                                        <tr 
                                            onClick={() => handleRowClick(row)} 
                                            key={row.id} 
                                            className="table-layout w-full text-xs md:text-base cursor-pointer hover:bg-blue-50 transition-colors"
                                        >
                                            <td className="p-2"><img src={`${BACKEND_URL}/${row.photo || "img/profiles/user_1781943518142517600.svg"}`} alt={row.receiver} className="w-9 h-9 rounded-full object-cover" /></td>
                                            <td className="p-2 font-medium">{row.receiver ? row.receiver.split("@")[0] : "-"}</td>
                                            <td className="p-2 text-gray-600">{row.phone_number || "-"}</td>
                                            <td className="p-2"><img src="/icons/Star.svg" alt="star" className="w-5 h-5" /></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}

                    {!isLoading && (
                        <section className="flex justify-center items-center gap-4 mt-6">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => paginate(currentPage - 1)}
                                className="px-3 py-1 border rounded disabled:opacity-30 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Prev
                            </button>

                            <span className="text-sm text-gray-600">
                                Page <strong className="text-gray-900">{currentPage}</strong> of {totalPages || 1}
                            </span>

                            <button
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => paginate(currentPage + 1)}
                                className="px-3 py-1 border rounded disabled:opacity-30 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Next
                            </button>
                        </section>
                    )}
                </section>
            </section>
        </section>
    );
}
