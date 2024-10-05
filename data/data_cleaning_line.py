import pandas as pd

# Load the dataset
file_path = '/Users/szeyuin/Documents/FIT3179/HomeworkWeek9/data/forest_reserve_state.csv'
forest_data = pd.read_csv(file_path)

forest_data['date'] = forest_data['date'].apply(lambda x: x.split('-')[0])

# Sort the data by state and date
forest_data = forest_data.sort_values(by=['state', 'date'])

# Calculate percentage change (rate of decrease) for each state
forest_data['rate_of_decrease'] = forest_data.groupby('state')['area'].pct_change() * 100

# Save the data with the new column
forest_data.to_csv("/Users/szeyuin/Documents/FIT3179/HomeworkWeek9/data/forest_reserve_state_rate.csv", index=False)
