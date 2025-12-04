# 📚 CICT Yearbook Subscribers

<div align="center">
  
  ![CICT Yearbook](cictyb-subs/cictybthumbnail.png)
  
  **A sleek and modern subscriber list application for CICT Yearbook**
  
  [![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

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
git clone https://github.com/Yirmeyahuu/cict-yb-subs.git

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

**Developer:** COS Devs
**Font:** [Geist by Vercel](https://vercel.com/font)  
**Icons:** Heroicons  
**Animations:** GSAP

---

## 📧 Contact

For questions or support, please reach out to:
- Email: cosdevsph@outlook.ph
- Website: https://cosdevsph.vercel.app/

---

<div align="center">
  
  **Developed by COS Devs**

</div>