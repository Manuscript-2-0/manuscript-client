import { EMembershipStatus } from '@/services/teams/types'

export default function (status: EMembershipStatus): string {
	switch (status) {
		case EMembershipStatus.APPLIED_STATUS:
			return 'Вы подали заявку'
		case EMembershipStatus.DECLINED_STATUS:
			return 'Вам отказали'
		case EMembershipStatus.KICKED_STATUS:
			return 'Вы были исключены из команды'
		case EMembershipStatus.LEFT_STATUS:
			return 'Вы покинули команду'
		case EMembershipStatus.PENDING_STATUS:
			return 'Ожидание принятия заявки'
		default:
			return 'Pending'
	}
}
