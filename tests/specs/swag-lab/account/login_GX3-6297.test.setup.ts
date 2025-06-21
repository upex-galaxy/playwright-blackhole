import { story, test, precondition, expect } from '@pages/TestBase';
 const valid = {
	username: "standard_user",
 				}

 const validPassword = "secret_sauce"

story('GX3-6286: Swag Lab - Filter products of PLP ', async () => {

	precondition( async ({ swagLoginPage })=>{
		console.log('🎭️ ---- Starting Precondition');
		swagLoginPage.gotoPage();
	

	});

	test('TC1:Check user can log in when providing valid credentials', async ({ })=>{
		console.log('🎭️ ---- Starting TC1');
		
	
	});

	test('TC2:Check locked user ca not log into', async ({ })=>{
		console.log('🎭️ ---- Starting TC2');
		
	});

	test('TC3:Check user can not log in using incorrect or nonexistent username', async ({ })=>{
		console.log('🎭️ ---- Starting TC3');
	
		
	});

	test('TC4:Check user can not  log in using an incorrect or nonexistent password', async ({ })=>{
		console.log('🎭️ ---- Starting TC4');
		
	});

	test('TC5:Check user ca not log in using an incorrect or nonexistent username and password', async ({ })=>{
		console.log('🎭️ ---- Starting TC5');
		
	});

		test('TC6:Check user can not log in when leaving the username empty in the form', async ({ })=>{
		console.log('🎭️ ---- Starting TC6');
		
	});

		test('TC7:Check user can not log in when leaving the password empty in the form', async ({ })=>{
		console.log('🎭️ ---- Starting TC7');
		
	});

		test('TC8:Check user can not log in when leaving the username and password empty in the form', async ({ })=>{
		console.log('🎭️ ---- Starting TC8');
		
	});

		test('TC9:Check user can not access to any of the endpoints if user is not log in', async ({ })=>{
		console.log('🎭️ ---- Starting TC9');
		
	});
});