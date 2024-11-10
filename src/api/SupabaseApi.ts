import {
  UserEmailAndPassword,
  SignUpUser,
  UserBasicInfo,
} from '@/lib/interfaces/userInfoInterfaces';
import axios, { AxiosInstance } from 'axios';

class SupabaseApi {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://ozadv6.beavercoding.net/api/',
    });
  }

  async signUp(userData: SignUpUser) {
    return await this.httpClient
      .post('/accounts/sign-up', userData, {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      })
      .then(res => res.data)
      .catch(err => {
        if (err.response.status === 409) return Promise.reject('이미 가입된 이메일입니다.');
      });
  }

  async signIn(userData: UserEmailAndPassword): Promise<UserBasicInfo> {
    return await this.httpClient
      .post('/accounts/sign-in', userData, {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      })
      .then(res => {
        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data.account;
      });
  }

  async getUserInfo(): Promise<UserBasicInfo> {
    const accessToken = localStorage.getItem('accessToken');
    return await this.httpClient
      .get('/accounts/me', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => res.data);
  }
}

export default new SupabaseApi();
