import React from 'react';
import { BorrowerShare } from '../types';
import { ShareBookCard } from './ShareBookCard';

interface BorrowCardProps {
  share: BorrowerShare;
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