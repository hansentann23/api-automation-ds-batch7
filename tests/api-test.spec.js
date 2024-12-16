const {test, expect} = require("@playwright/test");
const { resolve } = require("path");
const {Ajv} = require("ajv");

const ajv = new Ajv()

test.describe('Positive Test Cases', () => {

    test('Test Case GET', async ({ request}) => {
        const response = await request.get('https://api.restful-api.dev/objects/7');
        
        expect(response.status()).toBe(200);

        const responseData = await response.json()
        expect (responseData.id).toBe("7")
        expect (responseData.name).toBe("Apple MacBook Pro 16")
        expect (responseData.data.year).toBe(2019)
        expect (responseData.data["CPU model"]).toBe("Intel Core i9")

        const valid = ajv.validate(require('./json-schema/get-object-schema.json'), responseData)

        if (!valid){
            console.error("AJV Validation Errors: ", ajv.errorsText());
        }

        expect(valid).toBe(true);
    });

    test('Test Case POST', async ({ request}) => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         }
        const header = {
            Accept: 'application/json'
        }

        const response = await request.post('https://api.restful-api.dev/objects', {
            headers:header,
            data:body
        });

        console.log(response.status());
        console.log(await response.json());
    });

});



