import { useEffect } from 'react'
import SubscriberList from './components/SubscriberList'
import { Analytics } from "@vercel/analytics/react"
import './styles/index.css'

function App() {
  useEffect(() => {
    if (import.meta.env.PROD) {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
      console.info = () => {};
      console.debug = () => {};
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <SubscriberList />
      <Analytics />
    </>
  )
}

export default App