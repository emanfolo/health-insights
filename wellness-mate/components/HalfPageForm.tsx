"use client";
import React, { useEffect } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import Link from "next/link";
import { Button, Dropdown, Input } from "../atoms";
import { GoalOptions } from "../utils/mealplans";
import { useRouter } from "next/navigation";
import { MealplanCreationParams } from "../interfaces";

export const HalfPageForm = () => {
  // set type soon
  const handleFormContinue = (values: MealplanCreationParams) => {
    localStorage.setItem("formData", JSON.stringify(values));
    console.log("Data saved to localStorage:", values);
  };

  const router = useRouter();

  return (
    <section className="w-1/2 my-auto">
      <div className="flex flex-col justify-center space-y-4 p-14">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to WellnessMate.
          </h1>
          <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Personalize your wellness journey.
          </p>
        </div>
        <div className="h-[400px] flex flex-col  gap-4 p-8 border rounded-lg">
          <Formik
            initialValues={{
              weight: undefined,
              height: undefined,
              age: undefined,
              gender: undefined,
              activity_level: undefined,
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
              console.log(values);
              return (
                <Form>
                  <div className=" flex flex-col">
                    {/* Change to multi input */}
                    <Input
                      label="Enter some of your favourite foods"
                      name="food_preferences"
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
                        itemIds={["Yes", "Skip"]}
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
                      type="submit"
                      text="Create a mealplan"
                      onClick={() => router.push("/create")}
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
