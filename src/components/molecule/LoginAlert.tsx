import React, { SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

type LoginAlertProps = {
  showLoginAlert: boolean;
  setShowLoginAlert: React.Dispatch<SetStateAction<boolean>>;
};

const LoginAlert = ({ showLoginAlert, setShowLoginAlert }: LoginAlertProps) => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate('/sign-in');
  };
  return (
    <>
      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인이 필요합니다.</AlertDialogTitle>
            <AlertDialogDescription>
              로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClick}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginAlert;
