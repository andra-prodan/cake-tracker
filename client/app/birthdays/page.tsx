'use client'

import { Nav } from "@/components/Nav"
import { Table } from "@/components/Table"
import { useSortedUsers } from "@/hooks/useSortedUsers";
import { IUser } from "@/interfaces/IUser";
import { useEffect, useState } from "react";

const BirthDaysPage = () => {
    const { sortedUsersData } = useSortedUsers({ isAddedUser: false, sortBy: "proximityToCurrentDate", isSorted: false });
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        setUsers(sortedUsersData)
    }, [sortedUsersData])

    return (
        <>
            <Nav />
            <Table users={users} />
        </>
    )
}

export default BirthDaysPage