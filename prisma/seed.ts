// Seeds reference data (materials + colors) and a couple of sample reviews.
// Run with: npx prisma db seed
import { PrismaClient } from '@prisma/client';
import { MATERIALS, COLORS } from '../src/lib/pricing';

const prisma = new PrismaClient();

async function main() {
  for (const m of Object.values(MATERIALS)) {
    await prisma.material.upsert({
      where: { key: m.key },
      update: { name: m.name, tech: m.tech, density: m.density, price: m.price, unit: m.unit },
      create: { key: m.key, name: m.name, tech: m.tech, density: m.density, price: m.price, unit: m.unit },
    });
  }

  for (const c of COLORS) {
    await prisma.color.upsert({
      where: { key: c.key },
      update: { name: c.name, hex: c.hex },
      create: { key: c.key, name: c.name, hex: c.hex },
    });
  }

  const reviewCount = await prisma.review.count();
  if (reviewCount === 0) {
    await prisma.review.createMany({
      data: [
        { name: 'Aarav Mehta', rating: 5, body: 'Incredible detail on my PLA prototype. Shipped in a day!' },
        { name: 'Priya Nair', rating: 5, body: 'Instant quote was spot on and the PETG print is super strong.' },
        { name: 'Rohan Gupta', rating: 4, body: 'Great quality, would love more matte color options.' },
      ],
    });
  }

  console.log(`Seeded ${Object.keys(MATERIALS).length} materials, ${COLORS.length} colors.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
