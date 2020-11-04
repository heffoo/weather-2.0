import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

import "./loader.scss";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export function Loader() {
  return (
    <div className="sweet-loading-show">
      <SyncLoader css={override} size={10} color={"#ffffff"} />
    </div>
  );
}
