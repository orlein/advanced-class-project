const user = {
  id: '3e2f9479-27b3-456b-ae41-63c9368dd194',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@gmail.com',
  email_confirmed_at: '2024-10-30T09:22:29.964268Z',
  phone: '',
  confirmed_at: '2024-10-30T09:22:29.964268Z',
  last_sign_in_at: '2024-10-30T09:22:29.965468Z',
  app_metadata: {
    provider: 'google',
    providers: ['google'],
  },
  user_metadata: {
    avatar_url:
      'https://lh3.googleusercontent.com/a/ACg8ocKAjd08KeelEG58fi9Ka9kUVA-3sQENve5oipj7H8GPmyOYhA=s96-c',
    email: 'test@gmail.com',
    email_verified: true,
    full_name: 'Won Jeong Dae',
    iss: 'https://accounts.google.com',
    name: 'Won Jeong Dae',
    phone_verified: false,
    picture:
      'https://lh3.googleusercontent.com/a/ACg8ocKAjd08KeelEG58fi9Ka9kUVA-3sQENve5oipj7H8GPmyOYhA=s96-c',
    provider_id: '114089309838235296916',
    sub: '114089309838235296916',
  },
  identities: [
    {
      identity_id: 'af085123-f0c2-4320-a0de-8de7b1e80bd7',
      id: '114089309838235296916',
      user_id: '3e2f9479-27b3-456b-ae41-63c9368dd194',
      identity_data: {
        avatar_url:
          'https://lh3.googleusercontent.com/a/ACg8ocKAjd08KeelEG58fi9Ka9kUVA-3sQENve5oipj7H8GPmyOYhA=s96-c',
        email: 'test@gmail.com',
        email_verified: true,
        full_name: 'séyoon',
        iss: 'https://accounts.google.com',
        name: 'séyoon',
        phone_verified: false,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocKAjd08KeelEG58fi9Ka9kUVA-3sQENve5oipj7H8GPmyOYhA=s96-c',
        provider_id: '114089309838235296916',
        sub: '114089309838235296916',
      },
      provider: 'google',
      last_sign_in_at: '2024-10-30T09:22:29.960447Z',
      created_at: '2024-10-30T09:22:29.960496Z',
      updated_at: '2024-10-30T09:22:29.960496Z',
      email: 'test@gmail.com',
    },
  ],
  created_at: '2024-10-30T09:22:29.956289Z',
  updated_at: '2024-10-31T01:21:39.087718Z',
  is_anonymous: false,
};

export const onAuthStateChange = (
  isLoggedIn: boolean,
  callback: (user: object | null) => void
) => {
  isLoggedIn ? callback(user) : callback(null);
  isLoggedIn && console.log('🌝 signed in! user: ', user);
  !isLoggedIn && console.log('🌚 signed out!');
};
