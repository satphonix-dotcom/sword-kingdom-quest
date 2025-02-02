import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export const EmptyState = () => {
  return (
    <TableRow>
      <TableCell 
        colSpan={4} 
        className="text-center py-4 text-muted-foreground"
      >
        No content found. Click "Create Content" to add some.
      </TableCell>
    </TableRow>
  );
};