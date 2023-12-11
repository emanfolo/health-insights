def calculate_normalized_protein_score(protein, kcal):
    optimal_protein_ratio = 0.3

    # Calculate protein ratio per calorie
    protein_ratio = protein * 4 / kcal

    # Calculate the protein score as the deviation from the optimal ratio
    protein_score = max(
        0, min(100, 100 - abs(optimal_protein_ratio - protein_ratio) * 100)
    )

    # Normalize the protein score to a range of [0, 5]
    return protein_score / 20


def calculate_nutrition_score(
    carbs, fat, protein, fiber, saturates, kcal, sugars, salt
):
    # Calculate % of calories that are coming from each macro
    carbs_ratio = carbs * 4 / kcal
    fat_ratio = fat * 9 / kcal
    protein_ratio = protein * 4 / kcal

    # Calculate score for other nutrients
    fiber_score = 0.1 * fiber
    saturates_score = -0.3 * saturates
    sugars_score = -0.2 * sugars
    salt_score = -0.1 * salt

    # Optimal ratios
    optimal_carbs_ratio = 0.5
    optimal_protein_ratio = 0.3
    optimal_fat_ratio = 0.2

    # Calculate individual scores for each ratio
    carbs_score = max(0, min(100, 100 - abs(optimal_carbs_ratio - carbs_ratio) * 100))
    protein_score = max(
        0, min(100, 100 - abs(optimal_protein_ratio - protein_ratio) * 100)
    )
    fat_score = max(0, min(100, 100 - abs(optimal_fat_ratio - fat_ratio) * 100))

    # Combine individual scores to get an overall score
    macros_score = (carbs_score + protein_score + fat_score) / 3
    overall_score = max(
        0,
        min(
            100,
            macros_score + saturates_score + sugars_score + salt_score + fiber_score,
        ),
    )
    rounded_score = round(overall_score)

    return rounded_score


# Revised Harris-Benedict Equation
def calculate_bmr(gender="male", weight=80, height=170, age=30):
    if gender == "male":
        return 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
    elif gender == "female":
        return 9.247 * weight + 3.098 * height - 4.330 * age + 447.593
    else:
        return 2000
