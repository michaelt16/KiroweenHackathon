// Toast Notification System - Game-like Feedback
import { useEffect, useState } from 'react';
import './ToastNotification.css';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
  icon?: string;
}

interface ToastNotificationProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getTypeClass = () => {
    switch (toast.type) {
      case 'success':
        return 'toast-success';
      case 'warning':
        return 'toast-warning';
      default:
        return 'toast-info';
    }
  };

  return (
    <div className={`toast-item ${getTypeClass()}`}>
      {toast.icon && <span className="toast-icon">{toast.icon}</span>}
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}

