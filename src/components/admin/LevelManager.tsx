import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LevelForm } from "./level/LevelForm";
import { LevelCard } from "./level/LevelCard";

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

  const handleSubmit = async (formData: FormData) => {
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
        const { error } = await supabase
          .from("levels")
          .insert([{ ...levelData, created_by: user?.id }]);

        if (error) throw error;
        toast({ title: "Success", description: "Level created successfully" });
      }

      setIsEditing(false);
      setEditingLevel(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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
        <LevelForm
          editingLevel={editingLevel}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsEditing(false);
            setEditingLevel(null);
          }}
        />
      )}

      <div className="grid gap-4">
        {levels?.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            onEdit={(level) => {
              setEditingLevel(level);
              setIsEditing(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};