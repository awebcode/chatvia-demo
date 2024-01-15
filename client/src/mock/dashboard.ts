import { File, Link, Message, Notification, UserProfile } from "../models";

import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export const conversation: Message[] = [
  {
    _id: "1",
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "1",
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
  {
    _id: "2",
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "1",
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
  {
    _id: "3",
    message: faker.lorem.paragraph(2),
    hasImages: true,
    images: [
      {
        id: "1",
        img: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
    sender: {
      _id: "2",
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    _id: "4",
    message: faker.lorem.paragraph(2),
    hasImages: true,
    images: [
      {
        id: "1",
        img: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
    sender: {
      _id: "2",
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    _id: "5",
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "2",
      username: "ducnghi",
      email: "leducnghi@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  },
  {
    _id: "6",
    message: faker.lorem.paragraph(2),
    sender: {
      _id: "1",
      username: "anhtuan",
      email: "phamanhtuan@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  },
];

export const Messages: Message[] = [
  {
    _id: "1",
    message: faker.lorem.paragraph(),
    status: "online",
    sender: {
      _id: "1",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "2",
    message: faker.lorem.paragraph(),
    status: "leave",
    sender: {
      _id: "2",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "3",
    message: faker.lorem.paragraph(),
    status: "off",
    sender: {
      _id: "3",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "4",
    message: faker.lorem.paragraph(),
    status: "online",
    sender: {
      _id: "4",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "5",
    message: faker.lorem.paragraph(),
    status: "leave",
    sender: {
      _id: "5",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "6",
    message: faker.lorem.paragraph(),
    status: "online",
    sender: {
      _id: "6",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
  {
    _id: "7",
    message: faker.lorem.paragraph(),
    status: "off",
    sender: {
      _id: "7",
      username: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  },
];

export const friendRequests: UserProfile[] = [
  {
    _id: "1",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "2",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "3",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "4",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  {
    _id: "5",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },

  {
    _id: "6",
    username: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
];

export const images = [...Array(22)].map(() => ({
  id: "1",
  image: faker.image.avatar(),
}));

export const notifications: Notification[] = [...Array(15)].map(() => ({
  id: `${uuidv4()}`,
  user: {
    _id: uuidv4(),
    avatar: faker.image.avatar(),
    username: faker.person.fullName(),
  },
  readStatus: false,
  content: faker.lorem.paragraph(),
  type: "newMsg",
  timeStamp: new Date(),
}));

export const files: File[] = [...Array(10)].map(() => ({
  id: `${uuidv4()}`,
  name: faker.lorem.paragraph(),
  length: 5.3,
  date: "3/7/2023",
}));

export const links: Link[] = [...Array(10)].map(() => ({
  id: `${uuidv4()}`,
  name: faker.lorem.paragraph(),
  href: "https://www.facebook.com/nghile.genji/",
  date: "3/7/2023",
}));
