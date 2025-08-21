export interface Community {
  id: number;
  name: string;
  active: boolean;
}

export interface CommunityWithMemberCount extends Community {
  memberCount: number;
}