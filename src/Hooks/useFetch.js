import { useState,useEffect } from "react";
/**
 * a fetch data custom hook
 * @param {url} url to fetch
 */

export function useFetch(url) {
    const[data ,setData] = useState("")
    const[isError, setError] = useState("")
    const[isLoading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)
        setError("")
        
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                if(!response.ok) throw new Error(`${response.error}:${response.status}`)
                const data = await response.json()
                setData(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData();

    },[url])

    return {data, isError, isLoading}
    }






























// export function useFetch(url) {
//     const [isLoading, setLoading] = useState(true)
//     const [isError, setError] = useState("")
//     const [dataFetch, setDataFetch] = useState("")
    
    
//     useEffect(()=>{
        
//         setLoading(true)
//         setError("")

//         const fetchData = async () => {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) throw new Error(`${response.status}:${response.statusText}`);
//             const data = await response.json();
//             const result = data.results
//             setDataFetch(result)
//         } catch (error) {
//             setError(error.message)
//         } finally {
//             setLoading(false)
//         }
//     }
//     fetchData();
    
// },[url])


//  return {dataFetch,isLoading,isError}   
// }