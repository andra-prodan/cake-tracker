import { IUser } from "../interfaces/IUser";

const usersService = () => {
  const getAllUsers = async (isSorted: boolean | null) => {
    if (isSorted == true || isSorted == false)
      return await fetch(
        `http://localhost:5280/api/users?SortBy=birthdate&isDecending=${isSorted}`
      ).then((data) => data.json());
    return await fetch("http://localhost:5280/api/users").then((data) =>
      data.json()
    );
  };

  const createUser = async (user: IUser) => {
    await fetch("http://localhost:5280/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  return { getAllUsers, createUser };
};

export default usersService;
