import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMainState } from "../context";
import { Item, Items } from "../types";

const Tree: React.FC = () => {
  // CONTEXT
  const mainState = useMainState();
  const items: Items = mainState.items;

  const renderChildren = (children: Items, items: Items) => {
    if (children.length > 0) {
      return children.map((child) => {
        if (child) {
          return renderItem(child, items);
        }
        return null;
      });
    }
    return null;
  };

  const renderItem = (item: Item, items: Items) => {
    const children: Items = items.filter((i) => i && i.parentId === item.id);
    return (
      <TreeItem key={item.id} nodeId={item.id.toString()} label={item.name}>
        {renderChildren(children, items)}
      </TreeItem>
    );
  };

  const renderItems = (items: Items) => {
    if (items) {
      return items.map((item) => {
        if (item && item.parentId === 0) {
          return renderItem(item, items);
        } else {
          return null;
        }
      });
    }
    return null;
  };

  return (
    <TreeView
      aria-label="Tree viewer"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderItems(items)}
    </TreeView>
  );
};

export default Tree;
