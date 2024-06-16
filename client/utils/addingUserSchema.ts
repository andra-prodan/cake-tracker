import * as yup from "yup";
import dayjs from "dayjs";
import usersService from "../services/usersService";

const isAdult = (birthDate: Date) => {
  return dayjs().diff(birthDate, "year") >= 18;
};

const checkUnique = async (field: string, value: string) => {
  if (field == "location") {
    const [city, country] = value.split(",");

    const isCityUnique = await usersService().checkUnique("city", city);
    const isCountryUnique = await usersService().checkUnique(
      "country",
      country
    );

    if (!(isCityUnique || isCountryUnique)) {
      return false;
    }
    return true;
  }

  const isUnique = await usersService().checkUnique(field, value);
  if (!isUnique) {
    return false;
  }
  return true;
};

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .test("unique-first-name", "First name must be unique", (value) =>
      checkUnique("firstName", value)
    ),
  lastName: yup
    .string()
    .required()
    .test("unique-last-name", "Last name must be unique", (value) =>
      checkUnique("lastName", value)
    ),
  birthDate: yup
    .date()
    .required()
    .test("is-adult", "You must be at least 18 years old", isAdult),
  country: yup
    .string()
    .required()
    .test("unique-location", "Location must be unique", async function (value) {
      const { country } = this.parent;
      return checkUnique("location", `${value},${country}`);
    }),
  city: yup
    .string()
    .required()
    .test("unique-location", "Location must be unique", async function (value) {
      const { country } = this.parent;
      return checkUnique("location", `${value},${country}`);
    }),
});
