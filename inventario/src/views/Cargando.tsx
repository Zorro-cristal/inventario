import { CircularProgress, Stack } from "@mui/material";

export default function Cargando() {
    return (<Stack
        direction="row"
        sx={{
            justifyContent: "space-around",
            alignItems: "center",
        }}
    >
        <CircularProgress size="3rem" />
    </Stack>);
}