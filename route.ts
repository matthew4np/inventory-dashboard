// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import postgres from 'postgres'; // Your existing Postgres connection

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  // Check if we are in a production environment to prevent public access
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_PERF_TEST !== 'true') {
    return new NextResponse('Unauthorized', { status: 401 });
  }




  try {
    // Run the same query your Asset Inventory dashboard uses
    const startTime = Date.now();
    const assets = await sql`SELECT * FROM assets LIMIT 100`;
    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      count: assets.length,
      serverTimeMs: duration,
    });
  } catch (error : any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}