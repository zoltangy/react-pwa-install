import React from "react";
import { Grid, Box, Typography, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import InstallDialogAction from "./InstallDialogAction";


const InstallDialog = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="dialog-title" fullScreen={fullScreen}>
      <DialogTitle id="dialog-title">{props.title || "Install Web App"}</DialogTitle>
      <DialogContent dividers={true}>
        <Grid container>
          {!!props.logo && (
            <Grid item xs={12} sm={6}>
              <Box mr={1}>
                <img src={props.logo} alt="logo" style={{ width: '100%' }} />
              </Box>
            </Grid>
          )}
          {!!props.features && (
            <Grid item>
              <Box>
                <Typography variant="subtitle1">{props.featuresTitle || "Key Features:"}</Typography>
                <Typography variant="body2" component="div">
                  {props.features}
                </Typography>
              </Box>
            </Grid>
          )}
          {!!props.description && (
            <Grid item xs={12}>
              <Typography variant="subtitle1">{props.descritpionTitle || "Description:"}</Typography>
              <Typography variant="body2" component="div">
                {props.description}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <InstallDialogAction platform={props.platform} onSubmit={props.onSubmit} onClose={props.onClose} />
    </Dialog>
  );
}

export default InstallDialog;