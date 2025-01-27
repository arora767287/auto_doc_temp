import requests
import json

TESTRAIL_BASE_URL = "https://usepepprai.testrail.io"
USERNAME = "nitya.arora@identity-wallet.com"
API_KEY = "n9OENBc1MOx9poosaSHv-pVj4hIN5qGnTZ8qBA1U9"
PROJECT_ID = 1         # The project where you're adding these test cases
SECTION_ID = 1         # The section ID within that project (create a new section if needed)

def create_test_rail_cases(json_file):
    with open(json_file, 'r') as f:
        cases_data = json.load(f)

    for case_data in cases_data:
        url = f"{TESTRAIL_BASE_URL}/index.php?/api/v2/add_case/{SECTION_ID}"
        resp = requests.post(url, auth=(USERNAME, API_KEY), json=case_data)
        if resp.status_code == 200:
            created_case = resp.json()
            print(f"Created TestRail Case ID: {created_case['id']} -- {created_case['title']}")
        else:
            print(f"Failed to create case: {resp.status_code} {resp.text}")

# Run it
if __name__ == "__main__":
    create_test_rail_cases("testrail_cases.json")