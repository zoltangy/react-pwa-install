import React from "react";
import { DialogActions, Typography, Button, Box } from "@material-ui/core";
import { platforms } from "./Platforms";
import { IOSShareIcon, FireFoxA2HSIcon, OperaMenuIcon, OperaA2HSIcon } from "./Icons";

export default function InstallDialogAction(props) {
  return (
    <>
      <DialogActions>
        {props.platform === platforms.NATIVE && (
          <>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={props.onSubmit} color="primary" variant="contained" disableElevation>
              Install
            </Button>
          </>
        )}
        {props.platform === platforms.IDEVICE && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">To install this app:</Typography>
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Tap the share button:
                    <IOSShareIcon />
                  </span>
                </li>
                <li>then find and tap 'Add to Homescreen'</li>
              </ul>
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.FIREFOX && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">To install this app:</Typography>
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Tap this icon on the address bar:
                    <FireFoxA2HSIcon />
                  </span>
                </li>
                <li>then tap '+Add to Homescreen'</li>
              </ul>
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.OPERA && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>
              <Typography variant="subtitle1">To install this app:</Typography>
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Tap the menu button:
                    <OperaMenuIcon />
                  </span>
                </li>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    then tap &nbsp;'
                    <OperaA2HSIcon />
                    Home screen'
                  </span>
                </li>
              </ul>
            </Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onSubmit}>Ok</Button>
            </Box>
          </Box>
        )}
        {props.platform === platforms.OTHER && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>Unfortunately the install feature is not supported by your browser.</Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onClose}>Ok</Button>
            </Box>
          </Box>
        )}
      </DialogActions>
    </>
  );
}
