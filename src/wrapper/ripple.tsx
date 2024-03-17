import { createComponent } from "@lit/react";

import { MdRipple as MdRippleWebComponent } from "@material/web/ripple/ripple.js";
import React from "react";

export const MdRipple = createComponent({
  tagName: "md-ripple",
  elementClass: MdRippleWebComponent,
  react: React,
});
