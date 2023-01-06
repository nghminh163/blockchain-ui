import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import BlockIcon from "@mui/icons-material/ViewWeek";
import Mempoolicon from "@mui/icons-material/TableRows";
import MeIcon from "@mui/icons-material/AccountCircle";
import PeerIcon from "@mui/icons-material/LeakAdd";

const drawerWidth = 240;
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar> */}
        {/* <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography> */}
        {/* </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            {
              title: "Blocks",
              route: "/blocks",
              icon: <BlockIcon />,
            },
            {
              title: "Me",
              route: "/address/me",
              icon: <MeIcon />,
            },
            {
              title: "Mempool",
              route: "/mempool",
              icon: <Mempoolicon />,
            },
            {
              title: "Peers",
              route: "/peers",
              icon: <PeerIcon />,
            },
          ].map((text, index) => (
            <ListItem
              onClick={() => router.push(text.route || "")}
              key={index}
              disablePadding
              selected={router.route === text.route}
            >
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 2.5 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
