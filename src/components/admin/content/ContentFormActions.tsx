import { Button } from "@/components/ui/button";

interface ContentFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isEditing: boolean;
}

export const ContentFormActions = ({ 
  isSubmitting, 
  onCancel, 
  isEditing 
}: ContentFormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
      </Button>
    </div>
  );
};