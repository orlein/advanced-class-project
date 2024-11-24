import React, { SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type LikeAlertProps = {
  showLikeAlert: boolean;
  setShowLikeAlert: React.Dispatch<SetStateAction<boolean>>;
  isPost?: boolean;
};

const LikeAlert = ({ showLikeAlert, setShowLikeAlert, isPost = false }: LikeAlertProps) => {
  return (
    <>
      <AlertDialog open={showLikeAlert} onOpenChange={setShowLikeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>좋아요 실패!</AlertDialogTitle>
            <AlertDialogDescription>
              {`자신의 ${isPost ? '게시물' : '챌린지'}에는 좋아요를 누를 수 없습니다.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LikeAlert;
