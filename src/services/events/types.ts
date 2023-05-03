import { IEvent, IEventCreatePayload } from '@/types'

export interface IState {
	events: IEvent[] | null
	event: IEvent | null
}

export interface IEventsService {
	state: IState
	fetchEvents: () => Promise<IEvent[]>
	fetchEventById: (id: number) => Promise<IEvent>
	createEvent: (event: IEventCreatePayload) => Promise<IEvent>
	editEventById: (event: IEvent, id: number) => Promise<IEvent>
	deleteEventById: (id: number) => Promise<void>
	isOwner: (eventId: number) => Promise<boolean>
}
