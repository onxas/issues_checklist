# Issues Checklist Jira Cloud Addon

To run project please follow this steps:<br />


1. Enable development mode in your JIRA Cloud instance.

2. Configure ngrok auth token with `ngrok authtoken`. You can get a authtoken [on this page](https://dashboard.ngrok.com/get-started/your-authtoken)

3. Create `/credentinals.json` file using `/credentinals.json.sample` template

4. Install project\`s dependencies with `npm install`

5. Build project with `npm run build`

6. Start project with `npm start`

7. Open [ngrok agent](https://dashboard.ngrok.com/tunnels/agents) and go to your tunnel address

8. Click "Visit Site" button (without this step, the tunnel may not work)

9. Add an addon to your issue