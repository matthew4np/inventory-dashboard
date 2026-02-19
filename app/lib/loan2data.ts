import postgres from 'postgres';
import {
  StaffField,
  AssetField,
  StaffTableType,
  LoansTable,
  LoanForm,
  LatestLoan,
  Revenue,
} from './loansdefinitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

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
    const loan = await sql<LatestLoan[]>`
      SELECT staff.id, staff.name, assets.model, loans.status
      FROM loans
      INNER JOIN staff ON loans.staff_id = staff.id
      INNER JOIN assets ON loans.asset_id = assets.id
      ORDER BY loans.date DESC
      LIMIT 5`;

    return loan;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest loans.');
  }
}

export async function fetchLoanData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const loanCountPromise = sql`SELECT COUNT(*) FROM loans`;
    const staffCountPromise = sql`SELECT COUNT(*) FROM staff`;
    const availableAssetCountPromise = sql`SELECT COUNT(*) FROM assets
                                            WHERE id NOT IN (
                                            SELECT asset_id from loans
                                            WHERE loans.status = 'Checked Out'
                                            )`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    const data = await Promise.all([
      loanCountPromise,
      staffCountPromise,
      availableAssetCountPromise,
      // invoiceStatusPromise,
    ]);

    const numberOfLoan = Number(data[0][0].count ?? '0');
    const numberOfStaff = Number(data[1][0].count ?? '0');
    const numberOfAvailableAsset = Number(data[2][0].count ?? '0');
    // const totalPaidInvoices = formatCurrency(data[3][0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[3][0].pending ?? '0');

    return {
      numberOfLoan,
      numberOfStaff,
      numberOfAvailableAsset,
      // totalPaidInvoices,
      // totalPendingInvoices,
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
        loans.id,
        loans.date,
        loans.status,
        assets.model,
        staff.name,
        staff.dept
      FROM loans
      INNER JOIN assets ON loans.asset_id = assets.id
      INNER JOIN staff ON loans.staff_id = staff.id
      WHERE
        staff.name ILIKE ${`%${query}%`} OR
        staff.dept ILIKE ${`%${query}%`} OR
        assets.model ILIKE ${`%${query}%`} OR
        loans.date::text ILIKE ${`%${query}%`} OR
        loans.status ILIKE ${`%${query}%`}
      ORDER BY loans.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return loans;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch loans.');
  }
}

export async function fetchLoansPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM loans
    JOIN staff ON loans.staff_id = staff.id
    WHERE
      staff.name ILIKE ${`%${query}%`} OR
      staff.email ILIKE ${`%${query}%`} OR
      loans.date::text ILIKE ${`%${query}%`} OR
      loans.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of loans.');
  }
}

export async function fetchLoanById(id: string) {
  try {
    const loan = await sql<LoanForm[]>`
      SELECT
        id,
        staff_id,
        asset_id,
        status,
        date
      FROM loans
      WHERE loans.id = ${id}
    `;

    return loan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch loans.');
  }
}

export async function fetchStaff() {
  try {
    const staff = await sql<StaffField[]>`
      SELECT
        id,
        name,
        dept,
        email
      FROM staff
      ORDER BY name ASC
    `;

    return staff;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all staff.');
  }
}

export async function fetchAssets() {
  try {
    const assets = await sql<AssetField[]>`
      SELECT * FROM assets
        WHERE id NOT IN (
        SELECT asset_id from loans
        WHERE loans.status = 'Checked Out'
        )
    `;

    return assets;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all assets.');
  }
}

export async function fetchFilteredStaff(query: string) {
  try {
    const data = await sql<StaffTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

