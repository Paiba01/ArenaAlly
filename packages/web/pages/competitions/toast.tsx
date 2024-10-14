import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

const ToastContainer = styled.div<{ type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
  background-color: ${({ type }) => 
    type === 'success' ? '#4caf50' : 
    type === 'error' ? '#f44336' : 
    '#2196f3'};
`;

const Toast: React.FC<ToastProps> = ({ message, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <ToastContainer type={type}>
      {message}
    </ToastContainer>
  );
};

export default Toast;