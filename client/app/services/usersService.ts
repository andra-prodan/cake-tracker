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

  return { getAllUsers };
};

export default usersService;
