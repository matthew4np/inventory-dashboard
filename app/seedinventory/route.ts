
import postgres from 'postgres';
import { staff, assets, loans} from '../lib/placeholder-loan-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedLoans() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS loans (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      staff_id UUID NOT NULL,
      asset_id UUID NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedLoans = await Promise.all(
    loans.map(
      (loans) => sql`
        INSERT INTO loans (staff_id, asset_id, status, date)
        VALUES (${loans.staff_id}, ${loans.asset_id}, ${loans.status}, ${loans.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedLoans;
}

async function seedStaff() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS staff (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      dept VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );
  `;

  const insertedStaff = await Promise.all(
    staff.map(async (staff) => {
      return sql`
        INSERT INTO staff (id, name, dept, email)
        VALUES (${staff.id}, ${staff.name}, ${staff.dept}, ${staff.email})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedStaff;
}

async function seedAssets() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS assets (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      model VARCHAR(255) NOT NULL,
      brand VARCHAR(255) NOT NULL,
      serial VARCHAR(255) NOT NULL
    );
  `;

  const insertedAssets = await Promise.all(
    assets.map(async (assets) => {
      return sql`
        INSERT INTO assets (id, model, brand, serial)
        VALUES (${assets.id}, ${assets.model}, ${assets.brand}, ${assets.serial})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedAssets;
}



export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedAssets(),
      seedLoans(),
      seedStaff(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}