import { IUser } from "@/interfaces/IUser";
import usersService from "@/services/usersService";
import { useState, useEffect } from "react";

export const usePaginatedUsers = ({
  isAddedUser,
  pageNumber,
  pageSize,
}: {
  isAddedUser: boolean;
  pageNumber: number;
  pageSize?: number;
}) => {
  const [paginatedUsersData, setPaginatedUsersData] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await usersService().getUsersPerPage({
        pageNumber,
        pageSize,
      });

      setPaginatedUsersData(users);
    };

    fetchData();
  }, [isAddedUser, pageNumber, pageSize]);

  return { paginatedUsersData };
};
