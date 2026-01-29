'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const LoanFormSchema = z.object({
  id: z.string(),
  staff_id: z.string(),
  asset_id: z.string(),
  status: z.string(),
  date: z.date()
});

const UpdateLoan = LoanFormSchema.omit({ id: true, date: true });

export async function updateLoan(id: string, formData: FormData) {
  const { staff_id, asset_id, status } = UpdateLoan.parse({
    staff_id: formData.get('staff_id'),
    asset_id: formData.get('asset_id'),
    status: formData.get('status'),
  });
 
 
  await sql`
    UPDATE loans
    SET staff_id = ${staff_id}, asset_id = ${asset_id}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/loans2');
  redirect('/dashboard/loans2');
}

export async function createLoan(formData: FormData) {
  const {
    staff_id,
    asset_id,
    status,
  } = LoanFormSchema.parse({
    staff_id: formData.get('staff_id'),
    asset_id: formData.get('asset_id'),
    status: formData.get('status')
  });
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO loans (
      staff_id,
      asset_id,
      status,
      date
    )
    VALUES (
        ${staff_id},
        ${asset_id},
        ${status},
        ${date}
    )
  `;

    revalidatePath('/dashboard/loans2');
    redirect('/dashboard/loans2');
}

export async function deleteLoan(id: string) {
  await sql`DELETE FROM loans WHERE id = ${id}`;
  revalidatePath('/dashboard/loans2');
}
