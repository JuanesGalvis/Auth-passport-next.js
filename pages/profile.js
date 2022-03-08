import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Profile() {
    const [ AuthUser, setAuthUser ] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch('http://localhost:3000/auth/success', {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "aplication/json",
                    "Content-type": "aplication/json",
                    "Acces-Control-Allow-Credentials": true
                }
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setAuthUser(data.user);
            }).catch((error) => {
                console.log(error);
            })
        }
        getUser();
    }, []);

    const logout = () => {
        window.open(`http://localhost:3000/logout`, "_self");
    }

    return (
        <>
            <h1>Profile</h1>
            {
                AuthUser && <>
                    <h3>{AuthUser.name}</h3>
                    <p>{AuthUser.email}</p>
                    <img src={AuthUser.photo} />
                </>
            }
            <button onClick={logout}>Cerrar Sesión</button>
        </>
    )
}