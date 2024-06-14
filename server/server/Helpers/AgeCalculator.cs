namespace server.Helpers
{
    public class AgeCalculator
    {
        public static int CalculateAge(DateOnly birthDate, DateOnly today)
        {
            int age = today.Year - birthDate.Year;

            if (today < birthDate.AddYears(age))
            {
                age--;
            }

            return age;
        }
    }
}
