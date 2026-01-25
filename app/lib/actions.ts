'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const LoanFormSchema = z.object({
  asset_id: z.string(),
  asset_type: z.string(),
  serial_number: z.string(),
  staff_name: z.string(),
  staff_dept: z.string(),
  loan_status: z.string(),
  status_date: z.string(),
});
 
const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  console.log(formData);
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function createLoan(formData: FormData) {
  console.log(formData);
  const {
    asset_id,
    asset_type,
    serial_number,
    staff_name,
    staff_dept,
    loan_status,
    status_date
  } = LoanFormSchema.parse({
    asset_id: formData.get('asset_id'),
    asset_type: formData.get('asset_type'),
    serial_number: formData.get('serial_number'),
    staff_name: formData.get('staff_name'),
    staff_dept: formData.get('staff_dept'),
    loan_status: formData.get('loan_status'),
    status_date: formData.get('status_date'),
  });
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO loan (
      asset_id,
      asset_type,
      serial_number,
      staff_name,
      staff_dept,
      loan_status,
      status_date
    )
    VALUES (
        ${asset_id},
        ${asset_type},
        ${serial_number},
        ${staff_name},
        ${staff_dept},
        ${loan_status},
        ${status_date}
    )
  `;

    revalidatePath('/dashboard/loans');
    redirect('/dashboard/loans');
}
