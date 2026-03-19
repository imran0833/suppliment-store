export default function SkeletonCard(){

  return(
    <div className="animate-pulse bg-white p-3 rounded-xl shadow">

      <div className="bg-gray-300 h-36 rounded-xl"></div>

      <div className="h-4 bg-gray-300 mt-3 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 mt-2 rounded w-1/2"></div>

      <div className="h-8 bg-gray-300 mt-3 rounded"></div>

    </div>
  )
}