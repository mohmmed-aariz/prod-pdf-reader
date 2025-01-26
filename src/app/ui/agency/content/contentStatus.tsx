import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ContentStatus({ status }: { status: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === true,
          'bg-green-500 text-white': status === false,
        },
      )}
    >
      {status === true ? (
        <>
          Hidden
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === false ? (
        <>
          Visible
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
