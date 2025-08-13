# Domain Setup Guide for Your Websites

## 🌐 Your Websites on SuggestlyG4Plus

Your three websites are now configured and ready to be hosted on the SuggestlyG4Plus platform:

### 1. OnTarget Couriers
- **Current Path**: `suggestlyg4plus.io/ontargetcouriers`
- **Target Domain**: `www.ontargetcouriers.co.uk`
- **Theme**: Modern with red branding
- **Business Type**: Courier and delivery services

### 2. OnTarget Designs
- **Current Path**: `suggestlyg4plus.io/ontargetdesigns`
- **Target Domain**: `www.ontargetdesigns.com`
- **Theme**: Minimal with purple branding
- **Business Type**: Web design and digital marketing

### 3. Velocities Ltd
- **Current Path**: `suggestlyg4plus.io/velocities`
- **Target Domain**: `www.velocities.ltd`
- **Theme**: Dark with cyan branding
- **Business Type**: Technology consultancy

## 🚀 Setting Up Custom Domains

### Option 1: DNS Configuration (Recommended)

1. **Access your domain registrar** (where you bought the domains)
2. **Update DNS settings** for each domain:

#### For www.ontargetcouriers.co.uk:
```
Type: CNAME
Name: www
Value: suggestlyg4plus.io
TTL: 3600 (or default)
```

#### For www.ontargetdesigns.com:
```
Type: CNAME
Name: www
Value: suggestlyg4plus.io
TTL: 3600 (or default)
```

#### For www.velocities.ltd:
```
Type: CNAME
Name: www
Value: suggestlyg4plus.io
TTL: 3600 (or default)
```

### Option 2: Vercel Domain Configuration

If you're using Vercel for hosting:

```bash
# Add custom domains to your Vercel project
vercel domains add www.ontargetcouriers.co.uk
vercel domains add www.ontargetdesigns.com
vercel domains add www.velocities.ltd
```

### Option 3: Subdomain Routing (Alternative)

You can also access your sites via subdomains:

- `ontargetcouriers.suggestlyg4plus.io`
- `ontargetdesigns.suggestlyg4plus.io`
- `velocities.suggestlyg4plus.io`

## 🔧 Advanced Configuration

### Custom Domain Detection

The platform automatically detects which site to show based on the domain. You can enhance this by updating the `useSiteManager.js` hook:

```javascript
// Add domain mapping
const DOMAIN_MAPPING = {
  'www.ontargetcouriers.co.uk': 'ontargetcouriers',
  'www.ontargetdesigns.com': 'ontargetdesigns',
  'www.velocities.ltd': 'velocities'
};
```

### SSL Certificates

Ensure SSL certificates are configured for each domain:
- Automatic SSL with Let's Encrypt (Vercel)
- Manual SSL certificate installation
- Wildcard certificates for subdomains

## 📊 Analytics Setup

Each site has analytics enabled. Configure Google Analytics:

1. **OnTarget Couriers**: GA4 property for courier services
2. **OnTarget Designs**: GA4 property for design services
3. **Velocities Ltd**: GA4 property for technology services

## 🔄 Content Management

### Access Site Manager
- **URL**: `suggestlyg4plus.io/admin`
- **Features**: Edit content, change themes, update colors
- **Real-time**: See changes instantly

### Custom Content Updates

Each site can be customized with:
- **Hero sections**: Main messaging and calls-to-action
- **About sections**: Company information and services
- **Services/Portfolio**: Showcase your work
- **Contact forms**: Lead generation and inquiries

## 🎨 Branding Customization

### OnTarget Couriers
- **Primary Color**: #dc2626 (Red)
- **Secondary Color**: #991b1b (Dark Red)
- **Theme**: Modern with gradient backgrounds

### OnTarget Designs
- **Primary Color**: #7c3aed (Purple)
- **Secondary Color**: #5b21b6 (Dark Purple)
- **Theme**: Minimal with clean design

### Velocities Ltd
- **Primary Color**: #06b6d4 (Cyan)
- **Secondary Color**: #0891b2 (Dark Cyan)
- **Theme**: Dark with high contrast

## 📱 Mobile Optimization

All sites are fully responsive and optimized for:
- Mobile phones
- Tablets
- Desktop computers
- All modern browsers

## 🚀 Deployment Checklist

- [ ] DNS records updated
- [ ] SSL certificates configured
- [ ] Analytics tracking set up
- [ ] Content reviewed and updated
- [ ] Contact forms tested
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags optimized

## 📞 Support

For domain setup assistance:
1. Check your domain registrar's documentation
2. Contact your hosting provider
3. Review Vercel's domain configuration guide
4. Test domains before going live

---

**Your websites are ready to go live!** 🎉

Access the Site Manager at `/admin` to make any final adjustments before launching your domains.
