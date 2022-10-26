import React from "react";
import { DialogActions, Typography, Button, Box } from "@mui/material";
import { platforms } from "./Platforms";
import { IOSShareIcon, FireFoxA2HSIcon, MenuIcon, OperaA2HSIcon } from "./Icons";

function DialogActionWithInstructions(props) {
  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Box>
        <Typography variant="subtitle1">To install this app:</Typography>
        <ul>
          <li>
            <span style={{ display: "flex", alignItems: "center" }}>{props.action1}</span>
          </li>
          <li>{props.action2}</li>
        </ul>
      </Box>
      <Box width="100%" textAlign="right">
        <Button onClick={props.onSubmit}>Ok</Button>
      </Box>
    </Box>
  );
}

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
          <DialogActionWithInstructions
            action1={
              <>
                Tap the share button:
                <IOSShareIcon />
              </>
            }
            action2="then find and tap 'Add to Homescreen'"
            onSubmit={props.onSubmit}
          />
        )}
        {props.platform === platforms.FIREFOX && (
          <DialogActionWithInstructions
            action1={
              <>
                Tap this icon on the address bar:
                <FireFoxA2HSIcon />
              </>
            }
            action2="then tap '+Add to Homescreen'"
            onSubmit={props.onSubmit}
          />
        )}
        {props.platform === platforms.FIREFOX_NEW && (
          <DialogActionWithInstructions
            action1={
              <>
                Tap the menu button:
                <MenuIcon />
              </>
            }
            action2="then tap 'Install'"
            onSubmit={props.onSubmit}
          />
        )}
        {props.platform === platforms.OPERA && (
          <DialogActionWithInstructions
            action1={
              <>
                Tap the menu button:
                <MenuIcon />
              </>
            }
            action2={
              <>
                then tap &nbsp;'
                <OperaA2HSIcon />
                Home screen'
              </>
            }
            onSubmit={props.onSubmit}
          />
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
