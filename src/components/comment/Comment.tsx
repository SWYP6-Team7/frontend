"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import RoundedImage from "../designSystem/profile/RoundedImage";
import EllipsisIcon from "../icons/EllipsisIcon";
import EmptyHeartIcon from "../icons/EmptyHeartIcon";
import CommentIcon from "../icons/CommentIcon";
import EditAndDeleteModal from "../designSystem/modal/EditAndDeleteModal";
import CheckingModal from "../designSystem/modal/CheckingModal";
import ResultToast from "../designSystem/toastMessage/resultToast";
import { IComment } from "@/model/comment";
import { daysAgo, daysAgoFormatted } from "@/utils/time";
import FullHeartIcon from "../icons/FullHeartIcon";
import useComment from "@/hooks/comment/useComment";
import { authStore } from "@/store/client/authStore";
import { commentStore } from "@/store/client/commentStore";
import { COMMENT_MODAL_MESSAGES } from "@/constants/modalMessages";
import ReportModal from "../designSystem/modal/ReportModal";
import { isGuestUser } from "@/utils/user";
import { reportStore } from "@/store/client/reportStore";
import NoticeModal from "../designSystem/modal/NoticeModal";
import useViewTransition from "@/hooks/useViewTransition";

interface CommentProps {
  comment: IComment;
  relatedType: "travel" | "community";
  relatedNumber: number;
  userNumber: number;
}

