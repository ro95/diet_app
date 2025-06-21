import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Menu } from "@/types/menu";

export default async function Home() {
  // Charger les données du fichier JSON
  const jsonDirectory = path.join(process.cwd());
  const fileContents = await fs.readFile(
    jsonDirectory + "/plats_categorises_complets.json",
    "utf8"
  );
  const menus: Menu[] = JSON.parse(fileContents);

  // Obtenir les jours uniques
  const uniqueDays = Array.from(new Set(menus.map((menu) => menu.day)));

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-emerald-600">
          Mon Programme Diététique
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueDays.map((day) => (
            <Link
              key={day}
              href={`/jour/${day.toLowerCase()}`}
              className="block p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-center text-gray-800">
                {day}
              </h2>
              <div className="mt-4 flex justify-center">
                {["🥣", "🍽️", "🥘", "🍓", "🕒"].map((type) => (
                  <span key={type} className="mx-1 text-2xl">
                    {type}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
