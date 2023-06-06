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

	return {
		isPhoneValid,
		isEmailValid,
		isPasswordValid,
		isMatchingPasswords
	}
}
