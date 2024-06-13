using AutoMapper;
using server.Dtos;
using server.Models;

namespace server.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile() {
            CreateMap<UserDto, User>();
        }
    }
}
