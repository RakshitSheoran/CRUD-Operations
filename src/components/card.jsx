import * as React from "react";
import { Box, Card, CardCover, CardContent, Typography } from "@mui/joy";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
/* ...imports unchanged... */

export default function CardLayers3d({
  number,
  title,
  body,
  deletePostsData,
  handleUpdatePost,
  item,
}) {
  return (
    <div className="big-box">
      <Box
        sx={{
          perspective: "1000px",
          transition: "transform 0.4s",
          "& > div, & > div > div": { transition: "inherit" },
          "&:hover": {
            "& > div": {
              transform: "rotateY(20deg)",
              "& > div:nth-child(2)": {
                transform: "scaleY(0.9) translate3d(10px, 20px, 30px)",
              },
              "& > div:nth-child(3)": {
                transform: "translate3d(35px, 40px, 30px)",
              },
            },
          },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            minHeight: "280px",
            width: 320,
            backgroundColor: "#ffffffff",
            borderColor: "#000",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography level="h3" textColor="#000" sx={{ fontSize: "lg" }}>
            {number}
          </Typography>

          <CardCover
            sx={{
              background:
                "linear-gradient(to top, rgba(29, 9, 50, 0.8), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(63, 6, 125, 0.8), rgba(0,0,0,0) 300px)",
              border: "1px solid",
              borderColor: "#777",
              backdropFilter: "blur(1px)",
            }}
          />

          <CardContent
            className="cardContentBox"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "self-start",
              justifyContent: "flex-start",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.3))",
              border: "1px solid",
              borderColor: "#000",
              backdropFilter: "blur(1px)",
              opacity: 1,
              flexGrow: 1,
              boxSizing: "border-box", // important
              width: "100%",
            }}
          >
            {/* Title (fixed) */}
            <Typography
              level="h2"
              textColor="#fff"
              sx={{ fontSize: "lg", m: 2, mb: 1 }}
            >
              Title : {title}
            </Typography>

            {/* Scrollable content wrapper */}
            <Box
              component="div"
              sx={{
                width: "100%",
                boxSizing: "border-box", // ensures padding doesn't break layout
                px: 2,
                pb: 2,
                // tune this height to visually match screenshots
                maxHeight: "130px",
                overflowY: "auto",
                overflowX: "hidden", // prevent horizontal overflow
                wordBreak: "break-word", // break long words
                whiteSpace: "pre-wrap", // preserve line breaks but wrap
                // reserve room for a scrollbar without causing layout shift
                // (optional) you can toggle paddingRight to taste
                // paddingRight: "6px",

                // narrow webkit scrollbar styling (optional)
                "&::-webkit-scrollbar": {
                  width: "6px",
                  height: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(255,255,255,0.22)",
                  borderRadius: "4px",
                },

                // for Firefox: thin scrollbar
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.22) transparent",
              }}
            >
              <Typography
                level="h4"
                textColor="#fff"
                sx={{ fontSize: "lg", fontWeight: 400, m: 0 }}
              >
                Content : {body}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <div className="button-box">
        <Stack direction="row" spacing={4}>
          <Button
            id={number}
            className="buttons"
            variant="contained"
            size="medium"
            startIcon={<DeleteIcon />}
            onClick={() => deletePostsData(number)}
          >
            Delete
          </Button>
          <Button
            className="buttons"
            onClick={() => handleUpdatePost(item)}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Edit
          </Button>
        </Stack>
      </div>
    </div>
  );
}
