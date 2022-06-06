import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMainDispatch, useMainState } from "../context";
import { Item, Items } from "../types";
import {
  TextField,
  InputLabel,
  Button,
  Box,
  MenuItem,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Tree: React.FC = () => {
  // Context
  const mainState = useMainState();
  const dispatch = useMainDispatch();

  // Items
  const items: Items = mainState.items;

  // Handlers
  const handleItemIdChange = (event: SelectChangeEvent) => {
    setItemId(parseInt(event.target.value));
  };

  const handleEditName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(event.target.value);
  };

  const handleNewItemParentChange = (event: SelectChangeEvent) => {
    setNewItemParentId(parseInt(event.target.value));
  };

  const handleNewItemNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewItemName(event.target.value);
  };

  const handleEditItemParent = (event: SelectChangeEvent) => {
    setSelectedParentId(parseInt(event.target.value));
  };

  const handleEditButton = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSave = () => {
    editItem({
      id: selectedId as number,
      name: selectedName as string,
      parentId: selectedParentId as number,
    });
    setOpenDialog(false);
  };

  const handleDeleteButton = () => {
    deleteItem(selectedId as number);
    const itemZero = items[0];
    if (itemZero) {
      setItemId(itemZero.id);
    }
  };

  const handleCreateButton = () => {
    addItem({
      id: 0,
      name: newItemName as string,
      parentId: newItemParentId as number,
    });
  };

  // Context dispatchers
  const addItem = (item: Item) => {
    dispatch({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const editItem = (item: Item) => {
    dispatch({
      type: "EDIT_ITEM",
      item: item,
    });
  };

  const deleteItem = (id: number) => {
    dispatch({
      type: "DELETE_ITEM",
      id: id,
    });
  };

  const renderSelectItems = (items: Items) => {
    if (items.length > 0) {
      return items.map((item) => {
        if (item) {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          );
        }
        return null;
      });
    }
    return null;
  };

  const itemZero = items[0];
  const [itemId, setItemId] = React.useState<number>(
    itemZero && itemZero.id ? itemZero.id : 0
  );
  const [newItemParentId, setNewItemParentId] = React.useState<number>(
    itemZero && itemZero.id ? itemZero.id : 0
  );
  const [newItemName, setNewItemName] = React.useState<string>("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | string>();
  const [selectedName, setSelectedName] = React.useState<string>();
  const [selectedParentId, setSelectedParentId] = React.useState<number>(
    itemZero && itemZero.id ? itemZero.id : 0
  );

  React.useEffect(() => {
    const item = items.find((i) => i && i.id === itemId);
    if (item) {
      setSelectedId(item.id);
      setSelectedName(item.name);
      setSelectedParentId(item.parentId);
    }
  }, [itemId, items]);

  const itemsZero = [{ id: 0, name: "Zero Level", parentId: 0 }, ...items];

  return (
    <div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{`Edit Item no. ${selectedId}`}</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            id="0b4asdf"
            label="id"
            size={"small"}
            value={selectedId}
            sx={{ maxWidth: 50 }}
          />
          <TextField
            id="name"
            label="name"
            size={"small"}
            value={selectedName}
            onChange={handleEditName}
          />
          <FormControl>
            <InputLabel htmlFor="0b42xcf">Select Parent</InputLabel>
            <Select
              id="0b42xcf"
              value={selectedParentId.toString()}
              label="Select Parent"
              onChange={handleEditItemParent}
              size="small"
            >
              {renderSelectItems(itemsZero)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="stretch"
        padding={1}
        marginTop={"30px"}
      >
        <Select
          value={itemId.toString()}
          placeholder="Select Parent"
          onChange={handleItemIdChange}
          sx={{ minWidth: 200 }}
          size="small"
        >
          {renderSelectItems(items)}
        </Select>
        <Button
          sx={{ minWidth: 100 }}
          variant="outlined"
          size="small"
          onClick={handleEditButton}
        >
          Edit
        </Button>
        <Button
          sx={{ minWidth: 100 }}
          variant="outlined"
          size="small"
          onClick={handleDeleteButton}
        >
          Delete
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="stretch"
        padding={1}
        marginTop={"20px"}
        marginBottom={"20px"}
      >
        <FormControl>
          <TextField
            required
            id="0a43bdx"
            label="Name"
            value={newItemName}
            placeholder="Enter Name"
            size={"small"}
            onChange={handleNewItemNameChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="0b42xcf">Select Parent</InputLabel>
          <Select
            id="0b42xcf"
            value={newItemParentId.toString()}
            label="Select Item"
            onChange={handleNewItemParentChange}
            sx={{ minWidth: 200 }}
            size="small"
          >
            {renderSelectItems(itemsZero)}
          </Select>
        </FormControl>
        <Button
          sx={{ minWidth: 100, height: 40 }}
          variant="outlined"
          size="small"
          onClick={handleCreateButton}
        >
          Create Item
        </Button>
      </Box>
    </div>
  );
};

export default Tree;
