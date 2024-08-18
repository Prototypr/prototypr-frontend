
import React, { Suspense } from "react";
import DemoPageContent from "./PageContent";

export const metadata = {
  title: 'Typr Editor - Open-Source Writing Tool by Prototypr',
  description: 'A customizable WYSIWYG editor with publishing flows and user state management for React.js. Built with Tiptap and ProseMirror.',
  openGraph: {
    title: 'Typr Editor - Open-Source Writing Tool by Prototypr',
    description: 'A customizable WYSIWYG editor with publishing flows and user state management for React.js. Built with Tiptap and ProseMirror.',
    images: [
      {
        url: '/static/images/typr-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Tiptypr Editor Preview',
      },
    ],
  },
};


export default function DemoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DemoPageContent />
    </Suspense>
  );
}
