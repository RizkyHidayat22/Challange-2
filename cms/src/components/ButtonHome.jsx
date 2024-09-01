import { Link } from "react-router-dom";


export default function ButtonHome (){
    
    return (
        <>
        <button className="bg-lightblue p-2.5 rounded-5px text-white">
            <Link to={('/')}>Kembali ke Beranda</Link>
        </button>
        </>
    )
}