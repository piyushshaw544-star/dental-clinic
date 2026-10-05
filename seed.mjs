import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const services = [
  {
    slug: "dental-check-up",
    name: "Dental Check-up",
    summary:
      "A routine examination of your teeth, gums and overall oral health. Regular check-ups help us understand your dental needs and plan care accordingly.",
    icon: "checkup",
  },
  {
    slug: "teeth-cleaning",
    name: "Teeth Cleaning",
    summary:
      "Professional cleaning to remove plaque and tartar build-up from the tooth surface. Carried out gently, along with guidance on maintaining oral hygiene at home.",
    icon: "cleaning",
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    summary:
      "Removal of a tooth when it is advised after examination. The procedure is carried out carefully, with attention to your comfort throughout the visit.",
    icon: "extraction",
  },
  {
    slug: "dental-crown",
    name: "Dental Crown",
    summary:
      "A custom-made cap that covers a damaged or previously treated tooth. Crowns are shaped and fitted to work with your natural bite.",
    icon: "crown",
  },
  {
    slug: "orthodontic-treatment-braces",
    name: "Orthodontic Treatment / Braces",
    summary:
      "Alignment of irregular or crowded teeth using braces and other orthodontic appliances. Treatment is planned in stages and reviewed at regular visits.",
    icon: "braces",
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    summary:
      "Treatment of the inner tissue of a tooth affected by infection or injury. The tooth is cleaned, sealed and restored across one or more appointments.",
    icon: "root-canal",
  },
  {
    slug: "tooth-filling",
    name: "Tooth Filling",
    summary:
      "Restoration of a tooth affected by decay or damage using suitable filling materials. The filling is shaped so you can chew comfortably again.",
    icon: "filling",
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    summary:
      "Treatments focused on the appearance of your teeth and smile. Available options are explained clearly so you can decide what suits you.",
    icon: "cosmetic",
  },
  {
    slug: "gum-care",
    name: "Gum Care",
    summary:
      "Examination and care of the gums and supporting tissues around your teeth. Includes cleaning along with advice for day-to-day gum care.",
    icon: "gum",
  },
  {
    slug: "general-dental-treatment",
    name: "General Dental Treatment",
    summary:
      "Everyday dental concerns such as pain, sensitivity or difficulty chewing, assessed under one roof. We examine the issue and explain the options available to you.",
    icon: "general",
  },
];

async function main() {
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query("delete from services");
    let order = 0;
    for (const s of services) {
      await client.query(
        `insert into services (slug, name, summary, icon, sort_order)
         values ($1, $2, $3, $4, $5)
         on conflict (slug) do update set
           name = excluded.name,
           summary = excluded.summary,
           icon = excluded.icon,
           sort_order = excluded.sort_order`,
        [s.slug, s.name, s.summary, s.icon, order++],
      );
    }
    await client.query("commit");
    console.log(`Seeded ${services.length} services.`);
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
