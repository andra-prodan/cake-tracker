'use client'

import dayjs from "dayjs";
import { useGetAllUsers } from "../hooks/useGetAllUsers"
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { Modal } from "./Modal";
import { ReadonlyURLSearchParams } from "next/navigation";
import { usePaginatedUsers } from "@/hooks/usePaginatedUsers";
import { useSortedUsers } from "@/hooks/useSortedUsers";
import { Table } from "./Table";

export const UsersTable = ({ query }: { query: ReadonlyURLSearchParams }) => {
    const pageNumber = Number(query.get("pageNumber"))
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSorted, setSorted] = useState<boolean>(false);
    const [isAddedUser, setIsAddedUser] = useState(false)
    const { usersData } = useGetAllUsers({ isAddedUser });
    const [users, setUsers] = useState<IUser[]>([])
    const [paginatedUsers, setPaginetedUsers] = useState<IUser[]>([])
    const { paginatedUsersData } = usePaginatedUsers({ isAddedUser, pageNumber })
    const sortBy = "birthDate"
    const { sortedUsersData } = useSortedUsers({ isAddedUser, pageNumber, sortBy, isSorted })

    useEffect(() => {
        setUsers(usersData)
    }, [usersData])

    useEffect(() => {
        setPaginetedUsers(paginatedUsersData)
    }, [paginatedUsersData])

    const handleSort = () => {
        setSorted(!isSorted);
        setPaginetedUsers(sortedUsersData)
        console.log(paginatedUsers);
    }

    const handleOpenModal = () => {
        setModalVisible(true);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
        setIsAddedUser(!isAddedUser)
    };

    return <>
        <div className="relative overflow-x-auto  w-3/5 pt-2">
            <Table users={paginatedUsers} handleSort={handleSort} />
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-5</span> of <span className="font-semibold text-gray-900 dark:text-white">{users.length}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href={`?pageNumber=${pageNumber == 0 ? 1 : (pageNumber != 1 ? pageNumber - 1 : pageNumber)}`} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    {Array.from({ length: Math.ceil(users.length / 5) }, (_, index) => (
                        <li key={index}>
                            <a href={`?pageNumber=${index + 1}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index + 1}</a>
                        </li>
                    ))}
                    <li>
                        <a href={`?pageNumber=${pageNumber == 0 ? 2 : (pageNumber != Math.ceil(users.length / 5) ? pageNumber + 1 : pageNumber)}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
            <div className="flex">
                <button type="button" onClick={handleOpenModal} className="ml-auto mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add new user</button>
            </div>
        </div>

        <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
    </>
}
