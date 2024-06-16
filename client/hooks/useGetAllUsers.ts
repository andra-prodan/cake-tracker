import { useEffect, useState } from "react";
import usersService from "../services/usersService";
import { IUser } from "../interfaces/IUser";

export const useGetAllUsers = ({ isAddedUser }: { isAddedUser: boolean }) => {
  const [usersData, setUsersData] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await usersService().getAllUsers();

      setUsersData(users);
    };

    fetchData();
  }, [isAddedUser]);

  return { usersData };
};
