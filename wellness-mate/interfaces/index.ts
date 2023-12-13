export type User = {
  id: number;
  name: string;
};

export interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  type?: "submit";
}

export interface InputProps {
  label: string;
  placeholder?: string;
  name: string;
  className?: string;
  type?: "text" | "number";
}

export interface MultiInputProps extends InputProps {
  type?: "text";
  values: string[];
}

export interface InputBadgeProps {
  value: string;
  remove: (value) => void;
}

export interface DropdownProps {
  label: string;
  itemIds: string[] | number[];
  name: string;
  className?: string;
  labelClass?: string;
}

// change these to their options

export type MealplanCreationParams = {
  activity_level?: string;
  // | "sedentary"
  // | "lightly_active"
  // | "moderately_active"
  // | "very_active"
  // | "extremely_active";
  gender?: string; //"male" | "female" | "non-binary";
  age?: number;
  allergies: string[];
  eating_frequency: {
    breakfast: string; //"Yes" | "Skip";
    meals: string; //"2" | "3" | "4";
    snacks: string; //"0" | "1" | "2" | "3";
  };
  excluded_foods: string[];
  food_preferences: string[];
  goals?: string; //"improve_health" | "lose_weight" | "gain_muscle";
  height?: number;
  mealplan_length: number;
  weight?: number;
};
