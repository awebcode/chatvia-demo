export interface UserProfile {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  token?: string;
  message?: string;
  avatar?: string;
  friends?: UserProfile[];
  blocked?: UserProfile[];
}

export interface AuthState {
  isFetching: {
    isContacts: boolean;
  };

  isSubmitting: boolean;
  isSuccess: boolean

  hasFailed: {
    isFailed: boolean;
    message: string;
  };

  isSignedIn: boolean;
  isValidUser: boolean;

  user: UserProfile | null;
  userList: UserProfile[];

  contacts: UserProfile[];
}
