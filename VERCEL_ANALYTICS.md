# Vercel Web Analytics Setup

This project now includes Vercel Web Analytics integration for tracking visitor metrics and page views.

## What was implemented

The Vercel Web Analytics tracking script has been added to `index.html` in the `<head>` section. This includes:

1. A `window.va` function that queues analytics calls
2. A deferred script that loads the analytics tracking code from `/_vercel/insights/script.js`

## How it works

- The analytics script is automatically injected when you deploy to Vercel
- Once deployed, it will track page views and user interactions
- Data will be visible in the Vercel dashboard under the Analytics tab

## Prerequisites for using Web Analytics

To view analytics data:

1. You must have a Vercel account
2. Your project must be deployed to Vercel
3. Enable Web Analytics in your Vercel project dashboard:
   - Go to your project settings
   - Click the Analytics tab
   - Click Enable

## Viewing your data

Once your app is deployed and users have visited your site:

1. Go to your Vercel dashboard
2. Select your project
3. Click the **Analytics** tab
4. After a few days of visitors, you'll be able to explore your data

## Important notes

- The analytics script is configured for production use only
- No additional configuration is needed for this plain HTML site
- The script is deferred to avoid blocking page load
- Network requests to `/_vercel/insights/view` indicate the analytics script is working

## Further reading

For more information about Vercel Web Analytics, visit:
- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Custom Events Guide](https://vercel.com/docs/analytics/custom-events)
- [Privacy and Compliance](https://vercel.com/docs/analytics/privacy-policy)
