"use client";
import { create } from "zustand";

interface CommentStoreProps {
  isEdit: boolean;
  isReply: boolean;
  setOpenEdit: (edit: string) => void;
  setCloseEdit: () => void;
  edit: string;
  parentNumber: number;
  setParentNumber: (parentNumber: number) => void;
  commentNumber: number;
  setCommentNumber: (commentNumber: number) => void;
  setReset: () => void;
}

export const commentStore = create<CommentStoreProps>((set, get) => ({
  isEdit: false,
  setOpenEdit: (edit) => {
    set({ edit, isEdit: true });
  },
  setCloseEdit: () => {
    set({ edit: "", isEdit: false });
  },
  edit: "",
  parentNumber: 0,
  setParentNumber: (parentNumber) => {
    set({ parentNumber, isReply: true });
  },
  commentNumber: -1,
  setCommentNumber: (commentNumber) => {
    set({ commentNumber });
  },
  isReply: false,
  setReset: () => {
    set({
      isEdit: false,
      edit: "",
      parentNumber: 0,
      commentNumber: -1,
      isReply: false,
    });
  },
}));
