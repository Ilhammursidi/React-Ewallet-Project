import { Button } from "../../Components/Atoms/Button";
import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { useState } from "react";
import { Modal } from "../../Components/Atoms/Modal";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";

/**
 * a component that shows the history of transactions, with a search bar to filter the transactions by name or phone number. The data is hardcoded for now, but it can be replaced with real data from an API in the future.
 * @typedef {Object} HistoryProps
 * @param {Object} props - The properties for the History component 
 * @returns {JSX.Element} The History component
 */

export const History = () => {
    const user = useSelector((state) => state.auth.currentUser)
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectData, setSelectData] = useState(null);
    
    const query = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page") || "1")
    const itemsPerPage = 5;
    
    const data = user?.history || []
    
    // [
    //     {
    //         id: 1,
    //         name: "Ghaluh 1",
    //         phone: "082134348877",
    //         img: "/icons/Table cell.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 2,
    //         name: "Jhon Cena",
    //         phone: "(239) 555-0108",
    //         img: "/icons/Table cell-1.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 3,
    //         name: "Young Lex",
    //         phone: "(239) 453-7432",
    //         img: "/icons/Table cell-2.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 4,
    //         name: "Bruno Mars",
    //         phone: "(239) 009-9231",
    //         img: "/icons/Table cell-3.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 5,
    //         name: "Bruno Pluto",
    //         phone: "(239) 555-2000",
    //         img: "/icons/Table cell-4.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 6,
    //         name: "Bruno Bogor",
    //         phone: "081524249988",
    //         img: "/icons/Table cell-5.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 7,
    //         name: "Bruno G Putri",
    //         phone: "(239) 555-0108",
    //         img: "/icons/Table cell-6.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 8,
    //         name: "Bruno wanher",
    //         phone: "(239) 555-2000",
    //         img: "/icons/Table cell-4.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 9,
    //         name: "Bruno D Garut",
    //         phone: "081524249988",
    //         img: "/icons/Table cell-5.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 10,
    //         name: "Bruno G Mau",
    //         phone: "(239) 555-0108",
    //         img: "/icons/Table cell-6.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 11,
    //         name: "Bruno Dulu",
    //         phone: "(239) 555-2000",
    //         img: "/icons/Table cell-4.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 12,
    //         name: "Bruno Asin",
    //         phone: "081524249988",
    //         img: "/icons/Table cell-5.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 13,
    //         name: "Bruno D Luar",
    //         phone: "(239) 555-0108",
    //         img: "/icons/Table cell-6.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 14,
    //         name: "Luffy D depan",
    //         phone: "(239) 555-2000",
    //         img: "/icons/Table cell-4.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 15,
    //         name: "Bruno Tegal",
    //         phone: "081524249988",
    //         img: "/icons/Table cell-5.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 16,
    //         name: "Bruno Jombang",
    //         phone: "(239) 555-0108",
    //         img: "/icons/Table cell-6.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 17,
    //         name: "Ali D Luar",
    //         phone: "(239) 555-0108",
    //         img: "/icons/Table cell-6.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 18,
    //         name: "Pando D depan",
    //         phone: "(239) 555-2000",
    //         img: "/icons/Table cell-4.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 19,
    //         name: "Vina Tegal",
    //         phone: "081524249988",
    //         img: "/icons/Table cell-5.svg",
    //         amount: "Rp.50.000"
    //     },
    //     {
    //         id: 20,
    //         name: "Siska Jombang",
    //         phone: "(239) 555-0108",
    //         img: "/icons/Table cell-6.svg",
    //         amount: "Rp.50.000"
    //     }
    // ];
    const filteredData = data.filter((row) => {
        return row.name?.toLowerCase().includes(query.toLowerCase())
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setSearchParams({ search: query, page: pageNumber.toString() });
    };

    const handleRowClick = (row) => {
        setIsOpen(true);
        setSelectData(row);
    }
    
    return (
        <section>
            <AppHeader className="md:bg-white"/>
                <Modal isOpen={isOpen} value="Back" onClose={() => setIsOpen(false)}>
                    {selectData && (
                        <section className="flex bg-white flex-col w-80 p-2 md:h-115 rounded-md h-fit">
                            <p className="text-sm" key={selectData.id}>DETAIL TRANSACTION {selectData.name}</p>
                            <hr className=" border border-gray-200" />
                            <img className="w-30" src={selectData.img} alt={selectData.name} />
                            <p className="font-semibold">Name :</p>
                            <p>{selectData.name}</p>
                            <p className="font-semibold">Phone :</p>
                            <p>{selectData.phone}</p>
                            <p className="font-semibold">Status :</p>
                            <p {...(selectData.id % 2 !== 0 ? { className: "text-green-500" } : { className: "text-red-500" })}>
                                        {selectData.id % 2 !== 0 ? "Top Up Success" : "Transfer Success"}</p>
                            <p className="font-semibold">Amount :</p>
                            <p {...(selectData.id % 2 !== 0 ? { className: "text-green-500" } : { className: "text-red-500" })}>
                                        {selectData.amount}</p>
                            <Button className="flex flex-row items-center justify-center w-full border p-2 mt-2 border-red-600">
                                <img src="/icons/Trash.svg" alt="delete" />
                                <p className="font-semibold text-red-600">Delete</p>
                                </Button>
                                <Button color="blue" className="mt-2" onClick={()=> setIsOpen(false)}>Back</Button>
                        </section>
                    )}
                    </Modal>
                <section className="md:flex md:justify-between w-full">
            <SideBar></SideBar>
            <section className="hidden md:block w-50"></section>
             
                <section className="md:flex flex-col md:w-5/6 md:px-5">
                    <section className="hidden md:flex md:h-5 md:mr-auto md:gap-2 items-center font-medium md:m-5 ">
                        <img src="/icons/blueHistory.svg" alt="history" />
                        <p>History Transaction</p>
                    </section>

                <section className="px-5 py-3 md:border md:w-240 md:border-gray-300 md:rounded-md md:py-5">

                <section className="flex flex-col md:flex-row md:justify-between md:items-center">

                    <p className="font-semibold">Find Transaction</p>
                    <section className="flex items-center justify-between p-2 border border-gray-500 rounded mt-1 focus-within:border-blue-600">
                    <input 
                    type="text"
                    value={query} 
                    onChange={(e) => setSearchParams({search: e.target.value})}
                    placeholder="Enter Number Or Fullname" 
                    className="focus:outline-none "/>                    
                        <img src="/icons/Search.svg" alt="search" />
                    </section>

                </section>
                    

                    <section className=" py-5">
                    <table className="w-full [&_tr:nth-child(2n+1)]:bg-gray-100">
                        <tbody>

                            {currentItems.map((row) => (
                                <tr onClick={() => handleRowClick(row)} key={row.id} className="table-layout w-full text-xs">
                                    <td><img className={row.type === "Top Up" ? "w-10 m-auto" : "w-15 m-auto"} src={row.type === "Top Up" ? user?.photoProfile : row.img} alt={row.name} /></td>
                                    
                                    <td>{row.type === "Top Up" ? user?.fullName : row.name}</td>
                                    <td>{row.type === "Top Up" ? user?.phone : row.phone}</td>
                                    <td {...(row.type === "Top Up" ? { className: "text-green-500" } : { className: "text-red-500" })}>
                                        {row.amount}
                                    </td>
                                    <td><img src="/icons/Trash.svg" alt="trash" /></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <section className="flex justify-center items-center gap-4 mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-30"
                        >
                            Prev
                        </button>

                        <span className="text-sm">
                            Page <strong>{currentPage}</strong> of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => paginate(currentPage + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-30"
                        >
                            Next
                        </button>
                    </section>
                </section>
                    </section>

                </section>

            </section>
        </section>
    )
}