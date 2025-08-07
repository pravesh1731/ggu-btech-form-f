# Frontend Deployment Guide (Vercel)

This guide explains how to deploy the React frontend separately on Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your frontend code to GitHub
3. **Backend API URL**: Your deployed backend API endpoint

## Deployment Steps

### 1. Prepare the Frontend

1. **Navigate to frontend directory**:

   ```bash
   cd frontend/
   ```

2. **Create environment file**:

   ```bash
   cp .env.example .env
   ```

3. **Update environment variables**:
   ```env
   REACT_APP_API_URL=https://your-backend-app.vercel.app
   ```

### 2. Deploy to Vercel

#### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend/
vercel --prod
```

#### Option 2: Using GitHub Integration

1. Create a separate GitHub repository for the frontend
2. Push the `frontend/` directory contents to the root of that repository
3. Connect the repository to Vercel
4. Set build settings in Vercel:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 3. Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variable:
   ```
   REACT_APP_API_URL=https://your-backend-app.vercel.app
   ```

### 4. Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Project Structure for Frontend Deployment

```
frontend/
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment template
├── public/              # Static assets
├── src/                 # React source code
└── build/              # Generated build files
```

## Build Configuration

The `vercel.json` file in the frontend directory is configured for static site deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ]
}
```

## Testing the Frontend

1. Visit your Vercel app URL
2. Check that the app loads correctly
3. Test navigation between pages
4. Verify API calls are being made to the correct backend URL
5. Test form submissions
6. Check admin login functionality

## Troubleshooting

### Common Issues

1. **API Connection Errors**:

   - Verify `REACT_APP_API_URL` is set correctly
   - Check backend CORS configuration
   - Ensure backend is deployed and accessible

2. **Build Failures**:

   - Check package.json dependencies
   - Verify all required environment variables are set
   - Check for TypeScript or ESLint errors

3. **Routing Issues**:
   - Ensure React Router is configured correctly
   - Check that all routes are handled properly

### Debugging Tips

- Use browser developer tools to check network requests
- Check Vercel deployment logs
- Test API endpoints directly using curl or Postman
- Verify environment variables in Vercel dashboard

## Performance Optimization

1. **Code Splitting**: React automatically handles this with lazy imports
2. **Image Optimization**: Use Vercel's image optimization features
3. **Caching**: Configure proper cache headers
4. **Bundle Analysis**: Use `npm run build` to analyze bundle size

## Security Considerations

1. **Environment Variables**: Only use `REACT_APP_` prefix for client-side variables
2. **Sensitive Data**: Never expose sensitive data in frontend code
3. **HTTPS**: Always use HTTPS in production
4. **Content Security Policy**: Configure CSP headers if needed
