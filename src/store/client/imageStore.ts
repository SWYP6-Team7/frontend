"use client";
import { Image } from "@/model/community";
import { create } from "zustand";

export interface UploadImage extends Image {
  isSelected: boolean;
}

export interface EditImage extends Image {
  status: "y" | "n" | "d" | "i";
}

export interface FinalImages {
  deletedTempUrls: string[];
  tempUrls: string[];
}
export interface EditFinalImages {
  statuses: ("y" | "n" | "d" | "i")[];
  urls: string[];
}

interface UploadState {
  images: UploadImage[];
  finalImages: FinalImages;
  addImage: (image: Image) => void;
  removeImage: (imageNumber: number) => void;
  saveFinalImages: () => void;
  reset: () => void;
}

interface EditState {
  images: EditImage[];
  finalImages: EditFinalImages;
  updateImage: (image: Image) => void;
  updateImageStatus: (imageNumber: number, status: "y" | "n" | "d") => void;
  saveFinalImages: (payload: EditFinalImages) => void;

  initializeImages: (images: Image[]) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  images: [],
  finalImages: { deletedTempUrls: [], tempUrls: [] },

  addImage: (image: Image) =>
    set((state) => ({
      images: [...state.images, { ...image, isSelected: true }],
    })),

  removeImage: (imageNumber: number) =>
    set((state) => ({
      images: state.images.map((img) => (img.imageNumber === imageNumber ? { ...img, isSelected: false } : img)),
    })),

  saveFinalImages: () =>
    set((state) => {
      const deletedTempUrls = state.images.filter((img) => !img.isSelected).map((img) => img.url);
      const tempUrls = state.images.filter((img) => img.isSelected).map((img) => img.url);
      return { finalImages: { deletedTempUrls, tempUrls } };
    }),

  reset: () => set({ images: [], finalImages: { deletedTempUrls: [], tempUrls: [] } }),
}));

export const useEditStore = create<EditState>((set) => ({
  images: [],
  finalImages: { statuses: [], urls: [] },

  initializeImages: (images: Image[]) =>
    set({
      images: images.map((img) => ({ ...img, status: "n" as const })),
    }),

  updateImage: (image: Image) =>
    set((state) => {
      const existingImageIndex = state.images.findIndex((img) => img.imageNumber === image.imageNumber);
      if (existingImageIndex >= 0) {
        const updatedImages = [...state.images];
        updatedImages[existingImageIndex] = { ...image, status: "n" }; // 상태를 'n'으로 설정
        return { images: updatedImages };
      }

      return {
        images: [...state.images, { ...image, status: "n" }],
      };
    }),

  updateImageStatus: (imageNumber: number, status: "y" | "n" | "d") =>
    set((state) => ({
      images: state.images.map((img) => (img.imageNumber === imageNumber ? { ...img, status } : img)),
    })),
  saveFinalImages: ({ statuses, urls }) =>
    set(() => ({
      finalImages: { statuses, urls },
    })),

  reset: () => set({ images: [], finalImages: { statuses: [], urls: [] } }),
}));
