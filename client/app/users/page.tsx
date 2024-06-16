'use client'

import { useSearchParams } from "next/navigation"
import { Nav } from "../../components/Nav"
import { UsersTable } from "../../components/UsersTable"

const UsersPage = () => {
    const query = useSearchParams()

    return (
        <>
            <Nav />
            <div className="flex flex-col items-center">
                <h1 className="flex justify-center pt-2 text-xl">List of all users:</h1>
                <UsersTable query={query} />
            </div>
        </>
    )
}

export default UsersPage