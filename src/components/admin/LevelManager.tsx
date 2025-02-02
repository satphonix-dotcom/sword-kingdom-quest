import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const LevelManager = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingLevel, setEditingLevel] = useState<any>(null);

  const { data: levels, refetch } = useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .order("order_number");

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const levelData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      points: parseInt(formData.get("points") as string),
      order_number: parseInt(formData.get("order_number") as string),
      is_locked: formData.get("is_locked") === "on",
    };

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (editingLevel) {
        // Update existing level
        const { error } = await supabase
          .from("levels")
          .update({
            ...levelData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingLevel.id);

        if (error) throw error;
        toast({ title: "Success", description: "Level updated successfully" });
      } else {
        // Create new level
        const { error } = await supabase
          .from("levels")
          .insert([{ ...levelData, created_by: user?.id }]);

        if (error) throw error;
        toast({ title: "Success", description: "Level created successfully" });
      }

      setIsEditing(false);
      setEditingLevel(null);
      form.reset();
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (level: any) => {
    setEditingLevel(level);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("levels")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Level deleted successfully" });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Levels</h2>
        <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
          Add Level
        </Button>
      </div>

      {isEditing && (
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
                  defaultValue={editingLevel?.order_number || (levels?.length || 0) + 1}
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
                  onClick={() => {
                    setIsEditing(false);
                    setEditingLevel(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {levels?.map((level) => (
          <Card key={level.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Level {level.order_number}: {level.title}</h3>
                  <p className="text-sm text-gray-500">{level.description}</p>
                  <p className="text-sm text-gameGold">{level.points} points</p>
                  <p className="text-sm text-gray-500">
                    Status: {level.is_locked ? "🔒 Locked" : "🔓 Unlocked"}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(level)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(level.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};