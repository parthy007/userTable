import { useEffect, useState } from "react";
import "./Users.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export const Users = ({users,currentPage,usersPerPage,setUsers,selectedRows,setSelectedRows}) => {

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToDisplay = users.slice(startIndex,endIndex);

    const [ usersOnPage, setUsersOnPage ] = useState(usersToDisplay)
    const [ isCheckedAll, setIsCheckedAll ] = useState(false);
    const [ editingUserId, setEditingUserId ] = useState(null);
    const [ editedName, setEditedName ] = useState("");
    const [ editedEmail, setEditedEmail ] = useState("");
    const [ editedRole, setEditedRole ] = useState("");
 
    useEffect(()=>{
        const newUsersToDisplay = users.slice(startIndex,endIndex);
        setUsersOnPage(newUsersToDisplay);
    },[currentPage,users,usersPerPage,endIndex,startIndex])

    const handleCheckbox = () =>{
        setIsCheckedAll(!isCheckedAll)

        if(!isCheckedAll){
            setSelectedRows(usersToDisplay.map(user => user.id));
        }else{
            setSelectedRows([]);
        }
    }

    const handleRowCheckbox = (id) =>{
        const selected = selectedRows.includes(id);
        if(selected){
            setSelectedRows(selectedRows.filter(uid=> uid !== id))
        }else{
            setSelectedRows([...selectedRows,id])
        }
    }

    const handleEdit = (e,id,name,email,role) =>{
        e.stopPropagation();
        setEditingUserId(id);
        setEditedName(name);
        setEditedEmail(email);
        setEditedRole(role);
    }

    const handleSave = (e) =>{
        e.stopPropagation()
        setUsers((prevUser)=>
            prevUser.map((user)=>
                user.id === editingUserId ? {
                    ...user,
                    name: editedName,
                    email: editedEmail,
                    role: editedRole,
                } : user
            )
        )
        setEditingUserId(null);
        setEditedName("")
        setEditedEmail("")
        setEditedRole("")
    }

    const handleDelete = (e,id) =>{
        e.stopPropagation()
        const updatedUsers = users.filter((user)=> user.id !== id)
        setUsers(updatedUsers)
    }

    const handleCancel = (e) =>{
        e.stopPropagation()
        setEditingUserId(null);
        setEditedName("")
        setEditedEmail("")
        setEditedRole("")
    }

    return (
        <div className="tableWrapper">
            <table style={{width:"100%"}}>
                <thead>
                    <tr className="mainColumn">
                        <th style={{padding:".5rem 0"}}>
                            <input 
                                type="checkbox"
                                checked={isCheckedAll}
                                onChange={handleCheckbox}
                            />
                        </th>
                        <th style={{padding:".5rem 0"}}>Name</th>
                        <th style={{padding:".5rem 0"}}>Email</th>
                        <th style={{padding:".5rem 0"}}>Role</th>
                        <th style={{padding:".5rem 0"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersOnPage.map((user)=>(
                        <tr key={user.id} 
                            className={`tableRows ${selectedRows.includes(user.id) ? "selectedRow" : ""}`}
                            onClick={()=>handleRowCheckbox(user.id)}
                        >
                            <td style={{padding:".5rem 0"}}>
                                <input 
                                    type="checkbox"
                                    checked={selectedRows.includes(user.id)}
                                    onChange={() => handleRowCheckbox(user.id)}
                                />
                            </td>
                            <td style={{padding:".5rem 0",width:"20%"}}>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e)=>setEditedName(e.target.value)}
                                        onClick={(e)=>e.stopPropagation()}
                                    />   
                                ):(
                                    user.name
                                )}
                            </td>
                            <td style={{padding:".5rem 0",width:"35%"}}>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        value={editedEmail}
                                        onChange={(e)=>setEditedEmail(e.target.value)}
                                        onClick={(e)=>e.stopPropagation()}
                                    />   
                                ):(
                                    user.email
                                )}
                            </td>
                            <td style={{padding:".5rem 0",width:"20%"}}>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        value={editedRole}
                                        onChange={(e)=>setEditedRole(e.target.value)}
                                        onClick={(e)=>e.stopPropagation()}
                                    />   
                                ):(
                                    user.role
                                )}
                            </td>
                            <td style={{padding:".5rem 0",width:"20%"}}>
                                <div style={{display:"flex",gap:".3rem"}}>
                                    {editingUserId === user.id ? (
                                        <>
                                            <button 
                                                className="save"
                                                onClick={(e)=>handleSave(e)}
                                            >
                                                <SaveIcon/>
                                            </button>
                                            <button 
                                                className="cancel"
                                                onClick={(e)=>handleCancel(e)}
                                            >
                                                <CloseIcon/>
                                            </button>
                                        </>
                                    ):(
                                        <>
                                            <button
                                                className="edit"
                                                onClick={(e)=>handleEdit(e,user.id,user.name,user.email,user.role)}

                                            >
                                                <EditIcon/>
                                            </button>
                                            <button
                                                className="delete"
                                                onClick={(e)=>handleDelete(e,user.id)}
                                            >
                                                <DeleteOutlineIcon/>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
