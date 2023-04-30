import express, {Request, Response} from "express";
import {AddOn} from "atlassian-connect-express";


export default function views(app: express.Express, addon: AddOn) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/checklist', addon.authenticate(), (req: Request, res: Response) => {
        // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
        // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
        res.render(
            'IssuesChecklist.js',
            {
                userId: res.locals.userAccountId,
                issueId: req.query['issueId']
            }
        );
    });
}
