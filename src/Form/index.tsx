import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMainDispatch, useMainState } from "../context";
import { Item, Items } from "../types";
import { Input, InputLabel, Button, Box, MenuItem} from '@mui/material';

const Tree: React.FC = () => {


  const handleItemChange = (event: SelectChangeEvent) => {
    setItemValue(event.target.value as string);
  };

  const handleItemParentChange = (event: SelectChangeEvent) => {
    setItemParentValue(event.target.value as string);
  };

  // CONTEXT
  const mainState = useMainState();
  const dispatch = useMainDispatch();

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

  const items: Items = mainState.items;


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

  const itemZero = items[ 0 ];
  const [ itemValue, setItemValue ] = React.useState(itemZero && itemZero.id ? itemZero.id : "Select Value");
  const [itemParentValue, setItemParentValue] = React.useState(itemZero && itemZero.id ? itemZero.id : "Select Value");
  const [ inputValue, setInputValue ] = React.useState("");
  const itemsZero =[...items, { "id": 0, "name": "Item no. 0", "parentId": 0 }]
  return (
    <div>
      <Box display="flex" flexDirection="row" alignItems="stretch" padding={1}>
          <Select
            value={itemValue.toString()}
            placeholder="Select Parent"
            onChange={handleItemChange}
            sx={{ minWidth: 200 }}
            size="small"
          >
            {renderSelectItems(items)}
          </Select>
          <Button sx={{ minWidth: 100 }} variant="outlined" size="small">
            Edit
          </Button>
          <Button sx={{ minWidth: 100 }} variant="outlined" size="small">
            Delete
          </Button>
      </Box>
      <Box   padding={1} marginTop={"20px"} marginBottom={"20px"}>
        <Input id="my-input" aria-describedby="helper-text" value={inputValue} placeholder={'enter value'} />
        <InputLabel htmlFor="my-select">Select Parent</InputLabel>
        <Select
            id="my-select"
            value={itemParentValue.toString()}
            label="Select Item"
            onChange={handleItemParentChange}
            sx={{ minWidth: 200 }}
            size="small"
          >
            {renderSelectItems(itemsZero)}
          </Select>
          <Button sx={{ minWidth: 100 }} variant="outlined" size="small">
            Create Item
          </Button>
      </Box>
    </div>
  );
};

export default Tree;
