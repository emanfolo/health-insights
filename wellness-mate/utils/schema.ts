import * as Yup from "yup";

// export const schema = Yup.object().shape({
//   weight: Yup.number().min(40).max(170),
//   height: Yup.number().min(100).max(220),
//   age: Yup.number().min(18).max(120),
//   gender: Yup.string().oneOf(["male", "female", "other"]),
//   activity_level: Yup.string().oneOf([
//     "sedentary",
//     "lightly_active",
//     "moderately_active",
//     "very_active",
//     "extremely_active",
//   ]),
//   food_preferences: Yup.array()
//     .of(Yup.string())
//     .test("maxItems", "Maximum of five preferences allowed", (value) =>
//       value ? value.length <= 5 : true,
//     )
//     .test("minItems", "At least one preference is required", (value) =>
//       value ? value.length >= 1 : false,
//     ),
//   allergies: Yup.array().of(Yup.string()),
//   mealplan_length: Yup.number().min(1).max(7),
//   goals: Yup.string().oneOf(["improve_health", "lose_weight", "gain_muscle"]),
//   excluded_foods: Yup.array().of(Yup.string()),
//   eating_frequency: Yup.object().shape({
//     breakfast: Yup.string().oneOf(["Yes", "No"]),
//     meals: Yup.number().min(1).max(3),
//     snacks: Yup.number().min(0).max(3),
//   }),
// });

// export default schema;

export const createSchema = (
  includeHealthData: boolean,
  includeHealthGoals: boolean,
) => {
  return Yup.object().shape({
    ...(includeHealthData && {
      weight: Yup.number().min(40).max(170),
      height: Yup.number().min(100).max(220),
      age: Yup.number().min(18).max(120),
      gender: Yup.string().oneOf(["male", "female", "other"]),
    }),
    ...(includeHealthGoals && {
      activity_level: Yup.string().oneOf([
        "sedentary",
        "lightly_active",
        "moderately_active",
        "very_active",
        "extremely_active",
      ]),
      goals: Yup.string().oneOf([
        "improve_health",
        "lose_weight",
        "gain_muscle",
      ]),
    }),
    // Other fields that are always validated
    food_preferences: Yup.array()
      .of(Yup.string())
      .test("maxItems", "Maximum of five preferences allowed", (value) =>
        value ? value.length <= 5 : true,
      )
      .test("minItems", "At least one preference is required", (value) =>
        value ? value.length >= 1 : false,
      ),
    // ...rest of your schema
  });
};
