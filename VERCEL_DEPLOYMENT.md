# Vercel Deployment Guide for Vault Loan Shield

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Instructions

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository: `0xBitFox/vault-loan-shield`
4. Click **"Import"**

### Step 2: Configure Build Settings

1. **Framework Preset**: Select **"Vite"**
2. **Root Directory**: Leave as default (`.`)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**Important**: Make sure to set these for all environments (Production, Preview, Development).

### Step 4: Configure Build Settings

1. Go to **Settings** → **Build & Development Settings**
2. Set the following:
   - **Node.js Version**: `18.x`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for the build process to complete
3. Vercel will provide you with a deployment URL

### Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Verify Environment Variables

Ensure all environment variables are properly set:
- Check the Vercel dashboard for any missing variables
- Test the application to ensure wallet connection works

### 2. Test Wallet Connection

1. Open the deployed application
2. Click "Connect Wallet"
3. Verify that wallet connection works properly
4. Test switching between networks

### 3. Monitor Performance

1. Check Vercel Analytics for performance metrics
2. Monitor build logs for any errors
3. Set up monitoring and alerts if needed

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (should be 18.x)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify values are correct

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches

### Build Optimization

1. **Enable Edge Functions** (if needed):
   - Go to Settings → Functions
   - Enable Edge Runtime for better performance

2. **Configure Caching**:
   - Set appropriate cache headers
   - Enable CDN for static assets

## Production Checklist

- [ ] All environment variables configured
- [ ] Build completes successfully
- [ ] Wallet connection works
- [ ] All pages load correctly
- [ ] Responsive design works on mobile
- [ ] SSL certificate is active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics and monitoring set up

## Support

If you encounter issues:

1. Check Vercel build logs
2. Verify GitHub repository access
3. Ensure all environment variables are set
4. Contact Vercel support if needed

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/installation)
- [Wagmi Documentation](https://wagmi.sh/)

---

**Note**: This deployment guide assumes you have already set up your GitHub repository and have the necessary environment variables ready. Make sure to test the application locally before deploying to production.
