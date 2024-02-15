import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { functions } from "./firebase";
import { Mealplan } from "../interfaces";

export const saveMealplan = async (mealplan: Mealplan) => {
  const createSave = httpsCallable(functions, "saveMealplan");
  try {
    const result = await createSave({ mealplan });
    console.log("Mealplan saved successfully", result.data);
    return result.data;
  } catch (error) {
    console.error("Error calling saveMealplan function:", error.message);
    throw new Error(error?.message || "Failed to save mealplan");
  }
};

export const unsaveMealplan = async (mealplanId: string) => {
  const deleteSave = httpsCallable(functions, "unsaveMealplan");
  try {
    const result = await deleteSave({ mealplanId });
    return result.data;
  } catch (error) {
    console.error("Error calling unsaveMealplan function:", error);
    throw new Error(error.message);
  }
};
