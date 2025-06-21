export interface Menu {
  day: string;
  type: string;
  name: string;
  calories: string;
  ingredients: string[];
  fruits: string[];
  vegetables: string[];
  proteins: {
    animal: string[];
    vegetal: string[];
  };
  carbs: string[];
  fats: string[];
}
