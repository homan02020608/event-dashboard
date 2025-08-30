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

export type EventCardTypesSource = Partial<EventCardTypes>;