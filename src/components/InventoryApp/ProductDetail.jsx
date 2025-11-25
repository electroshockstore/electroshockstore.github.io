import { memo, useCallback, useMemo, useState } from "react";
import {
  ArrowLeft,
  X,
  Package,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Info,
  Zap,
  Box,
} from "lucide-react";

// Función para obtener imagen por categoría
const getCategoryImage = (category) => {
  const categoryImages = {
    'Fuentes': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
    'Almacenamiento': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800',
    'Memorias RAM': 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800',
    'Motherboards': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800',
    'Procesadores': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800',
    'Refrigeración': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800'
  };
  return categoryImages[category] || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800';
};

const ProductDetail = memo(
  ({ product, onClose, quantity = 1, setQuantity = () => {}, onAddToCart = () => {}, viewOnly = false }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showSpecs, setShowSpecs] = useState(true);

    // Memoizar valores calculados
    const stockStatus = useMemo(() => {
      if (!product) return null;
      if (product.stock === 0)
        return {
          icon: XCircle,
          color: "danger",
          text: "SIN STOCK",
          bgColor: "bg-gradient-to-br from-red-50 to-red-100",
          badgeColor: "bg-red-500",
          textColor: "text-red-700",
          iconColor: "text-red-500",
          progressColor: "bg-red-500",
          glowColor: "shadow-red-200",
        };
      if (product.stock <= product.minStock)
        return {
          icon: AlertCircle,
          color: "warning",
          text: "STOCK CRÍTICO",
          bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
          badgeColor: "bg-orange-500",
          textColor: "text-orange-700",
          iconColor: "text-orange-500",
          progressColor: "bg-orange-500",
          glowColor: "shadow-orange-200",
        };
      return {
        icon: CheckCircle2,
        color: "success",
        text: "DISPONIBLE",
        bgColor: "bg-gradient-to-br from-green-50 to-green-100",
        badgeColor: "bg-green-500",
        textColor: "text-green-700",
        iconColor: "text-green-500",
        progressColor: "bg-green-500",
        glowColor: "shadow-green-200",
      };
    }, [product]);

    const productImage = useMemo(() => {
      if (!product) return "";
      return getCategoryImage(product.category);
    }, [product]);

    const maxQuantity = useMemo(() => {
      if (!product) return 0;
      return Math.min(product.stock, 99);
    }, [product]);

    const stockPercentage = useMemo(() => {
      if (!product) return 0;
      return Math.min((product.stock / (product.minStock * 3)) * 100, 100);
    }, [product]);

    // Memoizar handlers
    const handleQuantityChange = useCallback(
      (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= maxQuantity) {
          setQuantity(newQuantity);
        }
      },
      [maxQuantity, setQuantity]
    );

    const handleAddToCart = useCallback(() => {
      if (product) {
        onAddToCart(product, quantity);
      }
    }, [onAddToCart, product, quantity]);

    const handleIncrement = useCallback(() => {
      if (quantity < maxQuantity) {
        setQuantity(quantity + 1);
      }
    }, [quantity, maxQuantity, setQuantity]);

    const handleDecrement = useCallback(() => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }, [quantity, setQuantity]);

    if (!product || !stockStatus) return null;

    const StatusIcon = stockStatus.icon;

    return (
      <>
        {/* Overlay oscuro */}
        <div
          className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal centrado con scroll */}
        <div className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto py-4 sm:py-8">
          <div className="w-full max-w-7xl bg-gray-50 rounded-none sm:rounded-3xl shadow-2xl min-h-[calc(100vh-2rem)] sm:min-h-0">
            {/* Header flotante con glassmorphism - SIEMPRE VISIBLE */}
            <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-lg rounded-t-none sm:rounded-t-3xl">
              <div className="px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:text-blue-600 
                       font-semibold transition-all rounded-xl hover:bg-blue-50 text-sm sm:text-base"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Volver</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-all hover:rotate-90 duration-300 flex-shrink-0"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                {/* Columna izquierda - Imagen y especificaciones (5 columnas) */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                  {/* Imagen con efecto hover */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden relative">
                      <img
                        src={productImage}
                        alt={product.name}
                        className={`w-full h-full object-contain transition-all duration-500 ${
                          imageLoaded
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-0"
                        } group-hover:scale-105`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 hidden items-center justify-center">
                        <Package className="h-20 w-20 text-blue-300" />
                      </div>

                      {/* Badge de stock flotante */}
                      <div
                        className={`absolute top-2 right-2 sm:top-4 sm:right-4 px-3 py-1.5 sm:px-4 sm:py-2 ${stockStatus.badgeColor} text-white rounded-full font-bold text-xs sm:text-sm shadow-lg ${stockStatus.glowColor}`}
                      >
                        {product.stock} un.
                      </div>
                    </div>
                  </div>

                  {/* Especificaciones técnicas colapsables */}
                  {product.specifications && (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => setShowSpecs(!showSpecs)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          Especificaciones Tecnicas
                        </h3>
                        <div
                          className={`transform transition-transform duration-300 ${
                            showSpecs ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          showSpecs
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        } overflow-auto`}
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
                          {Object.entries(product.specifications).map(
                            ([key, value], index) => (
                              <div
                                key={key}
                                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-3 rounded-xl transition-colors"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <span className="text-gray-600 font-medium text-sm">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="font-bold text-gray-900">
                                  {value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Columna derecha - Información y acciones (7 columnas) */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                  {/* Información principal con gradiente */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                    {/* Título y marca */}
                    <div className="mb-4 sm:mb-6">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
                        {product.name}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-shadow">
                          {product.brand}
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold">
                          {product.model}
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                      {product.description}
                    </p>

                  
      

                    {/* Precio destacado */}
                    <div className="mb-4 sm:mb-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-green-200 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <span className="text-sm sm:text-base font-semibold text-green-700">
                            Precio
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="font-black text-4xl sm:text-5xl text-green-700 block">
                            {new Intl.NumberFormat('es-AR', {
                              style: 'currency',
                              currency: 'ARS',
                              minimumFractionDigits: 0
                            }).format(product.price)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="grid grid-cols-1 gap-3 text-sm flex-1">
                          <div>
                            <span className="text-gray-500 font-medium block mb-1">
                              Categoría
                            </span>
                            <span className="font-bold text-gray-900">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Panel informativo - Solo visualización */}
                  {!viewOnly && product.stock > 0 ? (
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl shadow-2xl border border-blue-500 p-4 sm:p-6 lg:p-8 text-white">
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                          <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black">
                          Solicitar Material
                        </h3>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 border border-white/20">
                        <label className="block text-xs sm:text-sm font-bold mb-3 sm:mb-4 text-blue-100">
                          Cantidad a solicitar
                        </label>
                        <div className="flex items-center justify-center gap-2 sm:gap-4">
                          <button
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed
                               rounded-xl sm:rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/20"
                          >
                            <Minus className="h-5 w-5 sm:h-6 sm:w-6" />
                          </button>

                          <div className="flex-1 max-w-[200px] sm:max-w-xs">
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  parseInt(e.target.value) || 1
                                )
                              }
                              min={1}
                              max={maxQuantity}
                              className="w-full h-12 sm:h-14 text-center text-2xl sm:text-3xl font-black bg-white text-blue-900 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg"
                            />
                            <p className="text-center text-xs text-blue-200 mt-2 font-medium">
                              Máx: {maxQuantity}
                            </p>
                          </div>

                          <button
                            onClick={handleIncrement}
                            disabled={quantity >= maxQuantity}
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed
                               rounded-xl sm:rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/20"
                          >
                            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-white text-blue-700 py-4 sm:py-5 text-base sm:text-lg font-black rounded-xl sm:rounded-2xl
                           transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-300/50
                           flex items-center justify-center gap-2 sm:gap-3 group"
                      >
                        <Box className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
                        <span className="hidden sm:inline">
                          Agregar {quantity} unidad{quantity > 1 ? "es" : ""} a
                          solicitud
                        </span>
                        <span className="sm:hidden">
                          Agregar {quantity} un.
                        </span>
                      </button>

                      <p className="text-xs text-blue-200 text-center mt-3 sm:mt-4 font-medium">
                        ✓ Procesado por pañol
                      </p>
                    </div>
                  ) : viewOnly ? (
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
                      <div className="inline-flex p-3 sm:p-4 bg-gray-200 rounded-full mb-3 sm:mb-4">
                        <Info className="h-10 w-10 sm:h-12 sm:w-12 text-gray-600" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
                        Modo visualización
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                        Esta es una vista de catálogo. No se pueden realizar solicitudes.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
                      <div className="inline-flex p-3 sm:p-4 bg-red-200 rounded-full mb-3 sm:mb-4">
                        <XCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-600" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-red-900 mb-2">
                        Sin stock
                      </h3>
                      <p className="text-sm sm:text-base text-red-700 font-medium">
                        Contacta al responsable de pañol.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes shimmer {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              .animate-shimmer {
                animation: shimmer 2s infinite;
              }
            `}</style>
          </div>
        </div>
      </>
    );
  }
);

ProductDetail.displayName = "ProductDetail";

export default ProductDetail;
