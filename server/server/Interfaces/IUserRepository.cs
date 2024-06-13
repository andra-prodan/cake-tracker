using server.Dtos;
using server.Models;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        public Task<List<User>> GetAllUsers();
        public Task<User> CreateUser(UserDto userDto);
    }
}
