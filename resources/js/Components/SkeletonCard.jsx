export default function SkeletonCard() {
    return (
        <div className="p-4 rounded-xl bg-white/10 space-y-3">

            <div className="h-4 w-1/2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded"></div>

            <div className="h-3 w-3/4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded"></div>

            <div className="h-3 w-2/3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded"></div>

        </div>
    );
}