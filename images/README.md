# Image Folder Structure

This folder contains all images used by the Sopaana website.

## Folder Structure

```
images/
├── hero-backgrounds/     # Hero section background images
│   ├── background-1.jpg  # Main hero background
│   ├── background-2.jpg  # Secondary hero background
│   ├── background-3.jpg  # Third hero background
│   └── ...              # Add more backgrounds as needed
├── campaigns/           # Campaign-specific images
├── services/           # Service-related images
└── general/           # General website images
```

## Hero Background Images

### Requirements:
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 1920x1080px or larger
- **Aspect Ratio**: 16:9 or similar widescreen format
- **File Size**: Keep under 500KB for optimal loading
- **Naming**: Use `background-1.jpg`, `background-2.jpg`, etc.

### How to Add New Background Images:

1. **Upload your image** to the `images/hero-backgrounds/` folder
2. **Name it** following the pattern: `background-X.jpg` (where X is the next number)
3. **Update the background manager** by adding the new image path to the `backgrounds` array in `background-manager.js`

### Example:
If you add `background-6.jpg`, update the `backgrounds` array in `background-manager.js`:

```javascript
this.backgrounds = [
    'images/hero-backgrounds/background-1.jpg',
    'images/hero-backgrounds/background-2.jpg',
    'images/hero-backgrounds/background-3.jpg',
    'images/hero-backgrounds/background-4.jpg',
    'images/hero-backgrounds/background-5.jpg',
    'images/hero-backgrounds/background-6.jpg'  // Add this line
];
```

## Campaign Images

For campaign-specific images:
1. Create a new folder in `images/campaigns/` with the campaign name
2. Add your campaign images there
3. Reference them in your HTML/CSS as needed

## Image Optimization Tips

1. **Compress images** before uploading to reduce file size
2. **Use WebP format** when possible for better compression
3. **Provide multiple sizes** for responsive design
4. **Test loading times** to ensure good user experience

## Automatic Background Rotation

The hero section automatically rotates through background images every 5 seconds with smooth fade transitions. The system:

- Preloads all images for smooth transitions
- Falls back to gradient background if no images are found
- Supports dynamic addition/removal of backgrounds via JavaScript 