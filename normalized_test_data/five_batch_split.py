import json
import os
from math import ceil

# Input and output file paths
input_file = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/sorted_global_all_tickets.json"  # Replace with your input file path
output_folder = "/Users/nityaarora/Downloads/new_auto_doc/auto_doc_temp/normalized_test_data/global_batches"  # Replace with your desired output folder name

# Load JSON data
with open(input_file, "r") as file:
    data = json.load(file)

# Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Split data into 5 batches
num_batches = 5
batch_size = ceil(len(data) / num_batches)

for batch_num in range(num_batches):
    start_index = batch_num * batch_size
    end_index = start_index + batch_size
    batch_data = data[start_index:end_index]
    
    # Save each batch to a separate file
    batch_file = os.path.join(output_folder, f"batch_{batch_num + 1}.json")
    with open(batch_file, "w") as batch_file_obj:
        json.dump(batch_data, batch_file_obj, indent=4)

print(f"Data successfully split into {num_batches} batches and saved in the '{output_folder}' folder.")
