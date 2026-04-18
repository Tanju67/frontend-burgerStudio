import type { Product } from "../../shared/schemas/productSchemas";

function ProductInfo({ product }: { product: Product }) {
  return (
    <div>
      <h2 className="text-main-btn mb-2 text-center text-lg uppercase">
        {product.title}
      </h2>
      <p className="mb-2">{product.description}</p>
      <div className="mb-2">
        <h2>🥗 Nutritional Information</h2>
        <p className="text-text-dark text-sm">(Per serving – approx. 250g)</p>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="text-text-dark py-1">Calories</td>
              <td className="py-1 text-right font-medium">680 kcal</td>
            </tr>

            <tr className="border-b">
              <td className="text-text-dark py-1">Protein</td>
              <td className="py-1 text-right font-medium">38 g</td>
            </tr>

            <tr className="border-b">
              <td className="text-text-dark py-1">Carbohydrates</td>
              <td className="py-1 text-right font-medium">42 g</td>
            </tr>

            <tr className="border-b">
              <td className="text-text-dark py-1">Sugars</td>
              <td className="py-1 text-right font-medium">7 g</td>
            </tr>

            <tr className="border-b">
              <td className="text-text-dark py-1">Fat</td>
              <td className="py-1 text-right font-medium">40 g</td>
            </tr>

            <tr className="border-b">
              <td className="text-text-dark py-1">Saturated Fat</td>
              <td className="py-1 text-right font-medium">16 g</td>
            </tr>

            <tr className="border-b">
              <td className="text-text-dark py-1">Fiber</td>
              <td className="py-1 text-right font-medium">3 g</td>
            </tr>

            <tr>
              <td className="text-text-dark py-1">Salt</td>
              <td className="py-1 text-right font-medium">2.1 g</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-2">
        <h2>⚠️ Allergens</h2>
        <p>
          This product contains: Gluten (wheat bun), Milk (cheddar cheese,
          sauce), Eggs (sauce), Mustard.
        </p>
      </div>
      <div className="mb-2">
        <h2>ℹ️ Please Note</h2>
        <p>
          Nutritional values may vary slightly depending on portion size and
          preparation.
        </p>
        <p>Our kitchen handles products containing nuts, gluten, and dairy.</p>
        <p>
          If you have any food allergies or intolerances, please inform our
          staff before ordering.
        </p>
      </div>
    </div>
  );
}

export default ProductInfo;
