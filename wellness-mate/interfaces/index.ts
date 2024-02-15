export type User = {
  id: number;
  name: string;
};

export interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  type?: "submit" | "button";
}

export interface InputProps {
  label: string;
  placeholder?: string;
  name: string;
  className?: string;
  type?: "text" | "number";
  disabled?: boolean;
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
  disabled?: boolean;
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

export type Recipe = {
  fat: number;
  description: string;
  sugars: number;
  carbs: number;
  id: string;
  maincategory: string;
  url: string;
  salt: number;
  serves: number;
  ratings: number;
  dish_type: string;
  name: string;
  kcal: number;
  image: string;
  vote_count: number;
  saturates: number;
  fibre: number;
  ingredients: string[];
  subcategory: string;
  difficult: string;
  protein: number;
  steps: string[];
  author: string;
  nutritional_score: number;
  protein_score: number;
  times: {
    Cooking: number;
    Preparation: number;
  };
};

export type Mealplan = {
  breakfast: Recipe[];
  meals: Recipe[];
  snacks: Recipe[];
};

export interface MealplanDisplayProps {
  mealplan: Mealplan;
}

export interface NutritionalLabelProps {
  kcal: number;
  fat: number;
  saturates: number;
  salt: number;
  carbs: number;
  fibre: number;
  protein: number;
  sugars: number;
}

export type NutrientPercentages = {
  breakfast?: number;
  meals?: number;
  snacks?: number;
  name: string;
};

export interface TopRecipeTileProps {
  highestNutritionalScoreObj: Recipe;
}

export interface StackedBarChartProps {
  keys: string[];
  data: NutrientPercentages[];
}

export interface MiniRecipeTileProps {
  name: string;
  image: string;
  headline?: string;
  description?: string;
  nutriScore?: number;
  proteinScore?: number;
  id: string;
  kcal: number;
}

export interface RecipeRecommendationProps {
  recipe: Recipe;
  recommendations: Recipe[];
}

export interface MealplanSummaryTileProps {
  breakfastItem?: Recipe;
  mealItems: Recipe[];
  snackItems: Recipe[];
  nutritionalSummary: NutritionalSummary;
}

export interface PieChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export type NutritionalSummary = {
  averageNutritionalScore: number;
  averageProteinScore: number;
  totalCalories: number;
  totalCarbs: number;
  totalFibre: number;
  totalFat: number;
  totalProtein: number;
  totalSalt: number;
  totalSaturates: number;
  totalSugars: number;
};

export interface RecipeDisplayProps {
  recipe: Recipe;
  recommended: MiniRecipeTileProps[];
}

export interface RecipeCardProps extends ImageSectionProps, InfoSectionProps {
  id: string;
}

export interface ImageSectionProps {
  image: string;
  name: string;
  description: string;
  rating: number;
  voteCount: number;
  url: string;
}

export interface InfoSectionProps {
  difficulty: string;
  dishType: string;
  prepTime: number;
  cookTime: number;
  kcal: number;
  sugars: number;
  carbs: number;
  fibre: number;
  fat: number;
  protein: number;
  salt: number;
  saturates: number;
  nutritionalScore: number;
  proteinScore: number;
}

export interface RecommendedSectionProps {
  recommended: MiniRecipeTileProps[];
}

export interface FooterSectionProps {
  steps: string[];
  ingredients: string[];
}

export interface ExploreDisplayProps {
  recipes: Recipe[];
}
export interface NavbarButtonProps {
  loggedIn: boolean;
  displayName: string | null;
  photoUrl: string | null;
  onLogin: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}
