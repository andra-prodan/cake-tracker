using AutoMapper;
using server.Dtos;
using server.Models;

namespace server.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile() {
            CreateMap<UserDto, User>()
                .ForMember(dest => dest.birthDate, opt => opt.MapFrom(src => DateOnly.Parse(src.birthDate)));
            CreateMap<CreateUserDto, User>()
                .ForMember(dest => dest.birthDate, opt => opt.MapFrom(src => DateOnly.Parse(src.birthDate)));
        }
    }
}
