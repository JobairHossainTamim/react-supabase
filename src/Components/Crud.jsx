import React, { useEffect, useState } from 'react';
import supabase from './createClient';

const Crud = () => {
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        name: "",
        age: ""
    })
    const [user2, setUser2] = useState({
        name: "",
        age: "",
        id: "",
    })

    function handleChange(event) {
        setUser(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function createUser() {
        await supabase.from('users').insert({ name: user.name, age: user.age })
        fetchData()
    }

    async function fetchData() {
        try {
            const { data } = await supabase.from('users').select("*");
            setUsers(data)

        } catch (error) {
            console.log(error);
        }
    }

    async function DeleteUser(UserId) {
        try {
            const { data, error } = await supabase
                .from('users')
                .delete()
                .eq('id', UserId);
            fetchData()

        } catch (error) {
            console.log(error)
        }
    }

    // get All Data
    useEffect(() => {
        fetchData()
    }, []);

    // Display Data User
    function DisplayUser(userId) {
        users.map((user) => {
            if (user.id === userId) {
                setUser2({ name: user.name, age: user.age, id: user.id })
            }

        })
    }

 
    async function updateData(userId) {
        try {
            const { error,data} = await supabase
                .from('users')
                .update({ id: user2.id, name: user2.name, age: user2.age })
                .eq('id', userId)

                if(data){
                    console.log(data)
                }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <form onSubmit={createUser}>
                <input type="text" placeholder='Name' name="name" onChange={handleChange} />
                <input type="number" placeholder='Age' name="age" onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>
            <p>For Update</p>
            <form onSubmit={() =>{ updateData(user2.id)}}>
                <input type="text" placeholder='Name' name="name" onChange={handleChange} defaultValue={user2.name} />
                <input type="number" placeholder='Age' name="age" onChange={handleChange} defaultValue={user2.age} />
                <button type='submit'>Saved changes</button>
            </form>





            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button onClick={() => { DeleteUser(user.id) }}>Delete</button>
                                    <button onClick={() => { DisplayUser(user.id) }}>Display</button>
                                    <button onClick={() => { updateData(user.id) }}>Update</button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default Crud;