import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Stack } from "native-base";
import AppBar from "../shiksha-os/AppBar";

export default function Layout({
  isDisabledAppBar,
  subHeader,
  children,
  imageUrl,
  _appBar,
  _header,
  _subHeader,
  _footer,
}) {
  return (
    <>
      <Stack
        width={"100%"}
        style={{
          backgroundImage: imageUrl
            ? "url(" + imageUrl + ")"
            : "url(" + window.location.origin + "/headerBg.png)",
          backgroundColor: "transparent",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        space={5}
      >
        {!isDisabledAppBar ? (
          <AppBar color={imageUrl ? "white" : ""} {..._appBar} />
        ) : (
          <></>
        )}
        {_header ? <Header {..._header} /> : <></>}
      </Stack>
      {subHeader ? (
        <Box
          {...{
            p: 4,
            position: "relative",
            bg: "purple.400",
            roundedTop: "20",
            _text: { textTransform: "inherit" },
          }}
          {..._subHeader}
        >
          {subHeader}
        </Box>
      ) : (
        <></>
      )}
      {children}
      <Footer {..._footer} />
    </>
  );
}
