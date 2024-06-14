using server.Dtos;
using server.Repositories;
using Microsoft.AspNetCore.Mvc;
using server.Helpers;

namespace server.Controllers
{
    [Controller]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _usersRepository;

        public UsersController(UserRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            var users = await _usersRepository.GetAllUsers(query);

            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            var user = await _usersRepository.CreateUser(userDto);

            return Ok(user);
        }
    }
}
