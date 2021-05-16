import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    PropTypes
} from "@material-ui/core";
type Color = PropTypes.Color;

export interface ConfirmationChoice {
    color: Color
    text: string
}

interface Props {
    title: string
    body: string
    open: boolean
    choices: ConfirmationChoice[]
    handleClose: (choiceIdx: number) => void
}

export const ConfirmationDialog = (props: Props) => {
    return (<Dialog
        open={props.open}
        onClose={() => props.handleClose(-1)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
    >
        <DialogTitle id="dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="dialog-description">
                {props.body}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {props.choices.map((choice, idx) =>
                <Button key={idx} onClick={() => props.handleClose(idx)} color={choice.color}>
                    {choice.text}
                </Button>
            )}
        </DialogActions>
    </Dialog>);
}