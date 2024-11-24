import ChallengeForm from '@/components/organism/ChallengeForm';
import { useParams } from 'react-router-dom';

export default function EditChallenge() {
  const { challenge_id: challengeId } = useParams();
  return (
    <>
      <ChallengeForm challengeId={challengeId} />
    </>
  );
}
