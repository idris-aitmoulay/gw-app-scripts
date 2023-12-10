## Gmail: delete old emails automatically

Automatically deletes old emails scripts:

- Create a new Google Apps Script at https://script.google.com
- Overwrite the placeholder with the javascript below

### For `scripts/auto-delete-all-old-emails-on-promotions-category.js`

This script will get all emails in the Promotions category, delete them in batches of 500, and then create a trigger then attach it to `deleteOldCategory` function.

### For `scripts/auto-delete-labeled-emails.js`

This script will get all emails `TO_BE_DELETED` then delete them in batches of 150.

#### How it work

- you need to create `TO_BE_DELETED` in your gmail account
- Label all email that you won't to delete then the script will delete them for you.
