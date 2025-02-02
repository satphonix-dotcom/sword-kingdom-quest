import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ContentListActions } from "./ContentListActions";

interface ContentRowProps {
  content: any;
  onEdit: (content: any) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

export const ContentRow = ({ 
  content, 
  onEdit, 
  onDelete, 
  deletingId 
}: ContentRowProps) => {
  const formatContent = (content: any) => {
    try {
      if (typeof content === 'string') {
        return JSON.stringify(JSON.parse(content), null, 2);
      }
      return JSON.stringify(content, null, 2);
    } catch (e) {
      return String(content);
    }
  };

  const getPageTitle = (pageId: string) => {
    const titles: { [key: string]: string } = {
      home: "Home Page",
      about: "About Us",
      privacy: "Privacy Policy",
      faq: "FAQ",
      study_guide: "Study Guide",
      learn_more: "Learn More",
      support: "Support",
      levels: "Levels",
      quiz: "Quiz",
      leaderboard: "Leaderboard",
      profile: "Profile",
    };
    return titles[pageId] || pageId;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {getPageTitle(content.page_id)}
      </TableCell>
      <TableCell>{content.section_id}</TableCell>
      <TableCell className="max-w-[400px]">
        <div className="max-h-[100px] overflow-y-auto">
          <pre className="text-xs whitespace-pre-wrap">
            {formatContent(content.content)}
          </pre>
        </div>
      </TableCell>
      <TableCell>
        <ContentListActions
          onEdit={() => onEdit(content)}
          onDelete={() => onDelete(content.id)}
          isDeleting={deletingId === content.id}
        />
      </TableCell>
    </TableRow>
  );
};