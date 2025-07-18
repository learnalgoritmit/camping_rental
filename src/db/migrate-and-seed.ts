import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { products } from './schema';

const sqlite = new Database('prisma/dev.db');
const db = drizzle(sqlite);

// 1. Create the products table if it doesn't exist
sqlite.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_he TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_he TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT
);
`);

// 1b. Create the user_contact table if it doesn't exist
sqlite.exec(`
CREATE TABLE IF NOT EXISTS user_contact (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

// 2. Seed the table with product data
const productData = [
  {
    key: "campingChair",
    titleEn: "Camping Chair",
    titleHe: "כיסא קמפינג",
    descriptionEn: "Comfortable foldable chair for relaxing by the campfire.",
    descriptionHe: "כיסא מתקפל ונוח למנוחה ליד המדורה.",
    price: 20,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "sleepingBag",
    titleEn: "Sleeping Bag",
    titleHe: "שק שינה",
    descriptionEn: "A cozy sleeping bag for chilly nights under the stars. Soft, warm, and packable.",
    descriptionHe: "שק שינה נעים ללילות קרירים תחת הכוכבים. רך, חם וקל לאריזה.",
    price: 40,
    imageUrl: "https://images.unsplash.com/photo-1465101046530-733987f28ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "portableGrill",
    titleEn: "Portable Grill",
    titleHe: "מנגל נייד",
    descriptionEn: "Compact grill for outdoor cooking and BBQs.",
    descriptionHe: "מנגל קומפקטי לבישול ואירוח בשטח.",
    price: 60,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "lantern",
    titleEn: "Lantern",
    titleHe: "פנס",
    descriptionEn: "Light up your campsite with this rechargeable lantern. Bright, long-lasting, and portable.",
    descriptionHe: "האירו את המחנה עם פנס נטען זה. בהיר, עמיד ונייד.",
    price: 15,
    imageUrl: "https://images.unsplash.com/photo-1464983953574-89216854?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "coffeeKit",
    titleEn: "Coffee Kit",
    titleHe: "ערכת קפה",
    descriptionEn: "Everything you need for fresh coffee in the wild.",
    descriptionHe: "כל מה שצריך לקפה טרי בטבע.",
    price: 35,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4dd2085?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "coolerBox",
    titleEn: "Cooler Box",
    titleHe: "צידנית",
    descriptionEn: "Keep your food and drinks cold all day.",
    descriptionHe: "שומרת על האוכל והשתייה קרים לאורך כל היום.",
    price: 30,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "campingTable",
    titleEn: "Camping Table",
    titleHe: "שולחן קמפינג",
    descriptionEn: "Foldable table for meals and games.",
    descriptionHe: "שולחן מתקפל לארוחות ומשחקים.",
    price: 25,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "hammock",
    titleEn: "Hammock",
    titleHe: "ערסל",
    descriptionEn: "Relax between the trees with a sturdy hammock.",
    descriptionHe: "להירגע בין העצים עם ערסל עמיד.",
    price: 28,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "firstAidKit",
    titleEn: "First Aid Kit",
    titleHe: "ערכת עזרה ראשונה",
    descriptionEn: "Essential supplies for minor injuries and emergencies.",
    descriptionHe: "ציוד חיוני לפציעות קלות ומקרי חירום.",
    price: 18,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "inflatableMattress",
    titleEn: "Inflatable Mattress",
    titleHe: "מזרן מתנפח",
    descriptionEn: "Extra comfort for a good night's sleep.",
    descriptionHe: "נוחות נוספת לשינה טובה בלילה.",
    price: 45,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "portableShower",
    titleEn: "Portable Shower",
    titleHe: "מקלחת ניידת",
    descriptionEn: "Stay fresh with a solar-heated portable shower.",
    descriptionHe: "להתרענן עם מקלחת ניידת מחוממת בשמש.",
    price: 50,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "firewoodBundle",
    titleEn: "Firewood Bundle",
    titleHe: "חבילת עצים למדורה",
    descriptionEn: "Pre-chopped firewood for your campfire.",
    descriptionHe: "עצים קצוצים מראש למדורה שלך.",
    price: 12,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "campingStove",
    titleEn: "Camping Stove",
    titleHe: "כירת קמפינג",
    descriptionEn: "Gas stove for quick and easy meals.",
    descriptionHe: "כירת גז לארוחות מהירות וקלות.",
    price: 38,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "boardGames",
    titleEn: "Board Games",
    titleHe: "משחקי קופסה",
    descriptionEn: "Classic games for fun evenings in the tent.",
    descriptionHe: "משחקים קלאסיים לערבים מהנים באוהל.",
    price: 10,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "fishingKit",
    titleEn: "Fishing Kit",
    titleHe: "ערכת דיג",
    descriptionEn: "Basic fishing gear for lakeside camping.",
    descriptionHe: "ציוד דיג בסיסי לקמפינג ליד אגם.",
    price: 32,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "picnicBlanket",
    titleEn: "Picnic Blanket",
    titleHe: "שמיכת פיקניק",
    descriptionEn: "Soft, waterproof blanket for picnics and lounging.",
    descriptionHe: "שמיכה רכה ועמידה במים לפיקניקים ומנוחה.",
    price: 14,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "tentLightString",
    titleEn: "Tent Light String",
    titleHe: "שרשרת אורות לאוהל",
    descriptionEn: "String lights to create a magical tent atmosphere.",
    descriptionHe: "אורות ליצירת אווירה קסומה באוהל.",
    price: 16,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "portableSpeaker",
    titleEn: "Portable Speaker",
    titleHe: "רמקול נייד",
    descriptionEn: "Bluetooth speaker for music at your campsite.",
    descriptionHe: "רמקול בלוטות למוזיקה בקמפינג.",
    price: 22,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "bugSpray",
    titleEn: "Bug Spray",
    titleHe: "תרסיס נגד יתושים",
    descriptionEn: "Keep mosquitoes and bugs away.",
    descriptionHe: "מרחיק יתושים וחרקים.",
    price: 8,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"
  },
  {
    key: "marshmallowKit",
    titleEn: "Marshmallow Kit",
    titleHe: "ערכת מרשמלו",
    descriptionEn: "Marshmallows, sticks, and chocolate for smores!",
    descriptionHe: "מרשמלו, שיפודים ושוקולד לס'מורס!",
    price: 9,
    imageUrl: "https://images.unsplash.com/photo-150695925346-21d32f4?auto=format&fit=crop&w=600&q=80"
  },
];

for (const product of productData) {
  db.insert(products).values({
    key: product.key,
    titleEn: product.titleEn,
    titleHe: product.titleHe,
    descriptionEn: product.descriptionEn,
    descriptionHe: product.descriptionHe,
    price: product.price,
    imageUrl: product.imageUrl,
  }).onConflictDoUpdate({
    target: products.key,
    set: {
      titleEn: product.titleEn,
      titleHe: product.titleHe,
      descriptionEn: product.descriptionEn,
      descriptionHe: product.descriptionHe,
      price: product.price,
      imageUrl: product.imageUrl,
    }
  }).run();
}

console.log('Migration and seed complete!'); 