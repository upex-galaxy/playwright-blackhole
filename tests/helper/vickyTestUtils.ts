import type { Locator } from "@playwright/test";

export async function getRealValue (elements:Locator){
    const options = await elements.allInnerTexts()
    const fixedValues = options.map((item)=> item.split(':')[1])
    return fixedValues

}
