export class User {

  id: string;
  roles: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export enum UserRole {
  Admin = "Admin",
  Support = "Support",
  Other = "Other",
}
