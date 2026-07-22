import React from 'react';
import { Plus } from 'lucide-react';

interface BottomNavProps {
  onOpenModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenModal }) => {
  return (
    <>
      <button
        onClick={onOpenModal}
        className="fab-add"
        title="Add Blood Pressure Reading"
      >
        <Plus size={28} />
      </button>
    </>
  );
};
