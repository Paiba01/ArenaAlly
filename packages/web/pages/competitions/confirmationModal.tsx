import React, { useEffect } from 'react';
import styled from "styled-components";

const AlertDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AlertDialog = styled.div`
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const AlertDialogContent = styled.div`
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 2em;
  width: 80%;
  max-width: 500px;
  border: 1px solid #e9ecef;
`;

const AlertDialogHeader = styled.div`
  margin-bottom: 1.5em;
`;

const AlertDialogTitle = styled.h2`
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #dc3545;
  font-size: 25px;
`;

const AlertDialogDescription = styled.p`
  font-size: 20px;
  color: #495057;
`;

const AlertDialogFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 2em;
`;

const AlertDialogButton = styled.button`
  font-size: 20px;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const AlertDialogCancel = styled(AlertDialogButton)`
  background-color: #6c757d;
  color: white;
  margin-right: 2em;

  &:hover {
    background-color: #5a6268;
  }
`;

const AlertDialogAction = styled(AlertDialogButton)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Borrar",
  cancelText = "Cancelar"
}) => {

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
    
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AlertDialogOverlay>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogOverlay>
  );
};

export default ConfirmationModal;