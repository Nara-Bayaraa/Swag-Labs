import { faker } from "@faker-js/faker";

// Generate a random first name
const firstName = faker.person.firstName();
// Generate a random last name
const lastName = faker.person.lastName();
// Generate a random zip code
const zipCode = faker.location.zipCode();

export { firstName, lastName, zipCode };

export const generateRandomUserData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zipPostalCode: faker.location.zipCode(),
});
