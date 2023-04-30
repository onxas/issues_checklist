import React, {useCallback, useEffect, useState} from "react";
import {ChecklistItemType} from "../../typing/checklistItem.type";
import * as styles from "../styling/ListItem";
import Checkbox from "@atlaskit/checkbox";
import Spinner from "@atlaskit/spinner";
import ErrorIcon from '@atlaskit/icon/glyph/error'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import {token} from '@atlaskit/tokens';
import {R400} from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip'
import {ExitingPersistence, FadeIn} from '@atlaskit/motion'


interface Props {
    item: ChecklistItemType,

    onStatusChange(title: string): Promise<void>

    onDelete(title: string): Promise<void>
}

const ListItem: React.FC<Props> = ({item, onStatusChange, onDelete}) => {
    const [isRequestProcessing, setIsRequestProcessing] = useState(false)
    const [isRequestError, setIsRequestError] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (isRequestError) {
            const renderTimeout = setTimeout(() => setIsRequestError(false), 5000)
            return () => {
                clearTimeout(renderTimeout)
            }
        }
    }, [isRequestError])

    const handleStatusChange = useCallback(async () => {
        setIsRequestError(false)
        setIsRequestProcessing(true)
        try {
            await onStatusChange(item.title)
        } catch (e) {
            setIsRequestError(true)
        } finally {
            setIsRequestProcessing(false)
        }

    }, [onStatusChange, item.title])


    const handleDelete = useCallback(async () => {
        setIsRequestError(false)
        setIsRequestProcessing(true)
        try {
            await onDelete(item.title)
        } catch (e) {
            setIsRequestError(true)
        } finally {
            setIsRequestProcessing(false)
        }
    }, [onDelete, item.title])

    return (
        <styles.Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <Checkbox isChecked={item.completed}
                      onChange={handleStatusChange}/>
            <styles.Title checked={item.completed}>
                {item.title}
            </styles.Title>
            <styles.StatusAndActionsContainer>
                <ExitingPersistence appear exitThenEnter>
                    {isRequestError && (
                        <FadeIn key="error" entranceDirection='right' duration={1000}>
                            {(props) => (
                                <div{...props}>
                                    <Tooltip content="An error has occurred. Please try again or refresh the page">
                                        {(tooltipProps) => (
                                            <div {...tooltipProps}>
                                                <ErrorIcon label="" size='small'
                                                           primaryColor={token('color.icon.brand', R400)}/>
                                            </div>
                                        )}
                                    </Tooltip>
                                </div>
                            )}
                        </FadeIn>
                    )}
                    {isRequestProcessing &&
                        <FadeIn key="processing" entranceDirection='right' duration={1000}>
                            {(props) => (
                                <div {...props}>
                                    <Spinner size='small'/>
                                </div>
                            )}
                        </FadeIn>
                    }
                </ExitingPersistence>
                {isHovered && <styles.DeleteButtonContainer onClick={handleDelete}>
                    <EditorRemoveIcon label="" size='small'/>
                </styles.DeleteButtonContainer>}
            </styles.StatusAndActionsContainer>
        </styles.Container>)
}

export default ListItem