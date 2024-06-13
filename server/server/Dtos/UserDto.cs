using System.ComponentModel.DataAnnotations;

namespace server.Dtos
{
    public class UserDto
    {
        public string firstName { get; set; } = string.Empty;
        public string lastName { get; set; } = string.Empty;
        public string birthDate { get; set; } = string.Empty;
        public string country { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
    }
}
