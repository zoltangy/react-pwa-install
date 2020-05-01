import React from "react";
import { Button, Box } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
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
          <>
            <Box>
              To install this app:
              <ul>
                <li>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Tap the share button:
                    <IOSShareIcon />
                  </span>
                </li>
                <li>then 'Add to Homescreen'</li>
              </ul>
            </Box>
            <Button onClick={props.onSubmit}>Ok</Button>
          </>
        )}
        {props.platform === platforms.FIREFOX && (
          <>
            <Box>
              To install this app:
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
            <Button onClick={props.onSubmit}>Ok</Button>
          </>
        )}
        {props.platform === platforms.OPERA && (
          <>
            <Box>
              To install this app:
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
            <Button onClick={props.onSubmit}>Ok</Button>
          </>
        )}
        {props.platform === platforms.OTHER && (
          <>
            <Box>Unfortunately the install feature is not supported by your browser.</Box>
            <Button onClick={props.onClose}>Ok</Button>
          </>
        )}
      </DialogActions>
    </>
  );
}
