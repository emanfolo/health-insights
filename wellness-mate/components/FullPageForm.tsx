import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Dropdown, FormCard, Input, MultiValueInput } from "../atoms";
import { GoalOptions } from "../utils";
import { useRouter } from "next/navigation";
import { MealplanCreationParams } from "../interfaces";
import Cookie from "js-cookie";

const schema = yup.object().shape({
  food_preferences: yup.string().required(""),
  // email: yup.string().email().required(),
});

export const FullPageForm = () => {
  const router = useRouter();

  const handleSubmit = (values: MealplanCreationParams) => {
    Cookie.set("mealPlanCreationParams", JSON.stringify(values), {
      expires: 1,
      path: "/mealplan",
    });
    localStorage.removeItem("formData");
    router.push("/mealplan");
  };

  /*  
                            Next page is second half of the form, with an option to skip any or all questions 
                            You can disable whole sections with a switch button. the switch will be a circle 
                            Either like the bluetooth on the mac navbar. Bluetooth for sections, 
                            Or like turning off an iphone? but smaller Iphone for navbar 
                        
                        */

  const [initialValues, setInitialValues] = useState({
    weight: undefined,
    height: undefined,
    age: undefined,
    gender: undefined,
    activity_level: undefined,
    food_preferences: [],
    allergies: [],
    mealplan_length: 1,
    protein: "medium",
    goals: "improve_health",
    excluded_foods: [],
    eating_frequency: { breakfast: "Yes", meals: "3", snacks: "1" },
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set flag to true when component mounts
    setIsMounted(true);

    // Check if there's form data in localStorage
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setInitialValues(JSON.parse(storedFormData));
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className=" flex">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values }) => {
          // console.log(values);
          return (
            <>
              <div className="w-1/2 p-8">
                <Form className="flex flex-col gap-10">
                  <FormCard>
                    <text className=" text-2xl font-bold">
                      Food Preferences
                    </text>

                    <MultiValueInput
                      label="Enter up to five of your favourite foods"
                      name="food_preferences"
                      className=""
                      values={values.food_preferences}
                    />

                    <MultiValueInput
                      label="Enter any excluded foods"
                      name="excluded_foods"
                      className=""
                      values={values.excluded_foods}
                    />

                    <MultiValueInput
                      label="Enter any allergies"
                      name="allergies"
                      className=""
                      values={values.allergies}
                    />

                    <div>
                      <label>Select your preferred eating pattern</label>
                      <div className="flex gap-8 mt-2">
                        <Dropdown
                          itemIds={["Yes", "Skip"]}
                          name="eating_frequency.breakfast"
                          label="Breakfast"
                          className="flex flex-col gap-2"
                          labelClass="font-bold"
                        />
                        <Dropdown
                          itemIds={["2", "3", "4"]} // Change these options? - need to make sure we meet our quota
                          name="eating_frequency.meals"
                          label="Meals"
                          className="flex flex-col gap-2"
                          labelClass="font-bold"
                        />
                        <Dropdown
                          itemIds={["0", "1", "2"]} // Change these options
                          name="eating_frequency.snacks"
                          label="Snacks"
                          className="flex flex-col gap-2"
                          labelClass="font-bold"
                        />
                      </div>
                    </div>
                  </FormCard>

                  <FormCard>
                    <text className=" text-2xl font-bold">
                      Basic Health Data
                    </text>
                    <Input
                      label="Height (cm)"
                      name="height"
                      type="number"
                      className="mt-2 h-[40px]"
                    />
                    <Input
                      label="Weight (kg)"
                      name="weight"
                      type="number"
                      className="mt-2 h-[40px]"
                    />
                    <Input
                      label="Age"
                      name="age"
                      type="number"
                      className="mt-2 h-[40px]"
                    />
                    <Dropdown
                      itemIds={["male", "female", "non-binary"]}
                      label="Gender"
                      name="gender"
                      className="flex flex-col gap-2"
                    />
                  </FormCard>

                  <FormCard>
                    <text className=" text-2xl font-bold">Health Goals</text>
                    <div className=" flex flex-col">
                      <Dropdown
                        itemIds={GoalOptions}
                        name="goals"
                        label="Select your health goals"
                        className="flex flex-col gap-2"
                      />
                    </div>
                    <div className=" flex flex-col">
                      <Dropdown
                        itemIds={[
                          "sedentary",
                          "lightly_active",
                          "moderately_active",
                          "very_active",
                          "extremely_active",
                        ]}
                        name="activity_level"
                        label="Select your activity level"
                        className="flex flex-col gap-2"
                      />
                    </div>
                  </FormCard>
                </Form>
              </div>
              <div className="w-1/2 p-8">
                <div className="fixed flex flex-col">
                  <button
                    className="border rounded-lg"
                    onClick={() => handleSubmit(values)}
                  >
                    Submit
                  </button>
                  <text>
                    Current estimated TDEE basic breakdown/estimated
                    calories/macros target
                  </text>
                  <text>x% more likely to get food containing x</text>
                  <text>will not receive food containing x or x</text>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};
