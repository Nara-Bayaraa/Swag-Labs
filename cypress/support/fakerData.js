import { faker } from "@faker-js/faker";

// Generate a random first name
const fakerFirstName = faker.person.firstName();
// Generate a random last name
const fakerLastName = faker.person.lastName();
// Generate a random zip code
const fakerZipCode = faker.location.zipCode();

export { fakerFirstName, fakerLastName, fakerZipCode };

export const generateRandomUserData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zipPostalCode: faker.location.zipCode(),
});
