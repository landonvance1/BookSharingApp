import React from 'react';
import { Share } from '../types';
import { ShareBookCard } from './ShareBookCard';

interface BorrowCardProps {
  share: Share;
}

export const BorrowCard: React.FC<BorrowCardProps> = ({ share }) => {
  return (
    <ShareBookCard
      share={share}
      showOwner={true}
      showReturnDate={true}
    />
  );
};