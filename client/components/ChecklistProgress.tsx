import React, {useMemo} from "react";
import {ChecklistItemType} from "../../typing/checklistItem.type";
import * as styles from "../styling/ChecklistProgress"
import {SuccessProgressBar} from "@atlaskit/progress-bar";

interface Props {
    items: ChecklistItemType[]
}

const ChecklistProgress: React.FC<Props> = ({items}: Props) => {

    const completedItemsCount = useMemo<number>(
        () => items.filter(item => item.completed).length,
        [items]
    )


    return (
        <styles.Container>
            <SuccessProgressBar value={completedItemsCount / items.length}/>
            <styles.CounterContainer>
                {completedItemsCount}/{items.length}
            </styles.CounterContainer>
        </styles.Container>
    )
}

export default ChecklistProgress