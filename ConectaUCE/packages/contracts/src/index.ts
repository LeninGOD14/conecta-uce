export interface ApiHealthResponse {
  application: string;
  status: 'UP' | 'DOWN';
  version: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type UserRole = 'STUDENT' | 'MODERATOR' | 'ADMIN';
export type AccountStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export interface StudentProfileSummary {
  id: string;
  fullName: string;
  faculty?: string;
  career?: string;
  avatarUrl?: string;
}

export interface PublicationSummary {
  id: string;
  author: StudentProfileSummary;
  content: string;
  createdAt: string;
  commentCount: number;
  reactionCount: number;
  reactedByCurrentUser: boolean;
}
