import { story, precondition, test, expect } from '@TestBase'
import { Expect } from '@playwright/test'
import { FranciscoForm } from '@type/FranciscoTypes'; 
import data from '@data/franciscoUserDetails.json' assert {type:'json'};
import { assert } from 'console'
import { execPath } from 'process';


story('GX3-1067 | TestCase | Form', () => {
    precondition(async ({ page }) => {
        await page.goto('https://demoqa.com/text-box');
    })


    test('GX3-1067|TC1|Fill the form with json', async ({ page }) => {
        const IdFullname = page.locator('#userName');
        const IdEmail = page.locator('#userEmail');
        const IdCurrentAddress = page.locator('#currentAddress');
        const IdPermanentAddress = page.locator('#permanentAddress');
        let n = 0;
        await test.step('Fill the fullname', async () => {
            await IdFullname.fill(data[ n ].fullname);
        });
        
        await test.step('Fill the email', async () => {
            await IdEmail.fill(data[ n ].email);
        });
        
        await test.step('Fill the Current Address', async () => {
            await IdCurrentAddress.fill(data[ n ].CurrentAddress);
        });
        
        await test.step('Fill the Current Address', async () => {
            await IdPermanentAddress.fill(data[ n ].PermanetAddress);
        });

        //await test.step('click at the button', async () => {
            await page.locator('#submit').click();
        
        //});
 });
    test('GX3-1067|TC2|verify all the output', async ({ page }) => {
        await test.step('Verify the Output', async () => {
            let n = 0;
        const nameField = page.locator('#userName-wrapper input');
		const emailField = page.locator('#userEmail-wrapper input');
		const currAddressField = page.locator('#currentAddress-wrapper textarea');
		const permAddressField = page.locator('#permanentAddress-wrapper textarea');
   
            async function fillForm(datos: FranciscoForm) {
                await nameField.fill(datos.fullname);
                await emailField.fill(datos.email);
                await currAddressField.fill(datos.CurrentAddress);
                await permAddressField.fill(datos.PermanetAddress);
            }

        
            for (const oneUser of data) {
                fillForm(oneUser);
                await page.waitForTimeout(1000);
                await page.getByText('Submit', { exact: true }).click();
                const outputLines = await page.locator('#output p').allInnerTexts();
                const reducedOutput = outputLines.map((item) => item.split(':')[ 1 ]);
                const expectedOutput = [ oneUser.fullname, oneUser.email, oneUser.CurrentAddress, oneUser.PermanetAddress ];
                expect(reducedOutput).toEqual(expectedOutput);
                        }
        });
    });
   
    
});

