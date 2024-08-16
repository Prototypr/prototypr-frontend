import React, { useEffect } from 'react';

const KofiWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    script.onload = () => {
      window.kofiWidgetOverlay.draw('prototypr', {
        'type': 'floating-chat',
        'floating-chat.donateButton.text': 'Tip Me',
        'floating-chat.donateButton.background-color': '#00b9fe',
        'floating-chat.donateButton.text-color': '#fff'
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default KofiWidget;