import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LevelFormProps {
  editingLevel?: any;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

export const LevelForm = ({ editingLevel, onSubmit, onCancel }: LevelFormProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingLevel ? "Edit Level" : "Create Level"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={editingLevel?.title}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              defaultValue={editingLevel?.description}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              name="points"
              type="number"
              defaultValue={editingLevel?.points || 0}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order_number">Order Number</Label>
            <Input
              id="order_number"
              name="order_number"
              type="number"
              defaultValue={editingLevel?.order_number}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_locked"
              name="is_locked"
              defaultChecked={editingLevel?.is_locked}
            />
            <Label htmlFor="is_locked">Locked</Label>
          </div>
          <div className="flex space-x-2">
            <Button type="submit">
              {editingLevel ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};