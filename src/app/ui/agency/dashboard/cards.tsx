import { AcademicCapIcon, DocumentIcon, DocumentTextIcon, PencilIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { lusitana } from "../../fonts";
import { fetchDashboardCardData } from "@/lib/data";

const iconMap = {
    users: UserGroupIcon,
    editors: PencilIcon,
    documents: DocumentTextIcon,
    // invoices: InboxIcon,
  };

  export default async function CardWrapper() {
    const [documentCount, editorCount, userCount] = await fetchDashboardCardData();
  
    return (
      <>
        {/* NOTE: Uncomment this code in Chapter 9 */}
  
        <Card title="Signed Up Users Count" value={userCount} type="users" />
        <Card title="Editorial Count" value={documentCount} type="documents" />
        <Card title="Editorial Team" value={editorCount} type="editors" />
        
      </>
    );
  }
  

export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'users' | 'editors' | 'documents';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }
  