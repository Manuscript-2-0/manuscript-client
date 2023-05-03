import { IEvent, IEventResponse } from '@/types'

export default function (event: IEventResponse): IEvent {
	console.log(event.tags)
	return {
		...event,
		tags: event.tags[0].length ? event.tags[0].split(',') : []
	}
}
