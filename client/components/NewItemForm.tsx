import React, {useCallback, useState} from "react";
import Form, {ErrorMessage, Field, FormApi} from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import Spinner from '@atlaskit/spinner';
import {ChecklistItemType} from "../../typing/checklistItem.type";

interface Props {
    existingItems: ChecklistItemType[],

    onSubmit(newIssueName: string): Promise<void>
}

interface FormData {
    title: string
}

const validation = (value: string | undefined) => {
    return !value || value.trim() ? undefined : "The title of the item cannot be empty!"
}

const NewItemForm: React.FC<Props> = (props: Props) => {

    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = useCallback(async (values: FormData, form: FormApi<FormData>) => {
        const value = values.title.trim()
        if (props.existingItems.find(t => t.title === value)) {
            return {'title': 'An item with this title already exists in the list!'}
        } else {
            setIsProcessing(true)
            try {
                await props.onSubmit(value)
                form.reset({title: ""})
            } catch (e) {
                return {'title': 'An error has occurred. Please try again or refresh the page'}
            } finally {
                setIsProcessing(false)
            }
        }
    }, [props.existingItems, props.onSubmit])

    return (
        <Form onSubmit={handleSubmit}>
            {({formProps}) => (
                <form {...formProps}>
                    <Field
                        isRequired
                        name="title"
                        validate={validation}
                    >
                        {({fieldProps, error, valid}) => (
                            <>
                                <Textfield {...fieldProps}
                                           placeholder="Add a new item"
                                           isDisabled={isProcessing}
                                           elemAfterInput={isProcessing && <Spinner size="small"/>}
                                />
                                {valid && error && (
                                    <ErrorMessage>
                                        {error}
                                    </ErrorMessage>
                                )}
                                {!valid && error && (
                                    <ErrorMessage>
                                        {error}
                                    </ErrorMessage>
                                )}
                            </>
                        )}
                    </Field>
                </form>
            )}
        </Form>
    )

}

export default NewItemForm
