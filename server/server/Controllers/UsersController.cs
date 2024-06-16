using server.Dtos;
using server.Repositories;
using Microsoft.AspNetCore.Mvc;
using server.Helpers;

namespace server.Controllers
{
    [Route("api/users")]
    [ApiController]
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
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto userDto)
        {
            var user = await _usersRepository.CreateUser(userDto);

            return Ok(user);
        }

        [HttpGet("unique")]
        public async Task<ActionResult<bool>> CheckUnique([FromQuery] string field, [FromQuery] string value)
        {
            var isUnique = await _usersRepository.CheckUniqueAsync(field, value);
            return Ok(new { isUnique });
        }
    }
}
