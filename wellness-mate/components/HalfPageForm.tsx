"use client";
import React from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { Button, Dropdown, Input, MultiValueInput } from "../atoms";
import { GoalOptions } from "../utils";
import { useRouter } from "next/navigation";
import { MealplanCreationParams } from "../interfaces";

export const HalfPageForm = () => {
  const router = useRouter();

  const handleFormContinue = (values: MealplanCreationParams) => {
    localStorage.setItem("formData", JSON.stringify(values));
    console.log("Data saved to localStorage:", values);
    router.push("/create");
  };

  return (
    <section className=" my-auto lg:w-1/2">
      <div className="p-8 flex flex-col justify-center gap-4 lg:p-14">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to WellnessMate.
          </h1>
          <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Personalize your wellness journey.
          </p>
        </div>
        <div className=" flex flex-col p-8 border rounded-lg shadow-md">
          <Formik
            initialValues={{
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
            }}
            onSubmit={handleFormContinue}
          >
            {({ values }) => {
              return (
                <Form className="flex flex-col gap-4">
                  <div className=" flex flex-col">
                    <MultiValueInput
                      label="Enter up to five of your favourite foods"
                      name="food_preferences"
                      className=""
                      values={values.food_preferences}
                    />
                  </div>
                  <div className=" flex flex-col">
                    <Dropdown
                      itemIds={GoalOptions}
                      name="goals"
                      label="Select your health goals"
                    />
                  </div>
                  <div className=" flex flex-col text-sm">
                    <label>Select your preferred eating pattern</label>
                    <div className="flex gap-4 mt-2">
                      <Dropdown
                        itemIds={["Yes", "No"]}
                        name="eating_frequency.breakfast"
                        label="Breakfast"
                        className=""
                        labelClass="font-bold"
                      />
                      <Dropdown
                        itemIds={["2", "3", "4"]}
                        name="eating_frequency.meals"
                        label="Meals"
                        className=""
                        labelClass="font-bold"
                      />
                      <Dropdown
                        itemIds={["0", "1", "2", "3"]}
                        name="eating_frequency.snacks"
                        label="Snacks"
                        className=""
                        labelClass="font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="button"
                      text="Create a mealplan"
                      onClick={() => handleFormContinue(values)}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
};
