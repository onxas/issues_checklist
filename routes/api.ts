import {getChecklistItemsController} from "../controllers/get-checklistItems.controller";
import express from "express";
import {AddOn} from "atlassian-connect-express";
import {putChecklistItemsController} from "../controllers/put-checklistItems.controller";


type MiddlewareParametersWrapper =
    (request: express.Request, response: express.Response, next: express.NextFunction) => void

export default function api(app: express.Express, addon: AddOn) {
    const apiRouter = express.Router()
    apiRouter.get("/:userId/:issueId",
        addon.checkValidToken() as MiddlewareParametersWrapper,
        getChecklistItemsController(addon))
    apiRouter.put("/:userId/:issueId",
        addon.checkValidToken() as MiddlewareParametersWrapper,
        putChecklistItemsController(addon))
    app.use("/api/checklist/", apiRouter)
}
