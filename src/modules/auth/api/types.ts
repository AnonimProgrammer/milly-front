export type PasswordProfile = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export type ContinueResponse = {
  newUser: boolean;
};
