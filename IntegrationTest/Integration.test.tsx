// 1. THIS MUST COME FIRST
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(), // A fake function that does nothing
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

// tests/integration/user.test.ts
import { describe, it, expect } from 'vitest';
import { createLoan, State} from '../app/lib/loans2actions'; 
import postgres from 'postgres';
import { vi } from 'vitest';

// Mocking the entire module prevents it from trying to 
// import 'next/server' and crashing your test suite.
vi.mock('next-auth', () => ({
  default: vi.fn(() => ({
    auth: vi.fn(),
    handlers: { GET: vi.fn(), POST: vi.fn() },
    signIn: vi.fn(),
    signOut: vi.fn(),
  })),
}));

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require',
  connect_timeout: 10, // Seconds
  max: 1               // Keep connections low for tests
 }); // Your DB client instanceu

describe('User Integration', () => {
  it('should successfully persist a user in Postgres', async () => {

    const initialState: State = { message: null, errors: {} };

    const data = {
      staff_id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
      asset_id: "6706e458-32bc-494b-8855-6296787389c5",
      status: "Checked Out"
    };

    const formData = new FormData();
    formData.append('staff_id', data.staff_id);
    formData.append('asset_id', data.asset_id);
    formData.append('status', data.status);


    // 1. Call the actual function

    await createLoan(initialState, formData);

    // 3. Verify directly in the database
    const Loan = await sql`SELECT * FROM loans WHERE staff_id = ${data.staff_id}`;
    expect(Loan[0].staff_id).toBe('3958dc9e-742f-4377-85e9-fec4b6a6442a');


  }, 20000);
});