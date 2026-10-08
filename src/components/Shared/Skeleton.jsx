/**
 * Skeletons de carga (Fase 2): placeholders con la forma del contenido real
 * para las esperas async genuinas (chunks lazy por ruta, price-history).
 * Solo `animate-pulse` (opacidad, GPU) + dimensiones fijas anti-CLS.
 */

const Block = ({ className = '' }) => (
  <div aria-hidden="true" className={`animate-pulse bg-gray-200 ${className}`} />
);

/** Card de grilla (misma geometría aproximada que ProductCard). */
export const ProductCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white sm:rounded-2xl">
    <div className="aspect-square bg-gray-100 p-6">
      <Block className="h-full w-full rounded-lg" />
    </div>
    <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3.5 sm:p-4">
      <Block className="h-3 w-1/3 rounded" />
      <Block className="h-10 rounded-lg" />
      <div className="mt-auto rounded-lg border border-gray-100 bg-gray-50 p-2 sm:p-4">
        <Block className="ml-auto h-6 w-2/3 rounded" />
      </div>
    </div>
  </div>
);

/** Fila de lista (misma geometría que la vista lista). */
export const ProductRowSkeleton = () => (
  <div className="flex items-center gap-3 rounded-lg bg-white p-3 sm:gap-4 sm:p-4">
    <Block className="h-16 w-16 flex-shrink-0 rounded-md sm:h-20 sm:w-20" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <Block className="h-3 w-1/4 rounded" />
      <Block className="h-4 w-3/4 rounded" />
    </div>
    <Block className="h-6 w-20 flex-shrink-0 rounded" />
  </div>
);

/** Grilla del catálogo: toolbar + 6 cards. */
export const CatalogSkeleton = () => (
  <div className="flex min-h-[60vh] flex-col gap-6 px-2 pb-8 pt-4 sm:px-6 sm:pt-6">
    <div className="flex items-center justify-end gap-2 sm:gap-3">
      <Block className="h-10 w-28 rounded-full" />
      <Block className="h-10 w-24 rounded-full" />
    </div>
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

/** Detalle de producto: header + imagen + info + specs. */
export const ProductDetailSkeleton = () => (
  <div className="mx-auto w-full max-w-7xl px-0 sm:px-4">
    <div className="rounded-none border border-gray-200 bg-gray-50 shadow-lg sm:rounded-xl lg:rounded-3xl">
      <div className="flex items-center gap-3 px-3 py-3 sm:px-8 sm:py-4">
        <Block className="h-9 w-9 flex-shrink-0 rounded-full" />
        <Block className="h-6 min-w-0 flex-1 rounded-full" />
      </div>
      <div className="space-y-4 px-3 py-3 sm:space-y-6 sm:px-4 sm:py-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 overflow-hidden rounded-xl border-2 border-gray-200 bg-white lg:grid-cols-2">
          <div className="aspect-square bg-gray-100 p-8">
            <Block className="h-full w-full rounded-xl" />
          </div>
          <div className="flex flex-col gap-3 p-4 sm:p-6">
            <Block className="h-4 w-1/4 rounded" />
            <Block className="h-8 w-3/4 rounded-lg" />
            <Block className="h-16 w-full rounded-lg" />
            <Block className="h-12 w-1/2 rounded-xl" />
            <div className="mt-auto flex flex-col gap-2">
              <Block className="h-12 w-full rounded-xl" />
              <Block className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
        <Block className="h-40 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

/** Home: hero + 2 filas (para la carga del chunk inicial). */
export const HomeSkeleton = () => (
  <div className="flex w-full flex-1 flex-col gap-4 px-3 pt-4 sm:px-4">
    <Block className="h-56 w-full rounded-3xl sm:h-80" />
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

/** Gráfico de historial de precios (espera fetchJSON). */
export const ChartSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between">
        <Block className="h-4 w-32 rounded" />
        <Block className="h-6 w-20 rounded-full" />
      </div>
      <Block className="h-40 w-full rounded-lg" />
    </div>
  </div>
);

export default Block;