const Comment = ({ comment, relatedType, relatedNumber, userNumber }: CommentProps) => {
  const { accessToken, userId } = authStore();
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
  const [isReportBtnClicked, setIsReportBtnClicked] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [checkingModalClicked, setCheckingModalClicked] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [isToastShow, setIsToastShow] = useState(false); // 삭제 완료 메시지.
  const [threeDotsClick, setThreeDotsClick] = useState(false);
  const [reportThreeDotsClick, setReportThreeDotsClick] = useState(false);
  const { reportSuccess, setReportSuccess, setDetailId, setUserNumber } = reportStore();
  const navigateWithTransition = useViewTransition();

  const { setOpenEdit, setParentNumber, setCommentNumber, isEdit, isReply, parentNumber, commentNumber } =
    commentStore();
  const { removeMutation, remove, like, unlike, updateMutation } = useComment(relatedType, relatedNumber);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      setSuccessEdit(true);
    }
  }, [updateMutation.isSuccess]);
  useEffect(() => {
    if (successEdit) {
      setTimeout(() => {
        setSuccessEdit(false);
      }, 2000);
    }
  }, [successEdit]);
  useEffect(() => {
    if (isDeleteBtnClicked) {
      setIsResultModalOpen(true);
      setIsDeleteBtnClicked(false);
    }
    if (isEditBtnClicked) {
      setThreeDotsClick(false);
      setIsEditBtnClicked(false);
      setOpenEdit(comment.content);
      setCommentNumber(comment.commentNumber);
    }
    if (isReportBtnClicked) {
      setIsReportBtnClicked(false);
      setDetailId(relatedNumber);
      setUserNumber(userNumber);
      document.documentElement.style.viewTransitionName = "forward";

      navigateWithTransition(
        `/report/${relatedType === "community" ? "communityComment" : "travelComment"}/${comment.commentNumber}`
      );
    }
    if (checkingModalClicked) {
      remove({ commentNumber: comment.commentNumber });
      if (removeMutation.isSuccess) {
        setIsToastShow(true);
      }
    }
  }, [isDeleteBtnClicked, isEditBtnClicked, checkingModalClicked, isReportBtnClicked]);

  const onClickThreeDots = () => {
    if (comment.userNumber === userId || comment.travelWriterNumber === userId) {
      setThreeDotsClick(true);
    } else {
      setReportThreeDotsClick(true);
    }
  };

  const onClickReply = () => {
    setParentNumber(comment.commentNumber);
  };
  const onClickLike = () => {
    if (isGuestUser()) {
      return;
    }
    if (comment.liked) {
      unlike({ commentNumber: comment.commentNumber });
    } else {
      like({ commentNumber: comment.commentNumber });
    }
  };

  return (
    <Container isEdit={isEdit && comment.commentNumber === commentNumber} isChild={comment.parentNumber !== 0}>
      <TopContainer>
        <RoundedImage size={32} src={comment.imageUrl} />
        <UserBox>
          {relatedType === "travel" && comment.travelWriterNumber === comment.userNumber && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.7384 7.28021C18.5719 7.08903 18.344 6.9513 18.0873 6.88677C17.8415 6.82714 17.5819 6.83777 17.3428 6.91726C17.1037 6.99674 16.8965 7.14132 16.7487 7.33181L14.9557 8.92559L13.092 6.58297C12.9849 6.41562 12.8361 6.27413 12.6579 6.17018C12.5152 6.08933 12.3563 6.0358 12.1907 6.01281C12.025 5.98982 11.8561 5.99783 11.6939 6.03636C11.5316 6.0749 11.3795 6.14316 11.2466 6.23708C11.1137 6.331 11.0027 6.44864 10.9202 6.58297L9.05653 8.92559L7.26353 7.33181C7.11446 7.14281 6.90727 6.99937 6.66875 6.92003C6.43023 6.84069 6.17136 6.8291 5.92561 6.88677C5.65268 6.95486 5.41276 7.10599 5.24486 7.3156C5.07695 7.5252 4.99093 7.78096 5.00076 8.0413L6.11394 15.2639C6.21763 16.0199 6.61726 16.715 7.23782 17.2188C7.85838 17.7226 8.65719 18.0004 9.4843 18H14.5769C15.405 18.0012 16.205 17.7239 16.8267 17.2201C17.4485 16.7163 17.8492 16.0207 17.9536 15.2639L18.9975 8.0355C19.0008 8.00979 19.0008 7.98381 18.9975 7.9581C18.9911 7.71258 18.9004 7.47525 18.7384 7.28021ZM14.8367 15.4961H9.23226C9.14027 15.4961 9.04919 15.4794 8.9642 15.447C8.87922 15.4146 8.802 15.367 8.73695 15.3071C8.67191 15.2472 8.62031 15.1761 8.58511 15.0978C8.54991 15.0195 8.53179 14.9356 8.53179 14.8508C8.53179 14.7661 8.54991 14.6822 8.58511 14.6039C8.62031 14.5256 8.67191 14.4544 8.73695 14.3945C8.802 14.3346 8.87922 14.2871 8.9642 14.2546C9.04919 14.2222 9.14027 14.2055 9.23226 14.2055H14.8367C15.0224 14.2055 15.2004 14.2735 15.3317 14.3944C15.463 14.5154 15.5368 14.6794 15.5368 14.8505C15.5368 15.0216 15.463 15.1856 15.3317 15.3066C15.2004 15.4275 15.0224 15.4961 14.8367 15.4961Z"
                fill="#FDC52A"
              />
            </svg>
          )}
          <UserName>{comment.writer}</UserName>

          <Dot>·</Dot>
          <Day>{daysAgoFormatted(comment.regDate)}</Day>
        </UserBox>

        {!isGuestUser() && (
          <button onClick={onClickThreeDots}>
            <EllipsisIcon />
          </button>
        )}
      </TopContainer>
      <Content>{comment.content}</Content>
      <BottomContainer>
        <Like onClick={onClickLike} liked={comment.liked}>
          {comment.liked ? (
            <FullHeartIcon color={palette.keycolor} width={16} height={14} />
          ) : (
            <EmptyHeartIcon width={16} height={14} stroke={palette.비강조2} />
          )}
          <div>좋아요{comment.likes > 0 && ` ${comment.likes}`}</div>
        </Like>
        {comment.parentNumber === 0 && !isGuestUser() && (
          <Reply
            isReplied={(isReply && parentNumber === comment.commentNumber) || comment.commented}
            onClick={onClickReply}
          >
            <Icon>
              <CommentIcon
                stroke={(isReply && parentNumber === comment.commentNumber) || comment.commented ? "none" : undefined}
                fill={
                  (isReply && parentNumber === comment.commentNumber) || comment.commented
                    ? palette.keycolor
                    : "transparent"
                }
              />
            </Icon>
            {comment.repliesCount > 0 ? <div>{`답글 ${comment.repliesCount}`}</div> : <div>답글달기</div>}
          </Reply>
        )}
      </BottomContainer>
      <EditAndDeleteModal
        setIsEditBtnClicked={setIsEditBtnClicked}
        setIsDeleteBtnClicked={setIsDeleteBtnClicked}
        isOpen={threeDotsClick}
        setIsOpen={setThreeDotsClick}
      />
      <ReportModal
        setIsReportBtnClicked={setIsReportBtnClicked}
        isOpen={reportThreeDotsClick}
        setIsOpen={setReportThreeDotsClick}
      />
      <CheckingModal
        isModalOpen={isResultModalOpen}
        modalMsg={COMMENT_MODAL_MESSAGES.deleteMessage}
        modalTitle={COMMENT_MODAL_MESSAGES.title}
        modalButtonText={COMMENT_MODAL_MESSAGES.text}
        setIsSelected={setCheckingModalClicked}
        setModalOpen={setIsResultModalOpen}
      />
      <NoticeModal
        isModalOpen={reportSuccess}
        modalMsg={"소중한 의견 감사합니다."}
        modalTitle={"신고 완료"}
        setModalOpen={setReportSuccess}
      />
      <ResultToast bottom="80px" isShow={isToastShow} setIsShow={setIsToastShow} text="댓글이 삭제되었어요." />
    </Container>
  );
};

const Container = styled.div<{ isChild: boolean; isEdit: boolean }>`
  padding: 16px 0;
  padding-left: ${(props) => (props.isChild ? "40px" : "0")};
  border-bottom: 1px solid ${palette.비강조4};
  background-color: ${(props) => (props.isEdit ? "rgba(227, 239, 217, 0.3)" : palette.BG)};
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.비강조3};
`;

const UserBox = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
  align-items: center;
  color: ${palette.비강조};
  font-size: 12px;
  text-align: center;

  font-weight: 400;
`;
const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;

  color: ${palette.기본};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const Day = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조2};
`;

const Content = styled.div`
  padding: 4px 16px 10px 40px;
  white-space: pre-line;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  word-break: break-all;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding-left: 40px;
`;

const Like = styled.button<{ liked: boolean }>`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.liked ? palette.keycolor : palette.비강조2)};
  gap: 6px;
`;
const Reply = styled.button<{ isReplied: boolean }>`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;

  display: flex;
  align-items: center;
  color: ${(props) => (props.isReplied ? palette.keycolor : palette.비강조2)};
`;

export default Comment;
