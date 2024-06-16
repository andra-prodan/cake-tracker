import { IUser } from "@/interfaces/IUser";
import usersService from "@/services/usersService";
import { useState, useEffect } from "react";

export const useSortedUsers = ({
  isAddedUser,
  pageNumber,
  pageSize,
  sortBy,
  isSorted,
}: {
  isAddedUser: boolean;
  pageNumber?: number;
  pageSize?: number;
  sortBy: string;
  isSorted: boolean;
}) => {
  const [sortedUsersData, setSortedUsersData] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await usersService().getSortedUsers({
        isSorted,
        sortBy,
        pageNumber,
        pageSize,
      });

      setSortedUsersData(users);
    };

    fetchData();
  }, [isAddedUser, isSorted, pageNumber, pageSize, sortBy]);

  return { sortedUsersData };
};
