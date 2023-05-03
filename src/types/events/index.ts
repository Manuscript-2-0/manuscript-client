export interface Author {
	user_id: number
	username: string
}

export interface Event {
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
}

export interface IEventCreatePayload {
	name: string
	image: File | null
	location: string
	location_url: string
	description: string
	full_description: string
	start_date: string
	end_date: string
	tags: string[]
}
