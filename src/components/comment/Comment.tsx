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

interface CommentProps {
  comment: IComment;
  relatedType: "travel" | "community";
  relatedNumber: number;
}

const Comment = ({ comment, relatedType, relatedNumber }: CommentProps) => {
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
  const { reportSuccess, setReportSuccess } = reportStore();
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
          <UserName>{comment.writer}</UserName>

          <Dot>·</Dot>
          <Day>{daysAgoFormatted(comment.regDate)}</Day>
        </UserBox>

        <button onClick={onClickThreeDots}>
          <EllipsisIcon />
        </button>
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
        showSelect={false}
        isModalOpen={isResultModalOpen}
        modalMsg={COMMENT_MODAL_MESSAGES.deleteMessage}
        modalTitle={COMMENT_MODAL_MESSAGES.title}
        modalButtonText={COMMENT_MODAL_MESSAGES.text}
        setIsSelected={setCheckingModalClicked}
        setModalOpen={setIsResultModalOpen}
      />
      <CheckingModal
        isModalOpen={reportSuccess}
        modalMsg={"소중한 의견 감사합니다."}
        modalTitle={"신고 완료"}
        modalButtonText={"닫기"}
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
