import React from "react";
import { createComponent } from "@lit/react";
import { MdFilledButton as MdFilledButtonWebComponent } from "@material/web/button/filled-button.js";

export const MdFilledButton = createComponent({
  tagName: "md-filled-button",
  elementClass: MdFilledButtonWebComponent,
  react: React,
});
