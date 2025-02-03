import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { LogOut, Mail, Globe, Trophy, Calendar, User, Ban } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const UserManagement = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profiles",
        variant: "destructive",
      });
      return;
    }

    setProfiles(data || []);
    setLoading(false);
  };

  const toggleAdminStatus = async (profileId: string, currentStatus: boolean | null) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: !currentStatus })
      .eq('id', profileId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Admin status updated successfully",
    });
    fetchProfiles();
  };

  const toggleAccessRestriction = async (profileId: string, currentStatus: boolean | null) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_restricted: !currentStatus })
      .eq('id', profileId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update access restriction",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `User access ${!currentStatus ? 'restricted' : 'restored'} successfully`,
    });
    fetchProfiles();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Details</TableHead>
            <TableHead>Personal Info</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Stats</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id} className={profile.is_restricted ? "opacity-60" : ""}>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">{profile.username || 'No username'}</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{profile.id}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={profile.is_admin ? "default" : "secondary"}>
                      {profile.is_admin ? 'Admin' : 'User'}
                    </Badge>
                    {profile.is_restricted && (
                      <Badge variant="destructive">Restricted</Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>
                    {profile.first_name || profile.last_name
                      ? `${profile.first_name || ''} ${profile.last_name || ''}`
                      : 'Not specified'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{profile.country || 'Not specified'}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>{profile.points} points</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Created: {formatDate(profile.created_at)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Updated: {formatDate(profile.updated_at)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={profile.is_admin ? "destructive" : "default"}
                    onClick={() => toggleAdminStatus(profile.id, profile.is_admin)}
                    className="w-full"
                  >
                    {profile.is_admin ? 'Remove Admin' : 'Make Admin'}
                  </Button>
                  <Button
                    variant={profile.is_restricted ? "outline" : "secondary"}
                    onClick={() => toggleAccessRestriction(profile.id, profile.is_restricted)}
                    className="w-full"
                  >
                    {profile.is_restricted ? (
                      <>
                        <LogOut className="h-4 w-4 mr-2" />
                        Restore Access
                      </>
                    ) : (
                      <>
                        <Ban className="h-4 w-4 mr-2" />
                        Restrict Access
                      </>
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};