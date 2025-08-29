import { z } from 'zod';

const baseUrl = 'http://localhost:3000';

const UserDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const api = {
  getUsers: () => {
    return fetch(`${baseUrl}/users`)
      .then((res) => res.json())
      .then((res) => {
        return UserDtoSchema.array().parse(res);
      });
  },
  getUser: (id: string) => {
    return fetch(`${baseUrl}/users/${id}`)
      .then((res) => res.json())
      .then((res) => {
        return UserDtoSchema.parse(res);
      });
  },
  deleteUser: (id: string) => {
    return fetch(`${baseUrl}/users/${id}`, { method: 'Delete' }).then((res) => res.json());
  },
};
