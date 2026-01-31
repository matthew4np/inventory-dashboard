'use client';

import { StaffField, AssetField } from '@/app/lib/loansdefinitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createLoan, State } from '@/app/lib/loans2actions';
import { useActionState } from 'react';

export default function Form({ staff, assets }: { staff: StaffField[]; assets: AssetField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createLoan, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Staff Name */}
        <div className="mb-4">
          <label htmlFor="staff" className="mb-2 block text-sm font-medium">
            Choose Staff Name
          </label>
          <div className="relative">
            <select
              id="staff_id"
              name="staff_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="staff-error"
            >
              <option value="" disabled>
                Select staff
              </option>
              {staff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
         {state.errors?.staff_id &&
          state.errors.staff_id.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

        </div>

        {/* Asset */}
        <div className="mb-4">
          <label htmlFor="asset" className="mb-2 block text-sm font-medium">
            Choose Asset
          </label>
          <div className="relative">
            <select
              id="asset_id"
              name="asset_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select asset
              </option>
              {assets.map((assets) => (
                <option key={assets.id} value={assets.id}>
                  {assets.model}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Loan Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the loan status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="status"
                  name="status"
                  type="radio"
                  value="Checked In"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Checked In"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Checked In <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Checked Out"
                  name="status"
                  type="radio"
                  value="Checked Out"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Checked Out"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Checked out <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/loans2"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Loan</Button>
      </div>
    </form>
  );
}

