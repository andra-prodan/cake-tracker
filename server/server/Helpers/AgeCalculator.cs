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

        public static int CalculateProximityToCurrentDate(DateOnly birthDate)
        {
            DateTime today = DateTime.UtcNow.Date;
            DateTime nextBirthday = new DateTime(today.Year, birthDate.Month, birthDate.Day);

            if (nextBirthday < today)
            {
                nextBirthday = nextBirthday.AddYears(1);
            }

            return (nextBirthday - today).Days;
        }
    }
}
