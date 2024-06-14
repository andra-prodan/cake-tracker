using server.Dtos;
using server.Models;
using server.Helpers;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        public Task<List<User>> GetAllUsers(QueryObject query);
        public Task<User> CreateUser(CreateUserDto userDto);
    }
}
