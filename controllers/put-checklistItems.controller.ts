import {NextFunction, Request, Response} from "express";
import {AddOn} from "atlassian-connect-express";
import {replaceItems} from "../dao/checklistItem.dao";

export function putChecklistItemsController(addon: AddOn) {
    return async function (
        request: Request<{ userId: string, issueId: string }, {}, { items: string }, {}>,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        const httpClient = addon.httpClient(request)
        replaceItems(httpClient, addon.key, request.params.userId, request.params.issueId, request.body.items)
            .then(code => response.status(code).send())
            .catch(code => response.status(code).send())
    }
}