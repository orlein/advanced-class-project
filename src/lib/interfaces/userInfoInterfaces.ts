export interface UserEmailAndPassword {
  email: string;
  password: string;
}

export interface SignUpUser extends UserEmailAndPassword {
  confirmPassword: string;
}

export interface UserSignInResponse {
  account: UserBasicInfo;
  accessToken: string;
  refreshToken: string;
}

export interface UserBasicInfo {
  id: string;
  email: string;
  isEmailVerified: boolean;
  isPrivate: boolean;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface ExtraUserInfo extends UserBasicInfo {
  username: string;
  birthday: string;
  mainLanguage: string;
  location: string;
  bio: string;
  externalUrl: string;
  interests: string;
  profileImageUrl: string;
}
