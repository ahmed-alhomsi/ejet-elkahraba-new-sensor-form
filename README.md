## Instalation

- `npm i`
- `npm start`

## using the form

1. A MAC address should be provided in the URL which is the MAC of the sensor of the client the technician is registering, example: http://localhost:3000/?mac=AA:BB:CC:DD:AA:BB
2. Then all client information is provided (the phone numbers are up to 3, use + to add and - to delete).
   - The location is automatically acquired when the "الحصول على الموقع" button is clicked (if you're in Syria please note that it's banned, this form was made for Lebanon, in case you wanted to test it please use a VPN).
3. Check all inputted information, the last page allows you to edit if you click on the pen icon then change the client information.
4. Once everything is good and ready, click the send button, clicking the button will prompt a window asking for the PIN of the electrician (please note that this is a version that isn't connected to a backend, although it was test with a backend and is fully functional)
5. To check that the JSON object was created and sent correctly, please open the console in the developer tools (CTRL + Shift + I / right click => then inspect => go to console) and then you can see that clearly all the information is being recorded and sent to the backend correctly.
