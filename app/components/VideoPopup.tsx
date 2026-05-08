"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPopup({ isOpen, onClose }: VideoPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Popup Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Video Container */}
        <div className="relative pt-[56.25%] bg-slate-900">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
            title="Leadflow Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">See Leadflow In Action</h3>
          <p className="text-slate-600 mb-4">
            Watch our 2-minute demo to see how Leadflow can transform your lead management process.
          </p>
          <div className="flex gap-3">
            <a
              href="/register"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-center"
            >
              Start Free Trial
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
