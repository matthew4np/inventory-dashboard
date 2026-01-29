import postgres from 'postgres';
import {
  LoansTable,
  LatestLoan,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestLoans() {
  try {
    const latestLoan = await sql<LatestLoan[]>`
      SELECT Loan.asset_id, Loan.asset_type, Loan.serial_number, Loan.staff_name, Loan.staff_dept,
      Loan.loan_status, Loan.status_date FROM Loan
      ORDER BY Loan.status_date DESC
      LIMIT 5`;

    return latestLoan;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest loan.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const loanCountPromise = sql`SELECT COUNT(*) FROM loan`;
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      loanCountPromise,
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfLoans = Number(data[0][0].count ?? '0');
    const numberOfInvoices = Number(data[1][0].count ?? '0');
    const numberOfCustomers = Number(data[2][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[3][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[3][0].pending ?? '0');

    return {
      numberOfLoans,
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredLoans(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const loans = await sql<LoansTable[]>`
      SELECT
        asset_id,
        asset_type,
        serial_number,
        staff_name,
        staff_dept,
        loan_status,
        status_date
      FROM loan
      WHERE
         asset_id ILIKE ${`%${query}%`} OR
         asset_type ILIKE ${`%${query}%`} OR
         serial_number ILIKE ${`%${query}%`} OR
         staff_name ILIKE ${`%${query}%`} OR
         staff_dept ILIKE ${`%${query}%`} OR
         loan_status ILIKE ${`%${query}%`}
      ORDER BY status_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return loans;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch loans.');
  }
}

      // WHERE
      //   asset_id ILIKE ${`%${query}%`} OR
      //   asset_type ILIKE ${`%${query}%`} OR
      //   serial_number ILIKE ${`%${query}%`} OR
      //   staff_name ILIKE ${`%${query}%`} OR
      //   staff_dept ILIKE ${`%${query}%`} OR
      //   loan_status ILIKE ${`%${query}%`} OR
      //   status_date ILIKE ${`%${query}%`}


export async function fetchLoansPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM loan
    WHERE
      loan.asset_id ILIKE ${`%${query}%`} OR
      loan.serial_number ILIKE ${`%${query}%`} OR
      loan.staff_name ILIKE ${`%${query}%`} OR
      loan.staff_dept ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of loans.');
  }
}

