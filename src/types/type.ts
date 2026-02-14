export type EventCardTypes = {
  id: string
  authorId: string
  title: string
  date: Date
  eventStartTime: string
  region: string
  venue: string
  seat: string
  createdAt: Date
  upadatedAt: Date
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

export type DeleteConfirmAlertProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void
    onConfirmDelete: () => void
    count: number
    title: string
}

export type EventCardTypesSource = Partial<EventCardTypes>;