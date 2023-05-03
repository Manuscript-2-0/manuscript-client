import { Event, IEventCreatePayload } from '@/types'

export interface IState {
	events: Event[] | null
	event: Event | null
}

export interface IEventsService {
	state: IState
	fetchEvents: () => Promise<Event[]>
	fetchEventById: (id: number) => Promise<Event>
	createEvent: (event: IEventCreatePayload) => Promise<Event>
	editEventById: (event: Event) => Promise<Event>
	deleteEventById: (id: number) => Promise<void>
}
