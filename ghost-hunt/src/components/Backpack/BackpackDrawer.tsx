import React, { ReactNode } from 'react';

interface BackpackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BackpackDrawer: React.FC<BackpackDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="backpack-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.2)',
          zIndex: 998,
          animation: 'fadeIn 0.3s ease-in-out',
        }}
      />

      {/* Drawer - Manila Folder Style */}
      <div
        className="backpack-drawer"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60vh',
          maxHeight: '600px',
          zIndex: 999,
          animation: 'slideUp 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Aged paper background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#d8d4c8',
            zIndex: 0,
          }}
        />

        {/* Wrinkled paper texture */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
            opacity: 0.4,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Dust overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dust'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23dust)' opacity='0.2'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.2,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Worn top edge */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(180deg, rgba(139, 69, 19, 0.4) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Tape strips at top */}
        <div
          style={{
            position: 'absolute',
            top: '-5px',
            left: '15%',
            width: '60px',
            height: '15px',
            background: 'rgba(255, 255, 255, 0.7)',
            transform: 'rotate(-2deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-5px',
            right: '20%',
            width: '50px',
            height: '15px',
            background: 'rgba(255, 255, 255, 0.65)',
            transform: 'rotate(3deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Content container */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>

        {/* Bottom shadow for depth */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '20px',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .backpack-drawer {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  );
};
