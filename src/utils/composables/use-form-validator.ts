export default function useFormValidator() {
	const isPhoneValid = (phone: string) => {
		const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/g
		return phoneRegex.test(phone)
	}

	const isEmailValid = (email: string) => {
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
		return emailRegex.test(email)
	}

	const isPasswordValid = (password: string) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g
		return passwordRegex.test(password)
	}

	const isMatchingPasswords = (password: string, confirmPassword: string) => {
		return password === confirmPassword
	}

	const isLinkValid = (link: string) => {
		const linkRegex =
			/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/g
		return linkRegex.test(link)
	}

	const isDateValid = (date: string) => {
		const currentDate = new Date()
		const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/g
		const dateArray = dateRegex.exec(date)
		if (dateArray) {
			const year = parseInt(dateArray[1])
			const month = parseInt(dateArray[2])
			const day = parseInt(dateArray[3])
			if (
				year < currentDate.getFullYear() ||
				month < currentDate.getMonth() ||
				day < currentDate.getDate()
			) {
				return false
			}
		}
		return true
	}

	return {
		isPhoneValid,
		isEmailValid,
		isPasswordValid,
		isMatchingPasswords,
		isLinkValid,
		isDateValid
	}
}
