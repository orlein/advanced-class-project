import Kakao from '@/assets/KakaoLogin.png';

const SocialKakao = () => {
    const Rest_api_key = 'd5c55484497c2a10afdfbbaaebebbc42'; // REST API KEY
    const redirect_uri = 'http://localhost:5173/redirect'; // Redirect URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    // oauth 요청 URL

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <>
            <button onClick={handleLogin}>
                <img src={Kakao} alt="카카오로그인" />
            </button>
        </>
    );
};

export default SocialKakao;
