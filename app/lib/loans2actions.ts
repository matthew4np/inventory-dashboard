'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const LoanFormSchema = z.object({
  id: z.string(),
  staff_id: z.string({
    invalid_type_error: 'Please select a staff.',
  }),
  asset_id: z.string({
    invalid_type_error: 'Please select a asset.',
  }),
  status: z.string({
    invalid_type_error: 'Please select an status.',
  }),
  date: z.date()
});

const CreateLoan = LoanFormSchema.omit({ id: true, date: true });
const UpdateLoan = LoanFormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    staff_id?: string[];
    asset_id?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function updateLoan(id: string, formData: FormData) {
  const { staff_id, asset_id, status } = UpdateLoan.parse({
    staff_id: formData.get('staff_id'),
    asset_id: formData.get('asset_id'),
    status: formData.get('status'),
  });
 
try { 
    await sql`
      UPDATE loans
      SET staff_id = ${staff_id}, asset_id = ${asset_id}, status = ${status}
      WHERE id = ${id}
    `;
} catch (error) {
  console.error(error);

}
    revalidatePath('/dashboard/loans2');
    redirect('/dashboard/loans2');
};

export async function createLoan(prevState: State, formData: FormData) {

const validatedFields = CreateLoan.safeParse({
    staff_id: formData.get('staff_id'),
    asset_id: formData.get('asset_id'),
    status: formData.get('status'),
  });

if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Loan.',
    };
  };
console.log('2');
  const date = new Date().toISOString().split('T')[0];
  const { staff_id, asset_id, status } = validatedFields.data;

try {
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
} catch (error) {
  return {
    message: 'Database Error: Failed to Create Loan.'
  }
}
    revalidatePath('/dashboard/loans2');
    redirect('/dashboard/loans2');
}

export async function deleteLoan(id: string) {

  await sql`DELETE FROM loans WHERE id = ${id}`;
  revalidatePath('/dashboard/loans2');
}

