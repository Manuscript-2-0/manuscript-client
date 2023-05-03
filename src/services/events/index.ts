import { reactive, readonly } from 'vue'
import {
	getEvents,
	deleteEvent,
	editEvent,
	getEvent,
	createEvent as _createEvent
} from '../api/requests/events'
import { IState, IEventsService } from './types'
import { IEvent, IEventCreatePayload } from '@/types'
import { UserService } from '../user'
import { AuthService } from '../auth'

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

const editEventById = async (event: IEvent, id: number) => {
	return await editEvent(
		{
			name: event.name,
			location: event.location,
			location_url: event.location_url,
			description: event.description,
			full_description: event.full_description,
			start_date: event.start_date,
			end_date: event.end_date,
			tags: event.tags.join(','),
			image: event.image
		},
		id
	)
}

const fetchEventById = async (id: number) => {
	const res = await getEvent(id)
	console.log(res)
	state.event = res
	return res
}

const createEvent = async (event: IEventCreatePayload) => {
	return await _createEvent(event)
}

const isOwner = async (eventId: number) => {
	if (!AuthService.isAuthorized()) return false

	if (UserService.state.profile) {
		return UserService.state.profile.id === eventId
	}

	const user = await UserService.fetchProfile()
	return user.id === eventId
}

const EventsService: IEventsService = {
	state: readonly(state) as IState,
	fetchEvents,
	fetchEventById,
	editEventById,
	deleteEventById,
	createEvent,
	isOwner
}

export { EventsService }
