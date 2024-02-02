/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
	export interface ProcessEnv {
		SPACE_LOGIN_USERNAME: string
		SPACE_LOGIN_PASSWORD: string
		TRELLO_API_TOKEN: string
		TRELLO_API_CI_TOKEN: string
		TRELLO_API_KEY: string
		TRELLO_API_CI_KEY: string
		TRELLO_ENV_QA_BASEURL: string
		TRELLO_ENV_CI_BASEURL: string
		QA_ORANGEHRM_USERNAME: string
		QA_ORANGEHRM_PASSWORD: string
		CI_ORANGEHRM_USERNAME: string
		CI_ORANGEHRM_PASSWORD: string
	}
}
