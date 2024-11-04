const user = {
  id: '3e2f9479-27b3-456b-ae41-63c9368dd194',
  email: 'test@gmail.com',
  // profileImageUrl: '',
  // mainLanguage: '',
  // nationality: '',
  // bio: '',
  // externalUrls: [],
  // isEmailVerified: true,
  // isPrivate: true,
  // role: 'user',
  // createdAt: '',
  // updatedAt: ''
};

export const onAuthStateChange = (shouldSignIn: boolean) => {
  shouldSignIn && console.log('🌝 signed in! user: ', user);
  !shouldSignIn && console.log('🌚 signed out!');
  return shouldSignIn ? user : null;
};
