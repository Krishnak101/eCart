export interface User {
  username: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  pin: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
