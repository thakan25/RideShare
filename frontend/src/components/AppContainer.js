import React, { useState } from "react";
import BookRideForm from "./BookRideForm";
import SignIn from "./SignIn";
import Map from "./Map";
import OngoingRide from "./OngoingRide";
import Payment from "./Payment";
import Grid from "@mui/material/Grid";

const step = 3;

const AppContainer = () => {
  function getPanelContent(step) {
    switch (step) {
      case 0:
        return (
          <BookRideForm
            onPickupLocation={onPickupLocation}
            onDropLocation={onDropLocation}
            onDirectionsResponse={onDirectionsResponse}
          />
        );
      case 1:
        return <OngoingRide RideState={1} />;
      case 2:
        return <OngoingRide RideState={2} />;
      case 3:
        return <Payment />;
      default:
        throw new Error("Unknown step");
    }
  }
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  function onPickupLocation(location) {
    setPickup(location);
  }
  function onDropLocation(location) {
    setDrop(location);
  }
  function onDirectionsResponse(directionsResponse) {
    console.log(directionsResponse);
    setDirectionsResponse(directionsResponse);
  }
  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        padding={2}
        style={{ display: "flex", height: "100vh" }}
      >
        <Grid item xs={6}>
          <Map
            pickup={pickup}
            drop={drop}
            directionsResponse={directionsResponse}
          />
        </Grid>
        <Grid item xs={12} md={6} minWidth={400}>
          {getPanelContent(step)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AppContainer;