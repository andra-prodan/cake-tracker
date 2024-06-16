import dayjs from "dayjs";
import { IUser } from "../interfaces/IUser";

const usersService = () => {
  const getAllUsers = async () => {
    return await fetch("http://localhost:5280/api/users").then((data) =>
      data.json()
    );
  };

  const getSortedUsers = async ({
    isSorted,
    sortBy,
    pageNumber,
    pageSize = 5,
  }: {
    isSorted?: boolean | null;
    sortBy: string;
    pageNumber?: number;
    pageSize?: number;
  }) => {
    if (pageNumber == undefined)
      return await fetch(
        `http://localhost:5280/api/users?SortBy=${sortBy}&isDecending=${isSorted}`
      ).then((data) => data.json());
    pageNumber == 0 ? (pageNumber = 1) : (pageNumber = pageNumber);
    if (isSorted != null || pageNumber != undefined)
      return await fetch(
        `http://localhost:5280/api/users?SortBy=${sortBy}&isDecending=${isSorted}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      ).then((data) => data.json());
  };

  const getUsersPerPage = async ({
    pageNumber,
    pageSize = 5,
  }: {
    pageNumber?: number;
    pageSize?: number;
  }) => {
    pageNumber == 0 ? (pageNumber = 1) : (pageNumber = pageNumber);
    return await fetch(
      `http://localhost:5280/api/users?PageNumber=${pageNumber}&PageSize=${pageSize}`
    ).then((data) => data.json());
  };

  const createUser = async (user: IUser) => {
    await fetch("http://localhost:5280/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        birthDate: dayjs(user.birthDate).format("YYYY-MM-DD"),
      }),
    });
  };

  const checkUnique = async (
    field: string,
    value: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `http://localhost:5280/api/users/unique?field=${field}&value=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.isUnique;
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      return false;
    }
  };

  return {
    getAllUsers,
    getSortedUsers,
    getUsersPerPage,
    createUser,
    checkUnique,
  };
};

export default usersService;
