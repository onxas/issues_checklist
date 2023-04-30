import React, {useCallback, useState} from "react";
import {ChecklistItemType} from "../typing/checklistItem.type";
import * as styles from "../client/styling/IssuesChecklist"
import ChecklistProgress from "../client/components/ChecklistProgress";
import NewItemForm from "../client/components/NewItemForm";
import ItemsList from "../client/components/ItemsList";
import Spinner from "@atlaskit/spinner";

interface Props {
    userId: string,
    issueId: string
}


const IssuesChecklist: React.FC<Props> = ({issueId, userId}: Props) => {

    const [items, setItems] = useState<ChecklistItemType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const updateItems = useCallback(() => {
        const token = document.querySelector("meta[name='token']")?.getAttribute("content")
        fetch(`/api/checklist/${userId}/${issueId}?jwt=${token}`)
            .then(res => res.json()).then(json => {
            setItems(json);
            setIsLoading(false)
        })
    }, [userId, issueId])

    const addItem = useCallback((title: string) => {
        const token = document.querySelector("meta[name='token']")?.getAttribute("content")
        const newItem: ChecklistItemType = {title: title, completed: false}
        return fetch(`api/checklist//${userId}/${issueId}?jwt=${token}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({items: [...items, newItem]})

        }).then((res) => {
                if (res.ok) {
                    setItems([...items, newItem])
                } else {
                    throw new Error()
                }
            }
        )
    }, [userId, issueId, items])


    const changeTodoStatus = useCallback((title: string) => {
        const token = document.querySelector("meta[name='token']")?.getAttribute("content")
        const newItems: ChecklistItemType[] = JSON.parse(JSON.stringify(items))
        const changedItem = newItems.find(t => t.title === title)
        if (changedItem) {
            changedItem.completed = !changedItem.completed
            return fetch(`api/checklist//${userId}/${issueId}?jwt=${token}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({items: newItems})

            }).then((res) => {
                    if (res.ok) {
                        setItems(newItems)
                    } else {
                        throw new Error()
                    }
                }
            )
        } else {
            return Promise.reject()
        }

    }, [userId, issueId, items])


    const deleteItem = useCallback((title: string) => {
        const token = document.querySelector("meta[name='token']")?.getAttribute("content")
        const itemIndex = items.findIndex(todo => todo.title === title)
        if (itemIndex != -1) {
            const newItems = JSON.parse(JSON.stringify(items))
            newItems.splice(itemIndex, 1)
            return fetch(`/api/checklist//${userId}/${issueId}?jwt=${token}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({items: newItems})

            }).then((res) => {
                    if (res.ok) {
                        setItems(newItems)
                    } else {
                        throw new Error()
                    }
                }
            )
        } else {
            return Promise.reject()
        }
    }, [userId, issueId, items])

    React.useEffect(() => {
        updateItems()
    }, [])

    return (
        <styles.Container>
            <styles.ProgressContainer>
                <ChecklistProgress items={items}/>
            </styles.ProgressContainer>
            <styles.NewTodoContainer>
                <NewItemForm onSubmit={addItem} existingItems={items}/>
            </styles.NewTodoContainer>
            <styles.ToDosListContainer>
                {
                    isLoading
                        ?
                        <styles.LoadingContainer>
                            <Spinner size='large'/>
                        </styles.LoadingContainer>
                        :
                        <ItemsList items={items} onStatusChange={changeTodoStatus} onDelete={deleteItem}/>
                }
            </styles.ToDosListContainer>
        </styles.Container>
    )
}

export default IssuesChecklist