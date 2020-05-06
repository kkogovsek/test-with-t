import React from "react";

function RouteReducer(state, action) {
  switch (action) {
    default: {
      if (typeof action !== "string") {
        return state;
      }
      // Push action
      return;
    }
  }
}

export default function useRouter() {}
