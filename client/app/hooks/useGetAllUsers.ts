import { useEffect, useState } from "react";
import usersService from "../services/usersService";
import { IUser } from "../interfaces/IUser";

export const useGetAllUsers = (isSorted: boolean | null) => {
  const [usersData, setUsersData] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await usersService().getAllUsers(isSorted);

      setUsersData(users);
    };

    fetchData();
  }, [isSorted]);

  return { usersData };
};
