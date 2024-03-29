import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dropdown,
  FormCard,
  Input,
  LoadingSpinner,
  MultiValueInput,
  ToggleSwitch,
} from "../atoms";
import { GoalOptions, recipeApiUrl, createSchema } from "../utils";
import { useRouter } from "next/router";
import { MealplanCreationParams } from "../interfaces";

export const FullPageForm = () => {
  const router = useRouter();
  const [includeHealthData, setIncludeHealthData] = useState(true);
  const [includeHealthGoals, setIncludeHealthGoals] = useState(true);
  const [validationSchema, setValidationSchema] = useState(Yup.object());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    weight: 70,
    height: 175,
    age: 45,
    gender: "male",
    activity_level: "sedentary",
    food_preferences: [],
    allergies: [],
    mealplan_length: 1,
    goals: "improve_health",
    excluded_foods: [],
    eating_frequency: { breakfast: "Yes", meals: "3", snacks: "1" },
  });

  useEffect(() => {
    const schema = createSchema(includeHealthData, includeHealthGoals);
    setValidationSchema(schema);
  }, [includeHealthData, includeHealthGoals]);

  const generateMealPlan = async (values: MealplanCreationParams) => {
    try {
      const requestUrl = `${recipeApiUrl}/mealplan`;
      const res = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userDetails: values }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const json = await res.json();
      localStorage.setItem("generatedMealplan", JSON.stringify(json));
    } catch (error) {
      console.error("Error calling API:", error);
      setError("Error calling API, please try again later.");
      throw error;
    }
  };

  const handleSubmit = async (values: MealplanCreationParams) => {
    setLoading(true);
    try {
      await generateMealPlan(values);
      localStorage.removeItem("formData");
      router.push("/mealplan");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setLoading(false);
    }
  };

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
    <div className=" flex flex-col ">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: MealplanCreationParams) => {
          const formData = { ...values };
          if (!includeHealthData) {
            delete formData.height;
            delete formData.age;
            delete formData.weight;
            delete formData.gender;
          }
          if (!includeHealthGoals) {
            delete formData.goals;
            delete formData.activity_level;
          }
          await handleSubmit(formData);
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched }) => {
          return (
            <>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="p-8  ">
                  <Form className="flex flex-col gap-8  lg:px-40">
                    <div>
                      <h1 className="text-5xl font-bold">
                        Generate a Mealplan
                      </h1>
                      <p className="py-6">
                        Discover recipes tailored to your taste and health goals
                        with our flexible search. Our advanced nutritional
                        algorithm curates a selection of healthy recipes that
                        align perfectly with your objectives. Start with as much
                        or as little information as you like.
                      </p>
                    </div>
                    <FormCard>
                      <div className="flex items-center justify-between">
                        <text className=" text-2xl font-bold">
                          Food Preferences
                        </text>
                        <div className="text-red-500 flex flex-col items-end text-xs opacity-50">
                          <input
                            type="checkbox"
                            className="toggle"
                            disabled
                            checked
                          />{" "}
                          Required{" "}
                        </div>
                      </div>
                      <MultiValueInput
                        label="Enter up to five of your favourite foods"
                        name="food_preferences"
                        className=""
                        values={values.food_preferences}
                      />

                      <ErrorMessage
                        className="text-red-500"
                        name="food_preferences"
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

                      {Object.keys(validationSchema).map((field) => (
                        <ErrorMessage className="text-red-500" name={field} />
                      ))}
                      <div>
                        <label>Select your preferred eating pattern</label>
                        <div className="flex gap-8 mt-2">
                          <Dropdown
                            itemIds={["Yes", "No"]}
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
                      <div className="flex items-center justify-between">
                        <text className=" text-2xl font-bold">
                          Basic Health Data
                        </text>
                        <div className="flex flex-col text-xs items-end">
                          <ToggleSwitch
                            boolean={includeHealthData}
                            setBoolean={setIncludeHealthData}
                          />
                          {includeHealthData ? "Enabled" : "Disabled"}
                        </div>
                      </div>
                      <Input
                        label="Height (cm)"
                        name="height"
                        type="number"
                        className="mt-2 h-[40px]"
                        disabled={!includeHealthData}
                      />
                      <Input
                        label="Weight (kg)"
                        name="weight"
                        type="number"
                        className="mt-2 h-[40px]"
                        disabled={!includeHealthData}
                      />
                      <Input
                        label="Age"
                        name="age"
                        type="number"
                        className="mt-2 h-[40px]"
                        disabled={!includeHealthData}
                      />
                      <Dropdown
                        itemIds={["male", "female", "other"]}
                        label="Gender"
                        name="gender"
                        className="flex flex-col gap-2"
                        disabled={!includeHealthData}
                      />
                    </FormCard>

                    <FormCard>
                      <div className="flex items-center justify-between">
                        <text className=" text-2xl font-bold">
                          Health Goals
                        </text>
                        <div className="flex flex-col text-xs items-end">
                          <ToggleSwitch
                            boolean={includeHealthGoals}
                            setBoolean={setIncludeHealthGoals}
                          />
                          {includeHealthGoals ? "Enabled" : "Disabled"}
                        </div>
                      </div>{" "}
                      <div className=" flex flex-col">
                        <Dropdown
                          itemIds={GoalOptions}
                          name="goals"
                          label="Select your health goals"
                          className="flex flex-col gap-2"
                          disabled={!includeHealthGoals}
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
                          disabled={!includeHealthGoals}
                        />
                      </div>
                    </FormCard>
                    <div className=" justify-center flex ">
                      <button
                        type="submit"
                        className="border rounded-lg w-fit px-5 py-1 bg-black text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </>
          );
        }}
      </Formik>
    </div>
  );
};
