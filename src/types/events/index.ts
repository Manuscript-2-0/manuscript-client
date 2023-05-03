export interface Author {
	user_id: number
	username: string
	email: string
	first_name: string
	last_name: string
}

export interface IEvent {
	id: number
	name: string
	location: string
	location_url: string
	description: string
	full_description: string
	start_date: string
	end_date: string
	tags: string[]
	author: Author
	image: string
}

export interface IEventResponse {
	id: number
	name: string
	location: string
	location_url: string
	description: string
	full_description: string
	start_date: string
	end_date: string
	tags: string
	author: Author
	image: string
}

export interface IEventCreatePayload {
	name: string
	location: string
	location_url: string
	description: string
	full_description: string
	start_date: string
	end_date: string
	tags: string
	image: string
}
