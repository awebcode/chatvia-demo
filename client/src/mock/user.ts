import { UserProfile } from "../models";
import { faker } from "@faker-js/faker";

export const users: UserProfile[] = [
  {
    _id: "1",
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "2",
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "3",
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "4",
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "5",
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "6",
    username: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  },
];
