import "./ButtonElements.css"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


export const ButtonElements = ({currentPage,setCurrentPage,filteredUsers,usersPerPage,users}) => {
    
    const totalPage = Math.ceil(filteredUsers.length > 0 ? filteredUsers.length/usersPerPage : users.length/usersPerPage)

    const pageNumbers = Array.from({length: totalPage},(_,index)=>index+1)
    return (
    <div className="buttonElements">
        <button 
            onClick={()=>setCurrentPage(1)} 
            disabled={currentPage === 1}
            style={{cursor:"pointer"}}
            >
            <KeyboardDoubleArrowLeftIcon/>
        </button>

        <button 
            onClick={()=>setCurrentPage(currentPage-1)} 
            disabled={currentPage === 1}
            style={{cursor:"pointer"}}
            >
            <KeyboardArrowLeftIcon/>
        </button>

        {pageNumbers.map((pageNumber)=>(
            <button
                key={pageNumber}
                onClick={()=>setCurrentPage(pageNumber)}
                className={`page ${currentPage === pageNumber ? "active":""}`}
            >
                {pageNumber}
            </button>
        ))}

        <button 
            onClick={()=>setCurrentPage(currentPage+1)} 
            disabled={currentPage*usersPerPage >= (filteredUsers.length > 0 ? filteredUsers.length : users.length)}
            style={{cursor:"pointer"}}
            >
            <KeyboardArrowRightIcon/>
        </button>
        <button 
            onClick={()=>setCurrentPage(filteredUsers.length>0? Math.ceil(filteredUsers.length/usersPerPage) : Math.ceil(users.length/usersPerPage))} 
            disabled={currentPage*usersPerPage >= (filteredUsers.length>0 ? filteredUsers.length : users.length)}
            style={{cursor:"pointer"}}
        >
            <KeyboardDoubleArrowRightIcon/>
        </button>
    </div>
  )
}
