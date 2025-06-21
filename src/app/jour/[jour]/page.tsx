import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Menu } from "@/types/menu";

export async function generateStaticParams() {
  const jsonDirectory = path.join(process.cwd());
  const fileContents = await fs.readFile(
    jsonDirectory + "/plats_categorises_complets.json",
    "utf8"
  );
  const menus: Menu[] = JSON.parse(fileContents);

  const uniqueDays = Array.from(new Set(menus.map((menu) => menu.day)));

  return uniqueDays.map((day) => ({
    jour: day.toLowerCase(),
  }));
}

interface JourPageProps {
  params: {
    jour: string;
  };
}

export default async function JourPage({ params }: JourPageProps) {
  const { jour } = params;

  // Charger les données du fichier JSON
  const jsonDirectory = path.join(process.cwd());
  const fileContents = await fs.readFile(
    jsonDirectory + "/plats_categorises_complets.json",
    "utf8"
  );
  const menus: Menu[] = JSON.parse(fileContents);

  // Filtrer les menus par jour
  const menusForDay = menus.filter(
    (menu) => menu.day.toLowerCase() === jour.toLowerCase()
  );

  const dayName =
    menusForDay.length > 0 ? menusForDay[0].day : jour.toUpperCase();

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-emerald-600 hover:underline"
        >
          &larr; Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-emerald-600">{dayName}</h1>

        <div className="space-y-8">
          {menusForDay.map((menu, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{menu.type}</span>
                <h2 className="text-xl font-medium text-gray-800">
                  {menu.name}
                </h2>
              </div>

              <p className="text-gray-600 mb-4">{menu.calories}</p>

              <div className="space-y-3">
                {menu.ingredients.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700">Ingrédients:</h3>
                    <p className="text-gray-600">
                      {menu.ingredients.join(", ")}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {menu.fruits.length > 0 && (
                    <div className="bg-yellow-50 p-3 rounded">
                      <h3 className="font-medium text-yellow-700">Fruits:</h3>
                      <p className="text-gray-600">{menu.fruits.join(", ")}</p>
                    </div>
                  )}

                  {menu.vegetables.length > 0 && (
                    <div className="bg-green-50 p-3 rounded">
                      <h3 className="font-medium text-green-700">Légumes:</h3>
                      <p className="text-gray-600">
                        {menu.vegetables.join(", ")}
                      </p>
                    </div>
                  )}

                  {(menu.proteins.animal.length > 0 ||
                    menu.proteins.vegetal.length > 0) && (
                    <div className="bg-red-50 p-3 rounded">
                      <h3 className="font-medium text-red-700">Protéines:</h3>
                      {menu.proteins.animal.length > 0 && (
                        <p className="text-gray-600">
                          Animales: {menu.proteins.animal.join(", ")}
                        </p>
                      )}
                      {menu.proteins.vegetal.length > 0 && (
                        <p className="text-gray-600">
                          Végétales: {menu.proteins.vegetal.join(", ")}
                        </p>
                      )}
                    </div>
                  )}

                  {menu.carbs.length > 0 && (
                    <div className="bg-orange-50 p-3 rounded">
                      <h3 className="font-medium text-orange-700">Glucides:</h3>
                      <p className="text-gray-600">{menu.carbs.join(", ")}</p>
                    </div>
                  )}

                  {menu.fats.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded">
                      <h3 className="font-medium text-blue-700">Lipides:</h3>
                      <p className="text-gray-600">{menu.fats.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
