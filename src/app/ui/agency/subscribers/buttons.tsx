import { deleteSubscriber } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Role } from "@prisma/client";

export function DeleteSubscriberButton({ id, role }: { id: string, role: Role }) {
    const deleteSubscriberWithId = deleteSubscriber.bind(null, id);  
    const isDisabled = role === Role.ADMIN;

    return (
      <form action={deleteSubscriberWithId}>
        <button
          type="submit"
          className={`rounded-md border p-2 hover:bg-gray-100 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDisabled}
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>
    )
}