import {ChecklistItemType} from "../../typing/checklistItem.type";
import React from "react";
import * as styles from "../styling/ItemsList"
import ListItem from "./ListItem";

interface Props {
    items: ChecklistItemType[],

    onStatusChange(title: string): Promise<void>

    onDelete(title: string): Promise<void>
}


const ItemsList: React.FC<Props> = ({items, onStatusChange, onDelete}: Props) => {


    return (<styles.Container>
        {
            [...items]
                .sort((item1: ChecklistItemType, item2: ChecklistItemType) => Number(item1.completed) - Number(item2.completed))
                .map(item =>
                    <ListItem key={item.title} onStatusChange={onStatusChange} onDelete={onDelete} item={item}/>)
        }
    </styles.Container>)
}

export default ItemsList