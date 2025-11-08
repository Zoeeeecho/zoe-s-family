export function makeRecipe({title, tags=[], ingredients=[], steps=[], image=''}) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    tags: tags.map(s=>s.trim()).filter(Boolean),
    ingredients: ingredients.map(s=>s.trim()).filter(Boolean),
    steps: steps.map(s=>s.trim()).filter(Boolean),
    image, updatedAt: Date.now()
  };
}
