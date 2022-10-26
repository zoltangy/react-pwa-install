import React from "react";
import { Box, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import InstallDialogAction from "./InstallDialogAction";

export default function InstallDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{props.title || "Install Web App"}</DialogTitle>
      <DialogContent dividers={true}>
        <Box display="flex" alignItems="flex-start">
          {!!props.logo && (
            <Box mr={1}>
              <img src={props.logo} alt="logo" />
            </Box>
          )}
          {!!props.features && (
            <Box>
              <Typography variant="subtitle1">Key Features:</Typography>
              <Typography variant="body2" component="div">
                {props.features}
              </Typography>
            </Box>
          )}
        </Box>
        {!!props.description && (
          <>
            <Typography variant="subtitle1">Description:</Typography>
            <Typography variant="body2" component="div">
              {props.description}
            </Typography>
          </>
        )}
      </DialogContent>
      <InstallDialogAction platform={props.platform} onSubmit={props.onSubmit} onClose={props.onClose} />
    </Dialog>
  );
}
