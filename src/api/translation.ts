import { axiosInstance } from ".";

const API_KEY = process.env.NEXT_PUBLIC_DEEPL_API;
const API_URL = "https://api-free.deepl.com/v2/translate";

export const postTranslate = async (text: string) => {
  try {
    const response = await axiosInstance.post(API_URL, null, {
      params: {
        auth_key: API_KEY,
        text: text,
        target_lang: "KO",
      },
    });
    return response.data.translations[0].text;
  } catch (error) {
    console.error("Translation error:", error);
  }
};
