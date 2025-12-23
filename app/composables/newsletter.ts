
export type SubscribeResponse = {
    success: boolean
    reason: {
        message: string
        emailValid: boolean
        apiError: boolean
    }
}
export async function subscribe(email: string, subscribeForm: HTMLFormElement | null): Promise<SubscribeResponse> {
    const config = useAppConfig()
    const formAction = config.newsletter?.form_action
    const provider = config.newsletter?.provider

    if (!subscribeForm) {
        return {
            success: false,
            reason: {
                message: 'Form not found',
                emailValid: false,
                apiError: false
            }
        }
    }
    if (!subscribeForm.reportValidity()) {
        return {
            success: false,
            reason: {
                message: 'Invalid email',
                emailValid: false,
                apiError: false
            }
        }
    }

    if (provider === 'demo') {
        return {
            success: true,
            reason: {
                message: 'Demo success',
                emailValid: true,
                apiError: false
            }
        }
    }
    else if (provider === 'blogtally' || provider === 'rssfeedpulse'|| provider === 'hakanai') {
        try {
            const response = await fetch(`${formAction}?email=${email}`, {
                method: 'POST',
            })
            if (response.ok) {
                return {
                    success: true,
                    reason: {
                        message: 'Success',
                        emailValid: true,
                        apiError: false
                    }
                }
            } else {
                return {
                    success: false,
                    reason: {
                        message: 'API error',
                        emailValid: true,
                        apiError: true
                    }
                }
            }
        } catch (e) {
            return {
                success: false,
                reason: {
                    message: 'API error (catch)' + e,
                    emailValid: true,
                    apiError: true
                }
            }
        }
    }
    else {
        // mailerlite is the default choice for the moment
        const formData = new FormData()
        formData.append('fields[email]', email)
        formData.append('ml-submit', '1')
        formData.append('anticsrf', 'true')
        const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
        })

        if (response.ok) {
            return {
                success: true,
                reason: {
                    message: 'Success',
                    emailValid: true,
                    apiError: false
                }
            }
        } else {
            return {
                success: false,
                reason: {
                    message: 'API error',
                    emailValid: true,
                    apiError: true
                }
            }
        }
    }

}
