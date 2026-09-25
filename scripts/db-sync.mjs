import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const envPath = path.resolve(process.cwd(), '.env');
let dbUrl = process.env.DATABASE_URL;

if (!dbUrl && fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('DATABASE_URL=')) {
      dbUrl = trimmed.split('=')[1].replace(/["']/g, '').trim();
      break;
    }
  }
}

const isPostgres = dbUrl && (dbUrl.startsWith('postgresql:') || dbUrl.startsWith('postgres:'));
const targetProvider = isPostgres ? 'postgresql' : 'sqlite';

const schemaPath = path.resolve(process.cwd(), 'prisma/schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

const updatedSchema = schema.replace(/provider\s*=\s*"(postgresql|sqlite)"/, `provider = "${targetProvider}"`);

if (updatedSchema !== schema) {
  fs.writeFileSync(schemaPath, updatedSchema, 'utf8');
  console.log(`[db-sync] Updated prisma/schema.prisma provider to: ${targetProvider}`);
} else {
  console.log(`[db-sync] prisma/schema.prisma provider already is: ${targetProvider}`);
}

console.log('[db-sync] Running prisma generate...');
execSync('npx prisma generate', { stdio: 'inherit' });

console.log('[db-sync] Running prisma db push...');
execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });

console.log('[db-sync] Database synchronized successfully!');
