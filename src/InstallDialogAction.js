import React from "react";
import { DialogActions, Typography, Button, Box } from "@material-ui/core";
import { platforms } from "./Platforms";
import { IOSShareIcon, FireFoxA2HSIcon, MenuIcon, OperaA2HSIcon } from "./Icons";

function DialogActionWithInstructions(props) {
  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Box>
        <Typography variant="subtitle1">{props.instructionTitle || "To install this app:"}</Typography>
        <ul>
          <li>
            <span style={{ display: "flex", alignItems: "center" }}>{props.action1}</span>
          </li>
          <li>{props.action2}</li>
        </ul>
      </Box>
      <Box width="100%" textAlign="right">
        <Button onClick={props.onSubmit}>{props.instructionActionOk || "Ok"}</Button>
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
            <Button onClick={props.onClose}>{props.instructionActionCancel || "Cancel"}</Button>
            <Button onClick={props.onSubmit} color="primary" variant="contained" disableElevation>
              {props.instructionActionInstall || "Install"}
            </Button>
          </>
        )}
        {props.platform === platforms.IDEVICE && (
          <DialogActionWithInstructions
            action1={
              <>
                {props.instructionIdeviceAction1 || "Tap the share button:"}
                <IOSShareIcon />
              </>
            }
            action2={props.instructionIdeviceAction2 || "then find and tap 'Add to Homescreen'"}
            onSubmit={props.onSubmit}
          />
        )}
        {props.platform === platforms.FIREFOX && (
          <DialogActionWithInstructions
            action1={
              <>
                {props.instructionFirefoxAction1 || "Tap this icon on the address bar:"}
                <FireFoxA2HSIcon />
              </>
            }
            action2={props.instructionFirefoxAction2 || "then tap '+Add to Homescreen'"}
            onSubmit={props.onSubmit}
          />
        )}
        {props.platform === platforms.FIREFOX_NEW && (
          <DialogActionWithInstructions
            action1={
              <>
                {props.instructionFirefoxNewAction1 || "Tap the menu button:"}
                <MenuIcon />
              </>
            }
            action2={props.instructionFirefoxNewAction2 || "then tap 'Install'"}
            onSubmit={props.onSubmit}
          />
        )}
        {props.platform === platforms.OPERA && (
          <DialogActionWithInstructions
            action1={
              <>
                {props.instructionOperaAction1 || "Tap the menu button:"}
                <MenuIcon />
              </>
            }
            action2={
              <>
                {props.instructionOperaAction2 || "then tap 'Home screen: '"}
                <OperaA2HSIcon />
              </>
            }
            onSubmit={props.onSubmit}
          />
        )}
        {props.platform === platforms.OTHER && (
          <Box width="100%" display="flex" flexDirection="column">
            <Box>{props.instructionNotSupported || "Unfortunately the install feature is not supported by your browser."}</Box>
            <Box width="100%" textAlign="right">
              <Button onClick={props.onClose}>{props.instructionActionOk || "Ok"}</Button>
            </Box>
          </Box>
        )}
      </DialogActions>
    </>
  );
}
