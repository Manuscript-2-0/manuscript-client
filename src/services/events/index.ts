import { reactive, readonly } from 'vue'
import {
	getEvents,
	deleteEvent,
	editEvent,
	getEvent,
	createEvent as _createEvent
} from '../api/requests/events'
import { IState, IEventsService } from './types'
import { Event, IEventCreatePayload } from '@/types'

const state = reactive<IState>({
	events: null,
	event: null
})

const fetchEvents = async () => {
	const res = await getEvents()
	state.events = res
	return res
}

const deleteEventById = async (id: number) => {
	return await deleteEvent(id)
}

const editEventById = async (event: Event) => {
	return await editEvent(event)
}

const fetchEventById = async (id: number) => {
	return await getEvent(id)
}

const createEvent = async (event: IEventCreatePayload) => {
	return await _createEvent({
		...event,
		start_date: '2021-01-01',
		end_date: '2021-01-01'
	})
}

const EventsService: IEventsService = {
	state: readonly(state) as IState,
	fetchEvents,
	fetchEventById,
	editEventById,
	deleteEventById,
	createEvent
}

export { EventsService }
