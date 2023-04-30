import {NextFunction, Request, Response} from "express";
import {AddOn} from "atlassian-connect-express";
import {getItems} from "../dao/checklistItem.dao";

export function getChecklistItemsController(addon: AddOn) {
    return async function (
        request: Request<{ userId: string, issueId: string }, {}, {}, {}>,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        const httpClient = addon.httpClient(request)
        const todos = await getItems(httpClient, addon.key, request.params.userId, request.params.issueId)
        response.send(todos)
    }
}