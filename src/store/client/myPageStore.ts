"use client";
import { create } from "zustand";

interface myPageStoreState {
  email: string;
  addEmail: (email: string) => void;
  name: string;
  addName: (name: string) => void;
  profileUrl: string;
  addProfileUrl: (profileUrl: string) => void;
  gender: string;
  addGender: (sex: string) => void;
  agegroup: string;
  addAgegroup: (agegroup: string) => void;
  proIntroduce?: string;
  addProIntroduce?: (proIntroduce: string) => void;
  preferredTags: string[];
  addPreferredTags: (preferredTags: string[]) => void;
  isNameUpdated: boolean;
  addIsNameUpdated: (isNameUpdated: boolean) => void;
  isProfileImgUpdated: boolean;
  addIsProfileImgUpdated: (isProfileImgUpdated: boolean) => void;
  isTagUpdated: boolean;
  addIsTagUpdated: (isTagUpdated: boolean) => void;
  isPasswordUpdated: boolean;
  addIsPasswordUpdated: (isPasswordUpdated: boolean) => void;
  userSocialTF: boolean;
  addUserSocialTF: (userSocialTF: boolean) => void;
}

export const myPageStore = create<myPageStoreState>((set) => ({
  name: "",
  addName: (name) => {
    set((state) => ({ name: name }));
  },
  userSocialTF: false,
  addUserSocialTF: (userSocialTF) => {
    set((state) => ({ userSocialTF: userSocialTF }));
  },
  profileUrl: "",
  addProfileUrl: (profileUrl) => {
    set((state) => ({ profileUrl: profileUrl }));
  },
  gender: "",
  addGender: (gender) => {
    set((state) => ({ gender }));
  },
  agegroup: "",
  addAgegroup: (agegroup) => {
    set((state) => ({ agegroup }));
  },
  preferredTags: [],
  addPreferredTags: (preferredTags) => {
    set((state) => ({ preferredTags }));
  },
  email: "",
  addEmail: (email) => {
    set((state) => ({ email: email }));
  },
  proIntroduce: "",
  addProIntroduce: (proIntroduce) => {
    set((state) => ({ proIntroduce }));
  },
  isNameUpdated: false,
  addIsNameUpdated: (isNameUpdated) => {
    set((state) => ({ isNameUpdated }));
  },
  isProfileImgUpdated: false,
  addIsProfileImgUpdated: (isProfileImgUpdated) => {
    set((state) => ({ isProfileImgUpdated }));
  },
  isTagUpdated: false,
  addIsTagUpdated: (isTagUpdated) => {
    set((state) => ({ isTagUpdated }));
  },
  isPasswordUpdated: false,
  addIsPasswordUpdated: (isPasswordUpdated) => {
    set((state) => ({ isPasswordUpdated }));
  },
}));
