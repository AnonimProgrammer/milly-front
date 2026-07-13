export type PasswordProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  roles: string[];
};

export type UpdateCurrentUserRequest = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

export type ContinueResponse = {
  newUser: boolean;
};
