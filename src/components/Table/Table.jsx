import "./Table.css"
import { useEffect, useState } from "react"
import {Users as UsersTable} from "../Users/Users"
import { ButtonElements } from "../ButtonElements/ButtonElements";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Table = () => {

    const [ users, setUsers ] = useState([]);
    const [ filteredUsers, setFilteredUsers ] = useState([]);
    const [ searchItem, setSearchItem ] = useState('')
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ selectedRows, setSelectedRows ] = useState([]);
    const usersPerPage = 10;
    const totalPage = Math.ceil(filteredUsers.length > 0 ? filteredUsers.length/usersPerPage : users.length/usersPerPage)
    const totalRows = filteredUsers.length > 0 ? filteredUsers.length : users.length;
    
    useEffect(()=>{
        const getUsers = async() =>{
            try{
                const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",{
                    method:"GET"
                });
                const data = await res.json();
                setUsers(data);
            }catch(err){
                console.log("Failed to fetch the details", err)
            }
        }
        getUsers();

    },[])

    useEffect(()=>{
        const filtered = users.filter(user => 
            Object.values(user).some(value => 
                value.toLowerCase().includes(searchItem.toLowerCase())
            )
        )
        setFilteredUsers(filtered);
        setCurrentPage(1);
    },[users,searchItem]);

    const handleSearch = (e) =>{
        setSearchItem(e.target.value);
    }

    const handleDelete = () =>{
        const updateNewUser = users.filter((user)=> !selectedRows.includes(user.id))
        setUsers(updateNewUser)
        setSelectedRows([])
    }

    return (
        <div className="userTable">
            <h1 style={{textAlign: "center"}}>Users Table</h1>

            <div className="topWrapper">
                <input 
                    type="text" 
                    style={{height:"100%"}}
                    className="triggerSearch" 
                    placeholder="Search..." 
                    name="Search" 
                    id="Search" 
                    value={searchItem} 
                    onChange={handleSearch} 
                />
                <button 
                    onClick={()=>handleDelete()} 
                    className="deleteMain"
                    disabled={selectedRows.length === 0}
                >
                    <DeleteOutlineIcon/>
                </button>
            </div>

            <UsersTable 
                users={filteredUsers.length > 0 ? filteredUsers : users} 
                currentPage={currentPage} 
                usersPerPage={usersPerPage}
                setUsers={setUsers}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />

            <div className="bottomWrapper">
                <div>{selectedRows.length} of {totalRows} row(s) selected</div>
                <div>Page {currentPage} of {totalPage}</div>
                <ButtonElements 
                    currentPage={currentPage} 
                    users={users} 
                    setCurrentPage={setCurrentPage} 
                    filteredUsers={filteredUsers} 
                    usersPerPage={usersPerPage} 
                />           
            </div>
        </div>
    )
}
