import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { useState } from "react";
import { NavLink } from "react-router";

/**
 * a component that shows the history of transactions, with a search bar to filter the transactions by name or phone number. The data is hardcoded for now, but it can be replaced with real data from an API in the future.
 * @typedef {Object} HistoryProps
 * @param {Object} props - The properties for the History component 
 * @returns {JSX.Element} The History component
 */

export const Transfer = () => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectData, setSelectData] = useState({});
    const data = [
        {
            id: 1,
            name: "Ghaluh 1",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell.svg",
        },
        {
            id: 2,
            name: "Jhon Cena",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-1.svg",
        },
        {
            id: 3,
            name: "Young Lex",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-2.svg",
        },
        {
            id: 4,
            name: "Bruno Mars",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-3.svg",
        },
        {
            id: 5,
            name: "Bruno Pluto",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-4.svg",
        },
        {
            id: 6,
            name: "Bruno Bogor",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-5.svg",
        },
        {
            id: 7,
            name: "Bruno G Putri",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-6.svg",
        }
    ];

    const filteredData = data.filter((row) => {
        return row.name.toLowerCase().includes(query.toLowerCase()) || row.phone.includes(query);
    });

    const handleRowClick = (row) => {
        setIsOpen(true);
        setSelectData(row);
    }
    
    return (
        <section>
            <AppHeader className="md:bg-white"/>
                <section className="md:flex md:justify-between w-full">
            <SideBar></SideBar>
                
                <section className="md:flex flex-col md:w-5/6 md:px-5">
                    <section className="hidden md:flex md:h-5 md:mr-auto md:gap-2 items-center font-medium md:m-5 ">
                        <img src="/src/assets/icons/blueSend.svg" alt="send" />
                        <p>Transfer Money</p>
                    </section>

                    <section className="hidden md:flex md:flex-col md:gap-4">
                        
                        <section className="hidden md:flex flex-row gap-5 p-5">
                            <section className="flex flex-row gap-2">
                                <span className="rounded-full bg-blue-600 flex w-6 justify-center text-white">1</span>
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
                            
                            
                        

                
                    </section>

                <section className="px-5 py-3 md:border md:w-240 md:border-gray-300 md:rounded-md md:py-5">

                <section className="flex flex-col md:flex-row md:justify-between md:items-center">

                    <p className="font-semibold">Find People</p>
                    <section className="flex items-center justify-between p-2 border border-gray-500 rounded mt-1 focus-within:border-blue-600">
                    <input 
                    type="text" 
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter Number Or Fullname" 
                    className="focus:outline-none "/>                    
                        <img src="/src/assets/icons/Search.svg" alt="search" />
                    </section>

                </section>
                    

                    <section className=" py-5">
                    <table className="w-full [&_tr:nth-child(2n+1)]:bg-gray-100">
                        <tbody>

                            {filteredData.map((row) => (
                                <tr onClick={() => handleRowClick(row)} key={row.id} className="table-layout w-full text-xs md:text-base">
                                    <td><img src={row.img} alt={row.name} /></td>
                                    <td>{row.name}</td>
                                    <td>{row.phone}</td>
                                    
                                    <td><img src="/src/assets/icons/Star.svg" alt="star" /></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </section>
                    </section>

                </section>

            </section>
        </section>
    )
}