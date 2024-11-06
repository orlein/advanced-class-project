export const user = {
  id: '3e2f9479-27b3-456b-ae41-63c9368dd194',
  email: '2024oz06@example.com',
  username: 'Won-Jeong-Dae',
  birthday: '1990-01-01',
  mainLanguage: '한국어',
  location: '서울특별시',
  bio: 'Always learning and exploring new technologies.',
  externalUrl: 'https://example.com',
  interests: '웹 개발, 프론트엔드 개발, 운동',
  profileImageUrl: 'https://i.pinimg.com/564x/a6/34/14/a63414ceaa3352ada53c5438aa540f94.jpg',
  isPrivate: true,
  // nationality: '',
  // isEmailVerified: true,
  // role: 'user',
  // createdAt: '',
  // updatedAt: ''
};

export const onAuthStateChange = (shouldSignIn: boolean) => {
  shouldSignIn && console.log('🌝 signed in! user: ', user);
  !shouldSignIn && console.log('🌚 signed out!');
  return shouldSignIn ? user : null;
};
