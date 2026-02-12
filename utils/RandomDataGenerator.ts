import { faker } from '@faker-js/faker';

export class RandomDataUtility {

  static GetFirstName() {
    return faker.person.firstName();

  }

  static GetlastName() {
    return faker.person.lastName();

  }

  static GetFullName() {
    return faker.person.fullName();

  }

  static GetEmail() {
    return faker.internet.email();

  }

  static GetPhoneNumber() {
    return faker.phone.number();

  }

  static GetUsername(): string {
    return faker.internet.username();

  }

  static GetPassword(): string {
    return faker.internet.password();
  }


  static GetRandomCountry(): string {
    return faker.location.country();
  }


  static GetRandomState(): string {
    return faker.location.state();
  }

  static GetRandomCity(): string {
    return faker.location.city();
  }

  static GetRandomPin(): string {
    return faker.location.zipCode();
  }

  static GetRandomAddress(): string {
    return faker.location.streetAddress();
  }

  static GetRandomPassword(length: number = 10): string {
    return faker.internet.password({ length });
  }

  static GetRandomAlphanumeric(length: number): string {
    return faker.string.alphanumeric(length);
  }

  static GetRandomNumeric(length: number): string {
    return faker.string.numeric(length);
  }

  static GetRandomUUID(): string {
    return faker.string.uuid();
  }


}