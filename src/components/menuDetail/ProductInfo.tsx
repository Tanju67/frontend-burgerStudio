import { FaDna, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import type { Product } from "../../shared/schemas/productSchemas";

function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="text-text-dark space-y-6">
      {/* Ürün Başlığı & Açıklama */}
      <div className="text-center">
        <h2 className="text-main-btn text-2xl font-black tracking-tighter uppercase italic">
          {product.title}
        </h2>
        <div className="bg-main mx-auto my-2 h-1 w-12 rounded-full" />
        <p className="mt-3 text-sm leading-relaxed font-medium italic opacity-80">
          {product.description}
        </p>
      </div>

      {/* Besin Değerleri Bölümü */}
      <div className="bg-main-light border-main/10 rounded-4xl border-2 p-5">
        <div className="mb-4 flex items-center justify-center gap-2 sm:justify-start">
          <FaDna className="text-main-btn" size={18} />
          <h3 className="text-sm font-black tracking-widest uppercase italic">
            Nutritional Info
          </h3>
        </div>

        <p className="mb-4 text-center text-[10px] font-bold uppercase opacity-50 sm:text-left">
          Per serving – approx. 250g
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <NutrientCard label="Calories" value="680" unit="kcal" />
          <NutrientCard label="Protein" value="38" unit="g" />
          <NutrientCard label="Carbs" value="42" unit="g" />
          <NutrientCard label="Fat" value="40" unit="g" />
        </div>

        {/* Detaylı Tablo  */}
        <div className="border-main/5 mt-6 space-y-2 border-t-2 pt-4">
          <DetailedRow label="Sugars" value="7 g" />
          <DetailedRow label="Saturated Fat" value="16 g" />
          <DetailedRow label="Fiber" value="3 g" />
          <DetailedRow label="Salt" value="2.1 g" />
        </div>
      </div>

      {/* Alerjenler */}
      <div className="rounded-2xl border-2 border-red-100 bg-red-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-red-600">
          <FaExclamationTriangle size={16} />
          <h3 className="text-xs font-black tracking-widest uppercase italic">
            Allergens
          </h3>
        </div>
        <p className="text-xs leading-relaxed font-bold text-red-800/80">
          This product contains:{" "}
          <span className="text-red-700">
            Gluten (wheat bun), Milk (cheddar cheese, sauce), Eggs (sauce),
            Mustard.
          </span>
        </p>
      </div>

      {/* Bilgilendirme Notu */}
      <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-blue-600">
          <FaInfoCircle size={16} />
          <h3 className="text-xs font-black tracking-widest uppercase italic">
            Please Note
          </h3>
        </div>
        <div className="space-y-2 text-[11px] leading-tight font-bold text-blue-800/70 italic">
          <p>
            • Nutritional values may vary depending on portion and preparation.
          </p>
          <p>• Our kitchen handles nuts, gluten, and dairy.</p>
          <p>
            • Inform our staff if you have any food allergies before ordering.
          </p>
        </div>
      </div>
    </div>
  );
}

// Yardımcı Bileşenler
const NutrientCard = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) => (
  <div className="border-main/20 rounded-2xl border-2 bg-white p-3 text-center shadow-sm">
    <p className="text-main-dark/40 mb-1 text-[9px] font-black uppercase">
      {label}
    </p>
    <p className="text-main-btn text-lg leading-none font-black tracking-tighter italic">
      {value}
      <span className="ml-0.5 text-[10px]">{unit}</span>
    </p>
  </div>
);

const DetailedRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between px-2">
    <span className="text-main-dark/60 text-[11px] font-bold uppercase italic">
      {label}
    </span>
    <span className="text-main-btn text-[11px] font-black italic">{value}</span>
  </div>
);

export default ProductInfo;
