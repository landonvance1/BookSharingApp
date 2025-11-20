import React from 'react';
import { Share } from '../types';
import { ShareBookCard } from './ShareBookCard';

interface BorrowCardProps {
  share: Share;
  showUnarchive?: boolean;
  onArchiveSuccess?: () => void;
}

export const BorrowCard: React.FC<BorrowCardProps> = ({ share, showUnarchive, onArchiveSuccess }) => {
  return (
    <ShareBookCard
      share={share}
      showOwner={true}
      showReturnDate={true}
      showUnarchive={showUnarchive}
      onArchiveSuccess={onArchiveSuccess}
    />
  );
};