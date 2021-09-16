import React from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Hidden, ListItemIcon } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'right';

type TempDrawerProps = {
  open: boolean,
  setOpen: (isOpen: boolean) => void
}

export default function TempDrawer({ open, setOpen }: TempDrawerProps) {
  const classes = useStyles();
  //const [openDrawer,setOpenDrawer] = React.useState<boolean>(open);


  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    //setState({ ...state, [anchor]: open });
    //setOpenDrawer(open);
    setOpen(open);
  };

  const list = (anchor: Anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href="/" passHref>
          <ListItem button component="a">
            <ListItemText primary="Inventario" />
          </ListItem>
        </Link>

        <Link href="/product_entry" passHref>
          <ListItem button component="a">
            <ListItemText primary="Entradas" />
          </ListItem>
        </Link>
        <Link href="/product_output" passHref>
          <ListItem button component="a">
            <ListItemText primary="Salidas" />
          </ListItem>
        </Link>
        <Link href="/create_product" passHref>
          <ListItem button component="a">
            <ListItemText primary="Nuevo" />
          </ListItem>
        </Link>
        <Link href="/total" passHref>
          <ListItem >

            <ListItemIcon>
              <AddBoxIcon></AddBoxIcon>
            </ListItemIcon>
            <ListItemText primary="Totales" />

          </ListItem>
        </Link>

      </List>
      <Divider />

    </div>
  );

  return (
    <div>

      <React.Fragment key={"right"}>
        <Hidden lgUp>
          <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
            {list("right")}
          </Drawer>
        </Hidden>
      </React.Fragment>


    </div>
  );
}
