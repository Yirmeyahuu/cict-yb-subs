# 📚 CICT Yearbook Subscribers

<div align="center">
  
  ![CICT Yearbook](public/cictybthumbnail.png)
  
  **A sleek and modern subscriber list application for CICT Yearbook**
  
  [![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## ✨ Features

🎨 **Modern UI/UX**
- Beautiful dark and light mode themes
- Smooth GSAP animations on page load
- Responsive design for all devices

🔍 **Smart Search**
- Real-time subscriber search
- Highlighted search results
- Alphabetically sorted list

🌓 **Theme Toggle**
- Sleek pill-shaped toggle button
- Smooth theme transitions
- Persistent color schemes

📱 **Responsive Design**
- Desktop table view
- Mobile-optimized card layout
- Touch-friendly interface

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd cictyb-subs

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Styling |
| **GSAP** | Animations |
| **React Router** | Navigation |

---

## 📁 Project Structure

```
cictyb-subs/
├── src/
│   ├── components/
│   │   └── SubscriberList.tsx    # Main component
│   ├── data/
│   │   └── subscribers.json       # Subscriber data
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── App.tsx                    # Root component
│   └── main.tsx                   # Entry point
├── public/
│   ├── CICTrelicon.svg           # Favicon
│   └── cictybthumbnail.png       # Social media thumbnail
└── index.html                     # HTML template
```

---

## 🎨 Color Palette

### Dark Mode
```
Background: #0C0C0C
Primary:    #1a1a1a
Border:     #2a2a2a
Accent:     #ef4444 (Rose)
```

### Light Mode
```
Background: #F9F8F6
Primary:    #ffffff
Border:     #dee2e6
Accent:     #ef4444 (Rose)
```

---

## 📊 Data Structure

```typescript
interface Subscriber {
  id: string;
  name: string;
  course: string;
  yearLevel: string;
}
```

---

## 🔧 Configuration

### Adding Subscribers

Edit `src/data/subscribers.json`:

```json
[
  {
    "id": "2021-12345",
    "name": "John Doe",
    "course": "BSIT",
    "yearLevel": "4th Year"
  }
]
```

### Customizing Theme

Modify `theme` object in `SubscriberList.tsx`:

```typescript
const theme = {
  dark: {
    bg: '#0C0C0C',
    // ... other colors
  },
  light: {
    bg: '#F9F8F6',
    // ... other colors
  }
};
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the project and deploy the `dist` folder:

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

---

## 🎯 Features Roadmap

- [ ] Export to PDF/CSV
- [ ] Pagination for large lists
- [ ] Advanced filtering (by course, year)
- [ ] User authentication
- [ ] Admin panel for managing subscribers
- [ ] Email notifications

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👥 Credits

**Developer:** CICT Web Development Team  
**Font:** [Geist by Vercel](https://vercel.com/font)  
**Icons:** Heroicons  
**Animations:** GSAP

---

## 📧 Contact

For questions or support, please reach out to:
- Email: cict@example.com
- Website: [CICT Portal](https://cict.example.com)

---

<div align="center">
  
  **Made with ❤️ by CICT Students**
  
  ⭐ Star this repo if you find it helpful!

</div>