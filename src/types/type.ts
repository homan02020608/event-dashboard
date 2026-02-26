export type EventType =
  | 'CONCERT'
  | 'REAL_MEETING'
  | 'REAL_SIGN'
  | 'REAL_GAMESEVENT'
  | 'REAL_EVENT'
  | 'ONLINE_MEETING'
  | 'ONLINE_SIGN'
  | 'OTHER';

export type EventStatus =
  | 'PLANNED'
  | 'ATTENDED'
  | 'CANCELLED';

export type EventCardTypes = {
  id: string
  authorId?: string
  title: string
  date: Date
  eventStartTime: string
  region: string
  venue: string
  seat: string
  eventType?: EventType
  status?: EventStatus
  createdAt?: Date
  updatedAt?: Date
}

export type EventFormData = {
  eventTitle: string
  date: Date
  region: string
  venue: string
  seat: string
}

export type RepoDataTypes = {
  id: string;
  date: Date;
  venue: string;
  part: string;
  sheets: string;
  repoType: string;
  artistName: string;
  isPublic: boolean
  isBookmarked: boolean;
}

export type Conversation = {
  sender: 'user' | 'artist';
  text: string;
  order: number;
};

export type GetRepoParams = {
  sort?: string
  repoType?: string
  artistName?: string
  isPublic?: string
}

export type GetEventParmas = {
  sort?: string
  region?: string
}

export type DeleteConfirmAlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void
  onConfirmDelete: () => void
  count: number
  title: string
}

export type ExpensesEventProps = {
  id: string
  title: string
}

export type ExpensesDataTypes = {
  id: string
  memo: string | null
  category: string
  amount: number
  eventId: string | null
  date: Date
  createdAt?: Date
  updatedAt?: Date
}

export type EventCardTypesSource = Partial<EventCardTypes>;