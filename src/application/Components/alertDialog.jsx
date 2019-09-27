import React from 'react';
import Button from '@material-ui/core/Button';
import {Done, HighlightOff} from '@material-ui/icons';
import { Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/';
import { vocabulary } from '../Strings';

class AlertDialog extends React.Component {


  innerClose = () => {
    this.props.onClose();
  };

  innerCancel = () => {
    this.props.cancel()
    this.innerClose()
  }

  innerConfirm = () => {
    if (this.props.operation == "delete")
      this.props.confirmeDelete()
    else
      this.props.confirmUpdate()
    this.innerClose()
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.innerClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{vocabulary.attention}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {vocabulary.alertMsg} {vocabulary[this.props.operation]} {vocabulary[this.props.objectType]}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" onClick={this.innerConfirm}
              color="primary">
              <Done />
              &nbsp;{vocabulary.confirmBtn}
            </Button>
            <Button  color="secondary" variant="contained" onClick={this.innerCancel}  style={{ color:'white', textTransform: 'none'}}>
              <HighlightOff />
              &nbsp;{vocabulary.cancel}
            </Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;