import pandas as pd

# Load the dataset
file_path = '/Users/szeyuin/Documents/FIT3179/HomeworkWeek9/data/forest_reserve_state.csv'
forest_data = pd.read_csv(file_path)

# Filter for the latest year (2021)
latest_year_data = forest_data[forest_data['year'] == 2021]

# Clean the dataset further if necessary (e.g., drop NaNs)
latest_year_data_cleaned = latest_year_data.dropna(subset=['area'])

# Save the cleaned dataset for 2021
latest_year_data_path = '/Users/szeyuin/Documents/FIT3179/HomeworkWeek9/data/forest_reserve_state_2021_cleaned.csv'
latest_year_data_cleaned.to_csv(latest_year_data_path, index=False)

print(f"Filtered and cleaned dataset (2021) saved at: {latest_year_data_path}")
