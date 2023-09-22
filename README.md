# Intro

## Tasks 1 - 3
Tests for tasks 1 - 3 can be run from the root folder using script:

```bash
npm run wdio
```

Automated scenarios are:
- _Hover page_:
    - 'View Profile' button should be displayed for each profile on hover (checks each user element)
    - Can click 'View Profile' button for each profile (checks each user element)
- _Login page_:
    - User should be able to login through the login form
    - User should be able to logout from the secure page
- _Tables page (table 1)_:
    - The table should be displayed
    - Table column's headers should be clickable
    - 'Edit' buttons should be clickable
    - 'Delete' buttons should be clickable
    - Table headers have correct values
    - User should be able to sort the table by each column in ascending/descending order (check sorting by each column and each order)
    

## Tasks 4 - 5
Script for tasks 4 and 5 can be run from the root folder using:

```bash
npm run separate-tasks:run
```

Script executes:
- _Checkboxes_:
    - Clicks on each checkbox random number of times
- _Dropdown_:
    - Randomly selects an option from the dropdown