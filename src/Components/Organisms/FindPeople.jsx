import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";

export function FindPeople() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page") || "1")
    const itemsPerPage = 5;

    const data = [
        {
            id: 1,
            name: "Ghaluh 1",
            phone: "082134348877",
            img: "/icons/Table cell.svg",
        },
        {
            id: 2,
            name: "Jhon Cena",
            phone: "(239) 555-0108",
            img: "/icons/Table cell-1.svg",
        },
        {
            id: 3,
            name: "Young Lex",
            phone: "(239) 453-7432",
            img: "/icons/Table cell-2.svg",
        },
        {
            id: 4,
            name: "Bruno Mars",
            phone: "(239) 009-9231",
            img: "/icons/Table cell-3.svg",
        },
        {
            id: 5,
            name: "Bruno Pluto",
            phone: "(239) 555-2000",
            img: "/icons/Table cell-4.svg",
        },
        {
            id: 6,
            name: "Bruno Bogor",
            phone: "081524249988",
            img: "/icons/Table cell-5.svg",
        },
        {
            id: 7,
            name: "Bruno G Putri",
            phone: "(239) 555-0108",
            img: "/icons/Table cell-6.svg",
        },
        {
            id: 8,
            name: "Bruno wanher",
            phone: "(239) 555-2000",
            img: "/icons/Table cell-4.svg",
        },
        {
            id: 9,
            name: "Bruno D Garut",
            phone: "081524249988",
            img: "/icons/Table cell-5.svg",
        },
        {
            id: 10,
            name: "Bruno G Mau",
            phone: "(239) 555-0108",
            img: "/icons/Table cell-6.svg",
        },
        {
            id: 11,
            name: "Bruno Dulu",
            phone: "(239) 555-2000",
            img: "/icons/Table cell-4.svg",
        },
        {
            id: 12,
            name: "Bruno Asin",
            phone: "081524249988",
            img: "/icons/Table cell-5.svg",
        },
        {
            id: 13,
            name: "Bruno D Luar",
            phone: "(239) 555-0108",
            img: "/icons/Table cell-6.svg",
        },
        {
            id: 14,
            name: "Luffy D depan",
            phone: "(239) 555-2000",
            img: "/icons/Table cell-4.svg",
        },
        {
            id: 15,
            name: "Bruno Tegal",
            phone: "081524249988",
            img: "/icons/Table cell-5.svg",
        },
        {
            id: 16,
            name: "Bruno Jombang",
            phone: "(239) 555-0108",
            img: "/icons/Table cell-6.svg",
        },
        {
            id: 17,
            name: "Ali D Luar",
            phone: "(239) 555-0108",
            img: "/icons/Table cell-6.svg",
        },
        {
            id: 18,
            name: "Pando D depan",
            phone: "(239) 555-2000",
            img: "/icons/Table cell-4.svg",
        },
        {
            id: 19,
            name: "Vina Tegal",
            phone: "081524249988",
            img: "/icons/Table cell-5.svg",
        },
        {
            id: 20,
            name: "Siska Jombang",
            phone: "(239) 555-0108",
            img: "/icons/Table cell-6.svg",
        }
    ];

    const filteredData = data.filter((row) => {
        return row.name.toLowerCase().includes(query.toLowerCase()) || row.phone.includes(query);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
                    <span className="rounded-full flex w-6 bg-blue-600 justify-center text-white">1</span>
                    <span className="text-blue-600">Find People</span>
                </section>
                <section>----------</section>
                <section className="flex flex-row gap-2">
                    <span className="rounded-full bg-gray-600 flex w-6 justify-center text-white">2</span>
                    <span className="text-gray-600">Set Nominal</span>
                </section>
                <section>----------</section>
                <section className="flex flex-row gap-2">
                    <span className="rounded-full bg-gray-600 flex w-6 justify-center text-white">3</span>
                    <span className="text-gray-600">Finish</span>
                </section>
            </section>


            <section className="px-5 py-3 md:border md:w-240 md:border-gray-300 md:rounded-md md:py-5">

                <section className="flex flex-col md:flex-row md:justify-between md:items-center">

                    <p className="font-semibold">Find People</p>
                    <section className="flex items-center justify-between p-2 border border-gray-500 rounded mt-1 focus-within:border-blue-600">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setSearchParams({ search: e.target.value })}
                            placeholder="Enter Number Or Fullname"
                            className="focus:outline-none " />
                        <img src="/icons/Search.svg" alt="search" />
                    </section>
                </section>
                <section className=" py-5">
                    <table className="w-full [&_tr:nth-child(2n+1)]:bg-gray-100">
                        <tbody>

                            {currentItems.map((row) => (
                                <tr onClick={() => handleRowClick(row)} key={row.id} className="table-layout w-full text-xs md:text-base">
                                    <td><img src={row.img} alt={row.name} /></td>
                                    <td>{row.name}</td>
                                    <td>{row.phone}</td>

                                    <td><img src="/icons/Star.svg" alt="star" /></td>
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
    )
}
