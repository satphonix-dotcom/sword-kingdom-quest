import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContentListActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ContentListActions = ({ onEdit, onDelete }: ContentListActionsProps) => {
  return (
    <div className="flex justify-end items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit content</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              this content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};