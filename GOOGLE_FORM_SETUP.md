# Google Form Subscription Setup Guide

## Overview
The subscribe forms on all pages are now configured to submit email addresses to Google Forms automatically.

## Setup Instructions

### Step 1: Create a Google Form
1. Go to [Google Forms](https://forms.google.com)
2. Create a new form
3. Add a "Short answer" or "Email" question field
4. Name it something like "Email Address" or "Subscribe Email"

### Step 2: Get Your Form ID
1. In your Google Form, click the "Send" button (top right)
2. Click the link icon to get a shareable link
3. The URL will look like: `https://docs.google.com/forms/d/e/FORM_ID_HERE/viewform`
4. Copy the `FORM_ID_HERE` part (this is your Form ID)

### Step 3: Get Your Entry ID
1. Open your Google Form in edit mode
2. Right-click on the email field and select "Inspect" (or press F12)
3. Look for an input field with a name like `entry.123456789`
4. The number after `entry.` is your Entry ID (usually `entry.0` for the first field, `entry.1` for the second, etc.)
5. Alternatively, you can:
   - Submit a test response to your form
   - Open the form's response spreadsheet
   - The column headers will show the entry IDs

### Step 4: Update the Configuration
1. Open `theme/js/script.js`
2. Find the section that says:
   ```javascript
   const GOOGLE_FORM_ID = 'YOUR_FORM_ID_HERE';
   const GOOGLE_FORM_ENTRY_ID = 'entry.0';
   ```
3. Replace `YOUR_FORM_ID_HERE` with your actual Form ID
4. Replace `entry.0` with your actual Entry ID (e.g., `entry.123456789`)

### Step 5: Test
1. Open any page on your website
2. Scroll to the footer
3. Enter an email address in the subscribe form
4. Click submit
5. You should see a success message
6. Check your Google Form responses to verify the email was received

## Features
- ✅ Automatic email collection to Google Forms
- ✅ Success message display after submission
- ✅ Email validation
- ✅ Loading spinner during submission
- ✅ Works on all pages (index, about, contact, faq, how-it-works, terms, privacy-policy)

## Troubleshooting

### Emails not appearing in Google Form
- Verify the Form ID is correct
- Verify the Entry ID matches your email field
- Check browser console for any JavaScript errors
- Make sure the Google Form accepts responses (check form settings)

### Success message not showing
- Check that `js/script.js` is loaded on the page
- Verify the form has `id="subscribeForm"` and input has `id="subscribeEmail"`
- Check browser console for JavaScript errors

## Notes
- The form uses `no-cors` mode, so we can't verify the actual response from Google
- Even if there's a network error, the success message will show (Google Forms may still process the submission)
- All emails are collected in your Google Form's response spreadsheet

