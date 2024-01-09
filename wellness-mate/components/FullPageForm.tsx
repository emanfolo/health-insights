import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  Dropdown,
  FormCard,
  Input,
  LoadingSpinner,
  MultiValueInput,
  ToggleSwitch,
} from "../atoms";
import { GoalOptions, schema } from "../utils";
import { useRouter } from "next/router";
import { MealplanCreationParams } from "../interfaces";
import Cookie from "js-cookie";
import { ToggleOn } from "../icons";

export const FullPageForm = () => {
  const router = useRouter();
  const [includeHealthData, setIncludeHealthData] = useState(true);
  const [includeHealthGoals, setIncludeHealthGoals] = useState(true);
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

  // Move schema here and make it conditional

  const generateMealPlan = async (values: MealplanCreationParams) => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? process.env.API_URL
          : "http://127.0.0.1:5000";
      const requestUrl = `${apiUrl}/mealplan`;
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
      setLoading(false);
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
    <div className=" flex flex-col lg:flex-row">
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
        validationSchema={schema}
      >
        {({ values, errors, touched }) => {
          console.log(values);
          return (
            <>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="p-8 lg:w-1/2">
                  <Form className="flex flex-col gap-8">
                    <FormCard>
                      <div className="flex items-center justify-between">
                        <text className=" text-2xl font-bold">
                          Food Preferences
                        </text>
                        <div className="text-red-500 flex flex-col items-end text-xs">
                          <ToggleOn /> Required{" "}
                        </div>
                      </div>
                      <MultiValueInput
                        label="Enter up to five of your favourite foods"
                        name="food_preferences"
                        className=""
                        values={values.food_preferences}
                      />

                      <ErrorMessage name="food_preferences" />

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

                      {Object.keys(schema).map((field) => (
                        <ErrorMessage name={field} />
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
                    <div className=" lg:w-1/2 lg:fixed lg:right-0">
                      <div className=" flex flex-col items-center">
                        <button
                          type="submit"
                          className="border rounded-lg w-fit px-5 py-1"
                          // onClick={() => handleSubmit(values)}
                        >
                          Submit
                        </button>
                        {/* <text>
                    Current estimated TDEE basic breakdown/estimated
                    calories/macros target
                  </text>
                  <text>x% more likely to get food containing x</text>
                  <text>will not receive food containing x or x</text> */}
                      </div>
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
