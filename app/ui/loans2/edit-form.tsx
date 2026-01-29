'use client';

import { LoanForm, StaffField, AssetField } from '@/app/lib/loansdefinitions';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

import { updateLoan } from '@/app/lib/loans2actions';



export default function EditLoanForm({ loan, staff, assets }: { loan: LoanForm; staff: StaffField[]; assets: AssetField[]  }) {

const updateLoanWithId = updateLoan.bind(null, loan.id);

  return (
    <form action={updateLoanWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Staff Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose staff
          </label>
          <div className="relative">
            <select
              id="staff_id"
              name="staff_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={loan.staff_id}
            >
              <option value="" disabled>
                Select a staff
              </option>
              {staff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

     <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Asset */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose asset
          </label>
          <div className="relative">
            <select
              id="asset_id"
              name="asset_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={loan.asset_id}
            >
              <option value="" disabled>
                Select an asset
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
                  defaultChecked={loan.status === 'Checked In'}
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
                  id="status"
                  name="status"
                  type="radio"
                  value="Checked Out"
                  defaultChecked={loan.status === 'Checked Out'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Checked Out"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Checked Out <CheckIcon className="h-4 w-4" />
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
        <Button type="submit">Edit Loan</Button>
      </div>
    </form>
  );
}
