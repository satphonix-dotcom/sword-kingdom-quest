import {
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

export const ContentListHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">Page</TableHead>
        <TableHead className="w-[200px]">Section</TableHead>
        <TableHead>Content Preview</TableHead>
        <TableHead className="w-[100px] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};